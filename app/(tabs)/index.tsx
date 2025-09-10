import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

// FONTS
import LightText from '@/assets/fonts/LightText';
import MediumText from '@/assets/fonts/MediumText';
import BoldText from '@/assets/fonts/BoldText';

const index = () => {

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BoldText style={styles.greeting}>Hello User,</BoldText>
          <MediumText style={styles.welcome}>Welcome to Monastery360</MediumText>
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
        <BoldText style={styles.tripTitle}>Select your next trip</BoldText>
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tab}>
            <LightText style={styles.tabText}>Monastery</LightText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <LightText style={styles.tabText}>Sikkim</LightText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <LightText style={[styles.tabText, styles.activeTabText]}>Gangtok</LightText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card View */}
      <View style={styles.cardContainer}>
        <Link 
          href="/destination" 
          asChild
        >
          <TouchableOpacity 
            style={styles.card}
          >
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
              <BoldText style={styles.cardTitle}>Monastery</BoldText>
              <LightText style={styles.cardPrice}>1 day • ₹50/person</LightText>
              <View style={styles.cardFooter}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star-outline" size={16} color="#000" />
                  <BoldText style={styles.ratingText}>4.8</BoldText>
                  <LightText style={styles.reviewsText}>56 reviews</LightText>
                </View>
                <TouchableOpacity style={styles.arrowButton}>
                  <Ionicons name="arrow-forward" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default index;

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
    fontSize: 15,
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
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
  reviewsText: {
    paddingLeft: 26,
    fontSize: 15,
    color: "#666",
  },
  arrowButton: {
    width: 46,
    height: 46,
    backgroundColor: "#333",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});