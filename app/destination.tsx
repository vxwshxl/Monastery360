import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from "react";
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
} from "react-native";
import { Link, useRouter } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 300;

const DestinationDetailsPage = () => {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

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
            source={require("../assets/panoramic/p1.jpg")}
            style={[styles.headerImage, { opacity: imageOpacity }]}
          />
        </TouchableOpacity>
        <View style={styles.headerOverlay} />
        
        {/* Image counter badge */}
        <View style={styles.imageCounterBadge}>
          <Text style={styles.imageCounterText}>1/29</Text>
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
              <Text style={styles.propertyTitle}>HillCrest - Golden Horizon</Text>
              <Text style={styles.locationText}>Room in Shillong, India</Text>
              <Text style={styles.propertyDetails}>1 bed · Private attached bathroom</Text>
            </Animated.View>

            {/* Rating and Reviews */}
            <View style={styles.ratingSection}>
              <View style={styles.ratingItem}>
                <Text style={styles.ratingNumber}>4.98</Text>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons key={star} name="star" size={12} color="#FFD700" />
                  ))}
                </View>
              </View>
              
              <View style={styles.ratingItem}>
                <Text style={styles.ratingNumber}>55</Text>
                <Text style={styles.ratingLabel}>Reviews</Text>
              </View>
            </View>

            {/* About this place */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>About this place</Text>
              <Text style={styles.aboutText}>
                In Risa Forest Green we understand that some holidays are all about finding a space for your soul to soar. Sandwiched between two forests our spacious rooms invite you to let your soul dance to the music of cicadas, leaves rustling in the breeze, the sound of raindrops or else to the wider variety of birds who call these forests their home. Each room is designed with making your holiday a memorable...
              </Text>
            </View>

            {/* Where you'll be */}
            <View style={styles.locationSection}>
              <Text style={styles.sectionTitle}>Where you'll be</Text>
              <Text style={styles.locationSubtitle}>Shillong, Meghalaya, India</Text>
              
              <View style={styles.mapContainer}>
                <MapView
                  // provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={{
                    latitude: 25.5788,
                    longitude: 91.8933,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  pitchEnabled={false}
                  rotateEnabled={false}
                >
                  <Marker
                    coordinate={{
                      latitude: 25.5788,
                      longitude: 91.8933,
                    }}
                    title="HillCrest - Golden Horizon"
                    description="Room in Shillong, India"
                  />
                </MapView>
                <TouchableOpacity style={styles.expandButton}>
                  <Ionicons name="expand" size={16} color="#333" />
                </TouchableOpacity>
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

  /** Header */
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT + 100,
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
    paddingBottom: 100, // Space for fixed bottom section
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
  propertyTitle: {
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
    marginBottom: 2,
  },
  propertyDetails: {
    textAlign: "center",
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

  /** Location Section */
  locationSection: {
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    marginBottom: 16,
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
    borderRadius: 50,
  },
  experienceButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    width: 250,
    textAlign: "center",
  },
});