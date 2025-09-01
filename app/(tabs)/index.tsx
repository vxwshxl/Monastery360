import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, SafeAreaView } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Hello User,</Text>
          <Text style={styles.welcome}>Welcome to Monastery360</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Trip Selection */}
      <View style={styles.tripSection}>
        <Text style={styles.tripTitle}>Select your next trip</Text>
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Asia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Europe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>South America</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card View */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardImageContainer}>
            <Image
              source={require("../../assets/panoramic/p1.jpg")} // You'll need to add this image
              style={styles.cardImage}
            />
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={20} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Iconic Brazil</Text>
            <Text style={styles.cardPrice}>8 days • from $659/person</Text>
            <View style={styles.cardFooter}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
                <Text style={styles.reviewsText}>56 reviews</Text>
              </View>
              <TouchableOpacity style={styles.arrowButton}>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  welcome: {
    fontSize: 16,
    color: "#666",
    fontWeight: "400",
  },
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    gap: 12,
    paddingHorizontal: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#333",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  tripSection: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  tripTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  activeTab: {
    backgroundColor: "#333",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
  },
  cardImageContainer: {
    position: "relative",
    height: 200,
    padding: 10,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 15,
  },
  favoriteButton: {
    position: "absolute",
    top: 27,
    right: 27,
    width: 36,
    height: 36,
    backgroundColor: "#fff",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    paddingHorizontal: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  cardFooter: {
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  reviewsText: {
    fontSize: 14,
    color: "#666",
  },
  arrowButton: {
    width: 56,
    height: 56,
    backgroundColor: "#333",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});