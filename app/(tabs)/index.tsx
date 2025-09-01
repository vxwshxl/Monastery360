import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import React, { useState } from "react";

const Page = () => {
  const [selectedRegion, setSelectedRegion] = useState('South America');

  const regions = ['Asia', 'Europe', 'South America', 'North America'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.time}>9:41</Text>
          <View style={styles.statusIcons}>
            <View style={styles.signalBars}>
              <View style={[styles.bar, styles.bar1]} />
              <View style={[styles.bar, styles.bar2]} />
              <View style={[styles.bar, styles.bar3]} />
              <View style={[styles.bar, styles.bar4]} />
            </View>
            <View style={styles.wifiIcon} />
            <View style={styles.batteryIcon} />
          </View>
        </View>
        
        <View style={styles.headerContent}>
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>Hello, Vanessa</Text>
            <Text style={styles.subtitle}>Welcome to TripGlide</Text>
            <View style={styles.profilePic}>
              <Text style={styles.profileText}>V</Text>
            </View>
          </View>
          
          <View style={styles.filterButton}>
            <View style={styles.filterLines}>
              <View style={styles.filterLine} />
              <View style={styles.filterLine} />
              <View style={styles.filterLine} />
            </View>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </View>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>

      {/* Trip Selection */}
      <Text style={styles.sectionTitle}>Select your next trip</Text>
      
      {/* Region Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.regionsContainer}
        contentContainerStyle={styles.regionsContent}
      >
        {regions.map((region) => (
          <TouchableOpacity 
            key={region}
            style={[
              styles.regionTab, 
              selectedRegion === region && styles.selectedRegionTab
            ]}
            onPress={() => setSelectedRegion(region)}
          >
            <Text style={[
              styles.regionTabText,
              selectedRegion === region && styles.selectedRegionTabText
            ]}>
              {region}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Destination Card */}
      <View style={styles.destinationCard}>
        <View style={styles.cardImageContainer}>
          {/* Placeholder for mountain landscape */}
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🏔️ Mountain Landscape</Text>
          </View>
          
          <TouchableOpacity style={styles.heartButton}>
            <Text style={styles.heartIcon}>🤍</Text>
          </TouchableOpacity>
          
          <View style={styles.cardContent}>
            <Text style={styles.countryText}>Brazil</Text>
            <Text style={styles.cityText}>Rio de Janeiro</Text>
            
            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.rating}>5.0</Text>
              <Text style={styles.reviews}>143 reviews</Text>
            </View>
            
            <TouchableOpacity style={styles.seeMoreButton}>
              <Text style={styles.seeMoreText}>See more</Text>
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📋</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🤍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⋯</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  time: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  bar: {
    width: 3,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  bar1: { height: 4 },
  bar2: { height: 6 },
  bar3: { height: 8 },
  bar4: { height: 10 },
  wifiIcon: {
    width: 15,
    height: 12,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 3,
  },
  batteryIcon: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
    backgroundColor: '#000',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  welcomeSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  profilePic: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  filterLines: {
    gap: 3,
  },
  filterLine: {
    width: 16,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchIconText: {
    fontSize: 18,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  regionsContainer: {
    marginBottom: 20,
  },
  regionsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  regionTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  selectedRegionTab: {
    backgroundColor: '#333',
  },
  regionTabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  selectedRegionTabText: {
    color: '#fff',
  },
  destinationCard: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  cardImageContainer: {
    height: 300,
    position: 'relative',
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: 'linear-gradient(135deg, #87CEEB 0%, #DDA0DD 100%)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
  },
  placeholderText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  heartButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 20,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  countryText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.9,
  },
  cityText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  rating: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  reviews: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
  },
  seeMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  arrowIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#333',
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 25,
    paddingVertical: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNavItem: {
    backgroundColor: '#fff',
  },
  navIcon: {
    fontSize: 20,
  },
});