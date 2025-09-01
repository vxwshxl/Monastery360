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

  // Reusable TourCard Component
  type TourCardProps = {
    title: string;
    duration: string;
    rating: string;
    reviews: string;
    image: any;
  };

  const TourCard: React.FC<TourCardProps> = ({ title, duration, rating, reviews, image }) => (
    <TouchableOpacity style={styles.tourCard}>
      <Image source={image} style={styles.tourImage} />
      <TouchableOpacity style={styles.tourFavorite}>
        <Ionicons name="heart-outline" size={16} color="#333" />
      </TouchableOpacity>
      <View style={styles.tourInfo}>
        <Text style={styles.tourTitle}>{title}</Text>
        <Text style={styles.tourDuration}>{duration}</Text>
        <View style={styles.tourFooter}>
          <View style={styles.tourRating}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.tourRatingText}>{rating}</Text>
            <Text style={styles.tourReviews}>{reviews} reviews</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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
      </Animated.View>

      {/* Header Controls */}
      <SafeAreaView style={styles.headerControls}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Link href="/pano" asChild>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="reload-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Link>
      </SafeAreaView>

      {/* Scrollable Content */}
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
          {/* Destination Info */}
          <Animated.View
            style={[
              styles.destinationHeader,
              { transform: [{ scale: titleScale }] },
            ]}
          >
            <View style={styles.titleRow}>
              <Text style={styles.destinationTitle}>Rio de Janeiro</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>5.0</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <View style={styles.locationBadge}>
                <Text style={styles.locationText}>Brazil</Text>
              </View>
              <Text style={styles.reviewsText}>143 reviews</Text>
            </View>
          </Animated.View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionText}>
              Rio de Janeiro, often simply called Rio, is one of Brazil's most
              iconic cities, renowned for its stunning beaches, vibrant culture,
              and breathtaking landscapes.
            </Text>
            <TouchableOpacity>
              <Text style={styles.readMoreText}>Read more</Text>
            </TouchableOpacity>
          </View>

          {/* Upcoming Tours */}
          <View style={styles.toursSection}>
            <View style={styles.toursSectionHeader}>
              <Text style={styles.toursTitle}>Upcoming tours</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            {/* Horizontal Tour Cards */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.toursList}
            >
              <TourCard
                title="Iconic Brazil"
                duration="5 days • from $500/person"
                rating="4.6"
                reviews="48"
                image={require("../assets/panoramic/p1.jpg")}
              />
              <TourCard
                title="Beach Paradise"
                duration="3 days • from $300/person"
                rating="4.8"
                reviews="72"
                image={require("../assets/panoramic/p1.jpg")}
              />
            </ScrollView>
          </View>

          {/* Book Now Button */}
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
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
    backgroundColor: "rgba(0,0,0,0.3)",
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
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  /** Scroll */
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerSpacer: {
    height: HEADER_HEIGHT - 50,
  },

  /** Content Card */
  contentCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    marginTop: -20,
  },

  /** Destination Info */
  destinationHeader: {
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  destinationTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationBadge: {
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4CAF50",
  },
  reviewsText: {
    fontSize: 14,
    color: "#666",
  },

  /** Description */
  descriptionSection: {
    marginBottom: 30,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 10,
  },
  readMoreText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },

  /** Tours Section */
  toursSection: {
    marginBottom: 30,
  },
  toursSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  toursTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  seeAllText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  toursList: {
    paddingRight: 20,
  },

  /** Tour Card */
  tourCard: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  tourImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  tourFavorite: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tourInfo: {
    padding: 15,
  },
  tourTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
  },
  tourDuration: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  tourFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  tourRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tourRatingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  tourReviews: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },

  /** Book Button */
  bookButton: {
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 25,
    gap: 10,
    marginTop: 20,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
