import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import markers from "../components/markers";

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 300;

const DestinationDetailsPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const [monasteryData, setMonasteryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get monastery data based on the ID from params
    const monasteryId = parseInt(params.id);
    const monastery = markers.find(m => m.id === monasteryId);
    
    if (monastery) {
      setMonasteryData(monastery);
    } else {
      // Fallback to first monastery if ID not found
      setMonasteryData(markers[0]);
    }
    setLoading(false);
  }, [params.id]);

  // Animated interpolations
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT / 2],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
    outputRange: [1, 0.8, 0.6],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  if (loading || !monasteryData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={styles.loadingText}>Loading monastery details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Parallax Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <TouchableOpacity activeOpacity={0.8}>
          <Animated.Image
            source={{ uri: monasteryData.image }}
            style={[styles.headerImage, { opacity: imageOpacity }]}
            defaultSource={require("../assets/panoramic/p1.jpg")}
          />
        </TouchableOpacity>
        <View style={styles.headerOverlay} />
        
        {/* Image counter badge */}
        <View style={styles.imageCounterBadge}>
          <Text style={styles.imageCounterText}>1/5</Text>
        </View>
      </Animated.View>

      {/* Header Controls */}
      <SafeAreaView style={styles.headerControls}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.rightControls}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Scrollable Content */}
      <View style={styles.contentContainer}>
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* Spacer for Parallax Header */}
          <View style={styles.headerSpacer} />

          {/* Content Card */}
          <View style={styles.contentCard}>
            {/* Property Info */}
            <Animated.View
              style={[
                styles.propertyHeader,
                { transform: [{ scale: titleScale }] },
              ]}
            >
              <Text style={styles.monasteryTitle}>{monasteryData.name}</Text>
              <Text style={styles.locationText}>{monasteryData.location}</Text>
              <View style={styles.weatherContainer}>
                <Ionicons name="partly-sunny" size={16} color="#666" />
                <Text style={styles.weatherDetails}>Clear • 18°C</Text>
              </View>
            </Animated.View>

            {/* Rating and Reviews */}
            <View style={styles.ratingSection}>
              <View style={styles.ratingItem}>
                <Text style={styles.ratingNumber}>{monasteryData.rating}</Text>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons 
                      key={star} 
                      name={star <= Math.floor(monasteryData.rating) ? "star" : "star-outline"} 
                      size={12} 
                      color="#FFD700" 
                    />
                  ))}
                </View>
              </View>
              
              <View style={styles.ratingItem}>
                <Text style={styles.ratingNumber}>
                  {Math.floor(Math.random() * 100) + 20}
                </Text>
                <Text style={styles.ratingLabel}>Reviews</Text>
              </View>

              <View style={styles.ratingItem}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.ratingLabel}>Sacred Site</Text>
              </View>
            </View>

            {/* About this place */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>About this monastery</Text>
              <Text style={styles.aboutText}>
                {monasteryData.description}
              </Text>
              <Text style={styles.aboutText} style={[styles.aboutText, { marginTop: 12 }]}>
                This sacred monastery offers visitors a glimpse into the rich Buddhist heritage of Sikkim. 
                Experience the serene atmosphere, traditional architecture, and spiritual significance that 
                makes this place truly special. The monastery is known for its peaceful ambiance and 
                breathtaking mountain views.
              </Text>
            </View>

            {/* Monastery Features */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>What makes this special</Text>
              <View style={styles.featuresGrid}>
                <View style={styles.featureItem}>
                  <Ionicons name="leaf" size={20} color="#666" />
                  <Text style={styles.featureText}>Peaceful Environment</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="camera" size={20} color="#666" />
                  <Text style={styles.featureText}>Photo Opportunities</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="logo-amplify" size={20} color="#666" />
                  <Text style={styles.featureText}>Mountain Views</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="book" size={20} color="#666" />
                  <Text style={styles.featureText}>Cultural Learning</Text>
                </View>
              </View>
            </View>

            {/* Where you'll be */}
            <View style={styles.locationSection}>
              <Text style={styles.sectionTitle}>Where you'll be</Text>
              <Text style={styles.locationSubtitle}>{monasteryData.location}</Text>
              
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: monasteryData.coordinates.latitude,
                    longitude: monasteryData.coordinates.longitude,
                    latitudeDelta: monasteryData.coordinates.latitudeDelta,
                    longitudeDelta: monasteryData.coordinates.longitudeDelta,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  pitchEnabled={false}
                  rotateEnabled={false}
                >
                  <Marker
                    coordinate={{
                      latitude: monasteryData.coordinates.latitude,
                      longitude: monasteryData.coordinates.longitude,
                    }}
                    title={monasteryData.name}
                    description={monasteryData.location}
                  />
                </MapView>
                <TouchableOpacity style={styles.expandButton}>
                  <Ionicons name="expand" size={16} color="#333" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Visiting Information */}
            <View style={styles.visitingSection}>
              <Text style={styles.sectionTitle}>Visiting Information</Text>
              <View style={styles.infoRow}>
                <Ionicons name="time" size={20} color="#666" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>Best Time to Visit</Text>
                  <Text style={styles.infoText}>Early morning or late afternoon for peaceful experience</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="shirt" size={20} color="#666" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>Dress Code</Text>
                  <Text style={styles.infoText}>Modest clothing recommended, remove shoes when required</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="camera-outline" size={20} color="#666" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>Photography</Text>
                  <Text style={styles.infoText}>Photography allowed in most areas, ask permission inside halls</Text>
                </View>
              </View>
            </View>

            {/* Add extra space for fixed bottom section */}
            <View style={styles.bottomSpacing} />
          </View>
        </Animated.ScrollView>

        {/* Experience Section */}
        <View style={styles.fixedBottomSection}>
          <Link href="/pano" asChild>
            <TouchableOpacity style={styles.experienceButton}>
              <Ionicons name="camera" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.experienceButtonText}>Experience 360°</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default DestinationDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },

  /** Header */
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 1,
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  headerControls: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    margin: 10,
    zIndex: 3,
  },
  rightControls: {
    flexDirection: "row",
    gap: 10,
  },
  headerButton: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageCounterBadge: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },
  imageCounterText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },

  /** Content Container */
  contentContainer: {
    flex: 1,
  },
  
  /** Scroll */
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerSpacer: {
    height: HEADER_HEIGHT - 50,
  },

  /** Content Card */
  contentCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 24,
    paddingTop: 24,
    marginTop: -20,
  },

  /** Property Info */
  propertyHeader: {
    marginBottom: 12,
  },
  monasteryTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  locationText: {
    textAlign: "center",
    fontSize: 16,
    color: "#717171",
    marginBottom: 8,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  weatherDetails: {
    fontSize: 16,
    color: "#717171",
  },

  /** Rating Section */
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
  },
  ratingItem: {
    alignItems: "center",
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  ratingLabel: {
    fontSize: 12,
    color: "#717171",
    textAlign: "center",
  },

  /** About Section */
  aboutSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 16,
    color: "#717171",
    lineHeight: 24,
  },

  /** Features Section */
  featuresSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    width: '48%',
  },
  featureText: {
    fontSize: 14,
    color: '#333',
  },

  /** Location Section */
  locationSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
  },
  locationSubtitle: {
    fontSize: 16,
    color: "#717171",
    marginBottom: 16,
  },
  mapContainer: {
    position: "relative",
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  expandButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  /** Visiting Information Section */
  visitingSection: {
    paddingVertical: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#717171',
    lineHeight: 20,
  },

  /** Bottom Spacing */
  bottomSpacing: {
    height: 40,
  },

  /** Fixed Bottom Section */
  fixedBottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "#EBEBEB",
    zIndex: 4,
  },
  experienceButton: {
    backgroundColor: "#29292B",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonIcon: {
    marginLeft: -4,
  },
  experienceButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    width: 180,
    textAlign: "center",
  },
});