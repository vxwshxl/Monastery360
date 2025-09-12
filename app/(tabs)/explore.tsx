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
import MapView, { Marker, Polyline } from 'react-native-maps';
import AITravelPlanner from '../../components/AITravelPlanner';
import markers from '../../components/markers';

// FONTS
import BoldText from '@/assets/fonts/BoldText';

const { height: screenHeight } = Dimensions.get('window');

export default function App() {
  const navigation = useNavigation();

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showAIPlanner, setShowAIPlanner] = useState(false);
  const [plannedRoute, setPlannedRoute] = useState<any[]>([]);
  const [showRoute, setShowRoute] = useState(false);
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

  const generateRouteCoordinates = (routeData: any[]) => {
    if (routeData.length < 2) return routeData.map(item => item.coordinates);
    
    const routeCoordinates = [];
    
    for (let i = 0; i < routeData.length; i++) {
      const current = routeData[i].coordinates;
      routeCoordinates.push(current);
      
      // Add intermediate waypoints between consecutive monasteries
      if (i < routeData.length - 1) {
        const next = routeData[i + 1].coordinates;
        const intermediatePoints = generateRoadPath(current, next, i);
        routeCoordinates.push(...intermediatePoints);
      }
    }
    
    return routeCoordinates;
  };

  const generateRoadPath = (start: any, end: any, segmentIndex: number) => {
    const points = [];
    const steps = 15; // More points for detailed path
    
    // Calculate distance to determine path complexity
    const latDiff = end.latitude - start.latitude;
    const lngDiff = end.longitude - start.longitude;
    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
    
    for (let i = 1; i < steps; i++) {
      const ratio = i / steps;
      
      // Create a more realistic mountain road path
      const baseLat = start.latitude + (latDiff * ratio);
      const baseLng = start.longitude + (lngDiff * ratio);
      
      // Add curves that simulate mountain roads
      const curvePhase = ratio * Math.PI;
      const curveAmplitude = distance * 0.3; // Curve intensity based on distance
      
      // Primary curve (sine wave for smooth mountain road)
      const primaryCurve = Math.sin(curvePhase) * curveAmplitude;
      
      // Secondary curve for more realistic road following terrain
      const secondaryCurve = Math.sin(curvePhase * 2) * curveAmplitude * 0.3;
      
      // Add some variation to simulate road following valleys and ridges
      const terrainVariation = Math.sin(curvePhase * 3) * curveAmplitude * 0.1;
      
      const lat = baseLat + primaryCurve + secondaryCurve + terrainVariation;
      const lng = baseLng + (primaryCurve * 0.6) + (secondaryCurve * 0.4) + (terrainVariation * 0.8);
      
      points.push({
        latitude: lat,
        longitude: lng
      });
    }
    
    return points;
  };


  const handlePlanRoute = (routeData: any[]) => {
    setPlannedRoute(routeData);
    setShowRoute(true);
    
    // Fit map to show all route points
    if (routeData.length > 0 && mapRef.current) {
      const coordinates = routeData.map(item => item.coordinates);
      
      // Calculate bounds
      const latitudes = coordinates.map(coord => coord.latitude);
      const longitudes = coordinates.map(coord => coord.longitude);
      
      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);
      
      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLng + maxLng) / 2;
      const deltaLat = (maxLat - minLat) * 1.2; // Add some padding
      const deltaLng = (maxLng - minLng) * 1.2;
      
      mapRef.current.animateToRegion({
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: Math.max(deltaLat, 0.1),
        longitudeDelta: Math.max(deltaLng, 0.1),
      }, 1000);
    }
  };

  const clearRoute = () => {
    setShowRoute(false);
    setPlannedRoute([]);
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
        {/* Regular markers */}
        {!showRoute && markers.map((marker, index) => (
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

        {/* Route markers and polyline */}
        {showRoute && plannedRoute.length > 0 && (
          <>
            {/* Route polyline with intermediate waypoints */}
            <Polyline
              coordinates={generateRouteCoordinates(plannedRoute)}
              strokeColor="#2E7D32"
              strokeWidth={5}
              lineDashPattern={[10, 5]}
            />
            {/* Secondary polyline for road effect */}
            <Polyline
              coordinates={generateRouteCoordinates(plannedRoute)}
              strokeColor="#4CAF50"
              strokeWidth={3}
              lineDashPattern={[15, 8]}
            />
            
            {/* Route markers with numbers */}
            {plannedRoute.map((item, index) => (
              <Marker
                key={`route-${item.id}`}
                coordinate={{
                  latitude: item.coordinates.latitude,
                  longitude: item.coordinates.longitude,
                }}
                title={`${index + 1}. ${item.name}`}
                description={`Priority: ${item.priority.toUpperCase()}`}
                onPress={() => handleMarkerPress(item, index)}
              >
                <View style={styles.routeMarkerContainer}>
                  <View style={[
                    styles.routeMarker,
                    item.priority === 'high' && styles.highPriorityMarker,
                    item.priority === 'medium' && styles.mediumPriorityMarker,
                    item.priority === 'low' && styles.lowPriorityMarker,
                  ]}>
                    <BoldText style={styles.routeMarkerNumber}>{index + 1}</BoldText>
                  </View>
                </View>
              </Marker>
            ))}
          </>
        )}
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

        {/* Clear Route Button */}
        {showRoute && (
          <TouchableOpacity style={styles.clearRouteButton} onPress={clearRoute}>
            <Feather name="x" size={20} color="#fff" />
          </TouchableOpacity>
        )}
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
        {/* Background Pattern Overlay */}
        <View style={styles.backgroundPattern} />
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
          <View style={styles.listSubtitle}>
            <BoldText style={styles.subtitleText}>Discover sacred places</BoldText>
          </View>
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
        onPlanRoute={handlePlanRoute}
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 20,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(99, 102, 241, 0.02)',
    opacity: 0.5,
  },
  dragHandle: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: -20,
    marginBottom: 8,
  },
  dragIndicator: {
    width: 48,
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dragIndicatorActive: {
    backgroundColor: '#6366f1',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  listHeader: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.5,
  },
  listSubtitle: {
    marginTop: 4,
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
    letterSpacing: 0.2,
  },
  locationsList: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedLocationItem: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderWidth: 2,
    borderColor: '#6366f1',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  locationInfo: {
    flex: 1,
    marginRight: 16,
  },
  locationName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  locationDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    fontWeight: '400',
  },
  locationImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clearRouteButton: {
    width: 48,
    height: 48,
    backgroundColor: '#f44336',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#d32f2f',
  },
  routeMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  highPriorityMarker: {
    backgroundColor: '#4CAF50',
  },
  mediumPriorityMarker: {
    backgroundColor: '#FF9800',
  },
  lowPriorityMarker: {
    backgroundColor: '#9E9E9E',
  },
  routeMarkerNumber: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});