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

const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = 300;

const DestinationDetailsPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const [monasteryData, setMonasteryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  
  // Animation values for map expansion
  const mapHeightAnim = useRef(new Animated.Value(200)).current;
  const mapOpacityAnim = useRef(new Animated.Value(1)).current;
  const overlayOpacityAnim = useRef(new Animated.Value(0)).current;

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

  const toggleMapExpansion = () => {
    const toValue = isMapExpanded ? 200 : height - 300;
    const opacityValue = isMapExpanded ? 0 : 1;
    
    Animated.parallel([
      Animated.spring(mapHeightAnim, {
        toValue,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(overlayOpacityAnim, {
        toValue: opacityValue,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
    
    setIsMapExpanded(!isMapExpanded);
  };

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

  const getRandomTimeAgo = () => {
    const daysAgo = Math.floor(Math.random() * 30) + 1;
    if (daysAgo < 7) return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    const weeks = Math.floor(daysAgo / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  };

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
          // scrollEnabled={!isMapExpanded}
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
                <Animated.View style={[styles.animatedMapContainer, { height: mapHeightAnim }]}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: monasteryData.coordinates.latitude,
                      longitude: monasteryData.coordinates.longitude,
                      latitudeDelta: monasteryData.coordinates.latitudeDelta,
                      longitudeDelta: monasteryData.coordinates.longitudeDelta,
                    }}
                    scrollEnabled={isMapExpanded}
                    zoomEnabled={isMapExpanded}
                    pitchEnabled={isMapExpanded}
                    rotateEnabled={isMapExpanded}
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
                </Animated.View>
                
                <TouchableOpacity 
                  style={styles.expandButton}
                  onPress={toggleMapExpansion}
                >
                  <Ionicons 
                    name={isMapExpanded ? "contract" : "expand"} 
                    size={16} 
                    color="#333" 
                  />
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

            {/* Reviews Section */}
            <View style={styles.reviewsSection}>
              {/* Visitor Favourite Badge */}
              <View style={styles.guestFavouriteContainer}>
                <View style={styles.laurelContainer}>
                  <Text style={styles.laurelLeft}>🏯</Text>
                  <Text style={styles.ratingLarge}>{monasteryData.rating.toFixed(2)}</Text>
                  <Text style={styles.laurelRight}>🏯</Text>
                </View>
                <Text style={styles.guestFavouriteTitle}>Visitor Favourite</Text>
                <Text style={styles.guestFavouriteSubtitle}>
                  This place is among the <Text style={styles.boldText}>top-rated</Text> tourist sites
                </Text>
                <Text style={styles.guestFavouriteSubtitle}>
                  Appreciated for its atmosphere, heritage, and serenity
                </Text>
              </View>

              {/* Rating Categories */}
              <View style={styles.ratingCategories}>
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryLabel}>Spiritual Atmosphere</Text>
                  <View style={styles.categoryRating}>
                    <View style={styles.ratingBar}>
                      <View style={[styles.ratingFill, { width: '100%' }]} />
                    </View>
                  </View>
                </View>

                <View style={styles.categoryRow}>
                  <Text style={styles.categoryLabel}>Scenic Views</Text>
                  <View style={styles.categoryRating}>
                    <View style={styles.ratingBar}>
                      <View style={[styles.ratingFill, { width: '97%' }]} />
                    </View>
                  </View>
                </View>

                <View style={styles.categoryRow}>
                  <Text style={styles.categoryLabel}>Cultural Significance</Text>
                  <View style={styles.categoryRating}>
                    <View style={styles.ratingBar}>
                      <View style={[styles.ratingFill, { width: '95%' }]} />
                    </View>
                  </View>
                </View>

                <View style={styles.categoryRow}>
                  <Text style={styles.categoryLabel}>Peace & Tranquility</Text>
                  <View style={styles.categoryRating}>
                    <View style={styles.ratingBar}>
                      <View style={[styles.ratingFill, { width: '99%' }]} />
                    </View>
                  </View>
                </View>
              </View>

              {/* Individual Reviews */}
              <View style={styles.reviewsContainer}>
                {monasteryData.reviews && monasteryData.reviews.map((review, index) => (
                  <View key={index} style={styles.reviewItem}>
                    <View style={styles.reviewStars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons key={star} name="star" size={12} color="#FFD700" />
                      ))}
                      <Text style={styles.reviewDate}>{getRandomTimeAgo()}</Text>
                    </View>
                    <Text style={styles.reviewText}>{review.review}</Text>
                    <TouchableOpacity>
                      <Text style={styles.showMoreText}>Show more</Text>
                    </TouchableOpacity>
                    <View style={styles.reviewerInfo}>
                      <View style={styles.reviewerAvatar}>
                        <Text style={styles.avatarText}>
                          {review.name.charAt(0)}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.reviewerName}>{review.name}</Text>
                        <Text style={styles.reviewerDetails}>
                          {Math.floor(Math.random() * 10) + 1} years on platform
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Show All Reviews Button */}
              <TouchableOpacity style={styles.showAllReviewsButton}>
                <Text style={styles.showAllReviewsText}>Show all 48 reviews</Text>
              </TouchableOpacity>
            </View>

            {/* Add extra space for fixed bottom section */}
            <View style={styles.bottomSpacing} />
          </View>
        </Animated.ScrollView>

        {/* Experience Section */}
        {!isMapExpanded && (
          <View style={styles.fixedBottomSection}>
            <Link href="/pano" asChild>
              <TouchableOpacity style={styles.experienceButton}>
                <Ionicons name="camera" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.experienceButtonText}>Experience 360°</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
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

  /** Map Overlay */
  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 10,
  },
  mapOverlayContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapOverlayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  mapOverlayTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  mapCloseButton: {
    width: 40,
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  expandedMapContainer: {
    flex: 1,
  },
  expandedMap: {
    width: "100%",
    height: "100%",
  },
  mapOverlayInfo: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  mapOverlayLocation: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  mapOverlayDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
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
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  animatedMapContainer: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
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
    zIndex: 5,
  },
  mapTouchOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  mapTouchContent: {
    alignItems: "center",
    gap: 8,
  },
  mapTouchText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  /** Visiting Information Section */
  visitingSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
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

  /** Reviews Section */
  reviewsSection: {
    paddingVertical: 24,
  },
  guestFavouriteContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  laurelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  laurelLeft: {
    fontSize: 24,
  },
  ratingLarge: {
    fontSize: 48,
    fontWeight: '600',
    color: '#222',
  },
  laurelRight: {
    fontSize: 24,
  },
  guestFavouriteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  guestFavouriteSubtitle: {
    fontSize: 14,
    color: '#717171',
    textAlign: 'center',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '600',
    color: '#222',
  },
  ratingCategories: {
    marginBottom: 32,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  categoryRating: {
    flex: 1,
    marginLeft: 20,
  },
  ratingBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  ratingFill: {
    height: '100%',
    backgroundColor: '#222',
  },
  reviewsContainer: {
    marginBottom: 24,
  },
  reviewItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB"
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#717171',
    marginLeft: 8,
  },
  reviewText: {
    fontSize: 16,
    color: '#222',
    lineHeight: 24,
    marginBottom: 8,
  },
  showMoreText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#ff385c',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  reviewerDetails: {
    fontSize: 12,
    color: '#717171',
  },
  showAllReviewsButton: {
    backgroundColor: '#f7f7f7',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  showAllReviewsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
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