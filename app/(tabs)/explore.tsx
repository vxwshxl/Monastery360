import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AITravelPlanner from '../../components/AITravelPlanner';
import markers from '../../components/markers';

// FONTS
import BoldText from '@/assets/fonts/BoldText';

const { height: screenHeight } = Dimensions.get('window');

export default function App() {
  const navigation = useNavigation();

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showAIPlanner, setShowAIPlanner] = useState(false);
  const mapRef = useRef<MapView>(null);
  
  // Animation values
  const translateY = useRef(new Animated.Value(0)).current;
  const [isDragging, setIsDragging] = useState(false);

  // Calculate positions
  const minHeight = screenHeight * 0.35; // 35% - original bottom position
  const maxHeight = screenHeight * 0.5;  // 50% - middle screen position
  const dragRange = maxHeight - minHeight;

  const handleMarkerPress = (marker: any, index: number) => {
  setSelectedMarker({ ...marker, index });

  // Calculate offset
  const mapHeight = screenHeight; // full screen height
  const bottomSheetHeight = maxHeight; // max height of bottom list
  const topVisibleHeight = mapHeight - bottomSheetHeight; // available top space

  // Latitude offset calculation
  const latitudeDelta = 0.05;
  const latitudeOffset = (bottomSheetHeight / mapHeight) * latitudeDelta * -0.75; // shift marker up

  mapRef.current?.animateToRegion(
    {
      latitude: marker.coordinates.latitude + latitudeOffset,
      longitude: marker.coordinates.longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: 0.05,
    },
    1000
  );
}

  const handleLocationPress = (marker: any, index: number) => {
    handleMarkerPress(marker, index);
  };

  // PanResponder for drag gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to vertical gestures
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 5;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        setIsDragging(true);
        translateY.setOffset((translateY as any)._value);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Allow both up and down dragging within the range
        const clampedDy = Math.max(Math.min(gestureState.dy, dragRange), -dragRange);
        translateY.setValue(clampedDy);
      },
      onPanResponderRelease: (evt, gestureState) => {
        setIsDragging(false);
        translateY.flattenOffset();
        
        const { dy, vy } = gestureState;
        const currentValue = (translateY as any)._value;
        
        // Much more sensitive triggers - respond to small movements
        let shouldSnapToMiddle;
        
        if (currentValue <= -dragRange / 2) {
          // If currently closer to middle, check if should go down
          // Very sensitive: small downward drag or any downward velocity triggers collapse
          shouldSnapToMiddle = !(dy > 20 || vy > 0.2);
        } else {
          // If currently closer to bottom, check if should go up  
          // Very sensitive: small upward drag or any upward velocity triggers expand
          shouldSnapToMiddle = dy < -20 || vy < -0.2;
        }
        
        const snapTo = shouldSnapToMiddle ? -dragRange : 0;

        // Faster, more responsive animation
        Animated.spring(translateY, {
          toValue: snapTo,
          useNativeDriver: false,
          tension: 200,
          friction: 12,
        }).start();
      },
    })
  ).current;

  // Calculate dynamic height based on translation
  const animatedHeight = translateY.interpolate({
    inputRange: [-dragRange, 0],
    outputRange: [maxHeight, minHeight],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        ref={mapRef}
        // provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={markers[0].coordinates}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.coordinates.latitude,
              longitude: marker.coordinates.longitude,
            }}
            title={marker.name}
            description={marker.description}
            onPress={() => handleMarkerPress(marker, index)}
          />
        ))}
      </MapView>

      {/* Top Navigation Buttons */}
      <View style={styles.topNav}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => (navigation as any).navigate('index')}
        >
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        {/* AI Icon */}
        <TouchableOpacity style={styles.navButton} onPress={() => setShowAIPlanner(true)}>
          <Feather name="compass" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Draggable Bottom List */}
      <Animated.View 
        style={[
          styles.bottomList,
          {
            height: animatedHeight,
          }
        ]}
      >
        {/* Drag Handle */}
        <View 
          style={styles.dragHandle}
          {...panResponder.panHandlers}
        >
          <View style={[
            styles.dragIndicator,
            isDragging && styles.dragIndicatorActive
          ]} />
        </View>

        <View style={styles.listHeader}>
          <BoldText style={styles.listTitle}>All Monasteries</BoldText>
        </View>

        <ScrollView
          style={styles.locationsList}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!isDragging}
        >
          {markers.map((marker, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.locationItem,
                (selectedMarker as any)?.index === index && styles.selectedLocationItem,
              ]}
              onPress={() => handleLocationPress(marker, index)}
            >
              <View style={styles.locationInfo}>
                <BoldText style={styles.locationName}>{marker.name}</BoldText>
                <BoldText style={styles.locationDescription} numberOfLines={2}>
                  {marker.description}
                </BoldText>
              </View>
              <Image
                source={{ uri: marker.image }}
                style={styles.locationImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* AI Travel Planner Modal */}
      <AITravelPlanner 
        visible={showAIPlanner} 
        onClose={() => setShowAIPlanner(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  topNav: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  navButton: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  bottomList: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dragHandle: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: -16,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  dragIndicatorActive: {
    backgroundColor: '#2196f3',
  },
  listHeader: {
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  locationsList: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedLocationItem: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  locationInfo: {
    flex: 1,
    marginRight: 12,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  locationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
});