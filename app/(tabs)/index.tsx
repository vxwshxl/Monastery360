import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from "react-native";
import Monastery from '../../components/monastery';
import Events from '../../components/events';
import Packages from '../../components/events';

// FONTS
import BoldText from '@/assets/fonts/BoldText';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("monastery");

  // Handle tab press
  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "monastery":
        return <Monastery searchQuery={searchQuery} />;
      case "events":
        return <Events searchQuery={searchQuery} />;
      case "packages":
        return <Packages searchQuery={searchQuery} />;
      default:
        return <Monastery searchQuery={searchQuery} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Navigation Tabs */}
          <View style={styles.navigationTabs}>
            <TouchableOpacity 
              style={activeTab === "monastery" ? styles.activeTab : styles.inactiveTab}
              onPress={() => handleTabPress("monastery")}
            >
              <View style={styles.tabIconContainer}>
                <Ionicons 
                  name="home" 
                  size={30} 
                  color={activeTab === "monastery" ? "#333" : "#999"} 
                />
              </View>
              <Text style={activeTab === "monastery" ? styles.activeTabText : styles.inactiveTabText}>
                Monastery
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={activeTab === "events" ? styles.activeTab : styles.inactiveTab}
              onPress={() => handleTabPress("events")}
            >
              <View style={styles.tabIconContainer}>
                <View style={styles.eventIcon}>
                  <Ionicons 
                    name="calendar" 
                    size={30} 
                    color={activeTab === "events" ? "#333" : "#999"} 
                  />
                </View>
              </View>
              <Text style={activeTab === "events" ? styles.activeTabText : styles.inactiveTabText}>
                Events
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={activeTab === "packages" ? styles.activeTab : styles.inactiveTab}
              onPress={() => handleTabPress("packages")}
            >
              <View style={styles.tabIconContainer}>
                <Ionicons 
                  name="car-sport" 
                  size={30} 
                  color={activeTab === "packages" ? "#333" : "#999"} 
                />
              </View>
              <Text style={activeTab === "packages" ? styles.activeTabText : styles.inactiveTabText}>
                Packages
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Search Bar */}
          <View style={styles.searchButton}>
            <Ionicons name="search" size={25} color="#999" />
            <TextInput
              style={styles.searchPlaceholder}
              placeholder="Start your search"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Render Tab Content */}
        {renderTabContent()}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 110,
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
    color: '#000',
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
  // New styles for tab content
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  tabContentText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  tabContentSubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});