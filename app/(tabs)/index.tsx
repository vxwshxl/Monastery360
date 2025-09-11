import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

import Monastery from '../../components/monastery';

// FONTS
import LightText from '@/assets/fonts/LightText';
import MediumText from '@/assets/fonts/MediumText';
import BoldText from '@/assets/fonts/BoldText';

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section - Updated */}
        <View style={styles.header}>
          {/* Navigation Tabs */}
          <View style={styles.navigationTabs}>
            <TouchableOpacity style={styles.activeTab}>
              <View style={styles.tabIconContainer}>
                <Ionicons name="home" size={30} color="#333" />
              </View>
              <Text style={styles.activeTabText}>Monastery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.inactiveTab}>
              <View style={styles.tabIconContainer}>
                <View style={styles.eventIcon}>
                  <Ionicons name="calendar" size={30} color="#999" />
                </View>
              </View>
              <Text style={styles.inactiveTabText}>Events</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.inactiveTab}>
              <View style={styles.tabIconContainer}>
                <Ionicons name="car-sport" size={30} color="#999" />
              </View>
              <Text style={styles.inactiveTabText}>Packages</Text>
            </TouchableOpacity>
          </View>
          
          {/* Search Bar */}
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={25} color="#999" />
            <BoldText style={styles.searchPlaceholder}>Start your search</BoldText>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options" size={20} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <Monastery />

      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  navigationTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  activeTab: {
    alignItems: 'center',
    flex: 1,
  },
  inactiveTab: {
    alignItems: 'center',
    flex: 1,
  },
  tabIconContainer: {
    position: 'relative',
    marginBottom: 8,
    alignItems: 'center',
  },
  eventIcon: {
    transform: [{ rotate: '15deg' }],
  },
  activeTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  inactiveTabText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#999',
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    gap: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#999',
    fontWeight: '400',
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
    paddingHorizontal: 20
  },
  tripTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20
  },
  cardsContainer: {
    paddingHorizontal: 40,
    marginTop: 30,
    alignItems: 'center',
  },
  card: {
    width: 320,
    height: 350,
    backgroundColor: "#fff",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 12,
    overflow: "hidden",
    marginBottom: 30,
  },
  cardImageContainer: {
    flex: 1,
    position: "relative"
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "120%",
    justifyContent: "flex-end",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  cardContent: { padding: 25, paddingBottom: 30 },
  cardTitle: { fontSize: 28, fontWeight: "700", color: "#fff", marginBottom: 12 },
  cardDescription: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 25,
  },
  cardInfo: { marginBottom: 25 },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  ratingNumber: { fontSize: 14, fontWeight: "700", color: "#fff" },
  starsContainer: { flexDirection: "row", gap: 2 },
  nightStayBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  nightStay: { fontSize: 12, color: "#fff", fontWeight: "600" },
  reserveButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reserveButtonText: { fontSize: 16, fontWeight: "700", color: "#000" },
});