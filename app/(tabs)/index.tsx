import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Animated, Image, Dimensions } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import Events from '../../components/events';
import Monastery from '../../components/monastery';
import Packages from '../../components/packages';

const { width, height } = Dimensions.get('window');

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("monastery");
  const [showLanguageFilter, setShowLanguageFilter] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapFadeAnim] = useState(new Animated.Value(0));

  // Sikkim coordinates and boundaries
  const sikkimRegion = {
    latitude: 27.5330,
    longitude: 88.5122,
    latitudeDelta: 1.5,
    longitudeDelta: 1.2,
  };

  // Major cities and monasteries in Sikkim
  const sikkimLocations = [
    {
      id: 1,
      title: "Gangtok (Capital)",
      coordinate: { latitude: 27.3314, longitude: 88.6138 },
      type: "capital",
      description: "Capital city of Sikkim"
    },
    {
      id: 2,
      title: "Rumtek Monastery",
      coordinate: { latitude: 27.2783, longitude: 88.5500 },
      type: "monastery",
      description: "Famous Buddhist monastery"
    },
    {
      id: 3,
      title: "Pelling",
      coordinate: { latitude: 27.2167, longitude: 88.2167 },
      type: "town",
      description: "Tourist destination with mountain views"
    },
    {
      id: 4,
      title: "Yuksom",
      coordinate: { latitude: 27.3667, longitude: 88.2167 },
      type: "town",
      description: "Historic first capital of Sikkim"
    },
    {
      id: 5,
      title: "Namchi",
      coordinate: { latitude: 27.1667, longitude: 88.3667 },
      type: "town",
      description: "Sky High statue location"
    },
    {
      id: 6,
      title: "Lachung",
      coordinate: { latitude: 27.7000, longitude: 88.7333 },
      type: "town",
      description: "Mountain village in North Sikkim"
    },
    {
      id: 7,
      title: "Nathu La Pass",
      coordinate: { latitude: 27.3917, longitude: 88.8417 },
      type: "pass",
      description: "Mountain pass on India-China border"
    },
    {
      id: 8,
      title: "Tsomgo Lake",
      coordinate: { latitude: 27.4000, longitude: 88.7583 },
      type: "lake",
      description: "Sacred glacial lake"
    }
  ];

  // Sikkim state boundary (approximate polygon)
  const sikkimBoundary = [
    { latitude: 28.1280, longitude: 88.0625 },
    { latitude: 28.1280, longitude: 88.9167 },
    { latitude: 27.0417, longitude: 88.9167 },
    { latitude: 27.0417, longitude: 88.0625 },
    { latitude: 28.1280, longitude: 88.0625 }
  ];

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ne', name: 'Nepali', flag: '🇳🇵' },
    { code: 'sip', name: 'Sikkimese (Bhutia)', flag: '🏔️' },
    { code: 'lep', name: 'Lepcha', flag: '🌸' }
  ];

  // Handle tab press
  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  // Handle filter button press
  const handleFilterPress = () => {
    setShowLanguageFilter(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Handle language selection
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    closeLanguageFilter();
    console.log(`Language changed to: ${language.name}`);
  };

  // Close language filter
  const closeLanguageFilter = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowLanguageFilter(false);
    });
  };

  // Handle floating download button press
  const handleDownloadPress = () => {
    setShowMapModal(true);
    Animated.timing(mapFadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Close map modal
  const closeMapModal = () => {
    Animated.timing(mapFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowMapModal(false);
    });
  };

  // Handle download map button press
  const handleDownloadMap = () => {
    console.log("Downloading Sikkim map...");
    // Add actual download functionality here
    closeMapModal();
  };

  // Get marker color based on location type
  const getMarkerColor = (type) => {
    switch (type) {
      case 'capital': return '#FF6B6B';
      case 'monastery': return '#4ECDC4';
      case 'town': return '#45B7D1';
      case 'pass': return '#96CEB4';
      case 'lake': return '#FECA57';
      default: return '#74B9FF';
    }
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "monastery":
        return <Monastery searchQuery={searchQuery} selectedLanguage={selectedLanguage} />;
      case "events":
        return <Events searchQuery={searchQuery} selectedLanguage={selectedLanguage} />;
      case "packages":
        return <Packages searchQuery={searchQuery} selectedLanguage={selectedLanguage} />;
      default:
        return <Monastery searchQuery={searchQuery} selectedLanguage={selectedLanguage} />;
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
            <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
              <Ionicons name="options" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Selected Language Indicator */}
          {selectedLanguage !== "English" && (
            <View style={styles.languageIndicator}>
              <Text style={styles.languageIndicatorText}>
                Language: {selectedLanguage}
              </Text>
            </View>
          )}
        </View>

        {/* Render Tab Content */}
        {renderTabContent()}

        {/* Language Filter Modal */}
        <Modal
          visible={showLanguageFilter}
          transparent={true}
          animationType="none"
          onRequestClose={closeLanguageFilter}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={closeLanguageFilter}
          >
            <Animated.View 
              style={[
                styles.languageDropdown,
                {
                  opacity: fadeAnim,
                  transform: [{
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  }],
                }
              ]}
            >
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownTitle}>Select Language</Text>
                <TouchableOpacity onPress={closeLanguageFilter}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.languageList}>
                {languages.map((language, index) => (
                  <TouchableOpacity
                    key={language.code}
                    style={[
                      styles.languageOption,
                      selectedLanguage === language.name && styles.selectedLanguageOption,
                      index === languages.length - 1 && { borderBottomWidth: 0 }
                    ]}
                    onPress={() => handleLanguageSelect(language)}
                  >
                    <View style={styles.languageOptionContent}>
                      <Text style={[
                        styles.languageName,
                        selectedLanguage === language.name && styles.selectedLanguageName
                      ]}>
                        {language.name}
                      </Text>
                    </View>
                    {selectedLanguage === language.name && (
                      <Ionicons name="checkmark" size={20} color="#4f46e5" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Modal>

        {/* Map Download Modal */}
        <Modal
          visible={showMapModal}
          transparent={true}
          animationType="none"
          onRequestClose={closeMapModal}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={closeMapModal}
          >
            <Animated.View 
              style={[
                styles.mapModal,
                {
                  opacity: mapFadeAnim,
                  transform: [{
                    scale: mapFadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  }],
                }
              ]}
            >
              <View style={styles.mapModalHeader}>
                <Text style={styles.mapModalTitle}>Sikkim Interactive Map</Text>
                <TouchableOpacity onPress={closeMapModal}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              
              {/* Interactive Map Container */}
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={sikkimRegion}
                  mapType="terrain"
                  showsUserLocation={false}
                  showsMyLocationButton={false}
                  scrollEnabled={true}
                  zoomEnabled={true}
                  pitchEnabled={false}
                  rotateEnabled={false}
                >
                  {/* Sikkim State Boundary */}
                  <Polyline
                    coordinates={sikkimBoundary}
                    strokeColor="#29292B"
                    strokeWidth={3}
                    lineDashPattern={[10, 5]}
                  />

                  {/* Location Markers */}
                  {sikkimLocations.map((location) => (
                    <Marker
                      key={location.id}
                      coordinate={location.coordinate}
                      title={location.title}
                      description={location.description}
                      pinColor={getMarkerColor(location.type)}
                    >
                      <View style={[styles.customMarker, { backgroundColor: getMarkerColor(location.type) }]}>
                        <Ionicons 
                          name={
                            location.type === 'capital' ? 'star' :
                            location.type === 'monastery' ? 'home' :
                            location.type === 'pass' ? 'mountain' :
                            location.type === 'lake' ? 'water' : 'location'
                          } 
                          size={16} 
                          color="#fff" 
                        />
                      </View>
                    </Marker>
                  ))}
                </MapView>
              </View>
              
              {/* Map Legend */}
              <View style={styles.mapLegend}>
                <Text style={styles.legendTitle}>Map Legend</Text>
                <View style={styles.legendItems}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#FF6B6B' }]} />
                    <Text style={styles.legendText}>Capital</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#4ECDC4' }]} />
                    <Text style={styles.legendText}>Monastery</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#45B7D1' }]} />
                    <Text style={styles.legendText}>Town</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#96CEB4' }]} />
                    <Text style={styles.legendText}>Pass</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#FECA57' }]} />
                    <Text style={styles.legendText}>Lake</Text>
                  </View>
                </View>
              </View>
              
              {/* Download Button */}
              <TouchableOpacity style={styles.downloadMapButton} onPress={handleDownloadMap}>
                <Ionicons name="download" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.downloadMapButtonText}>Download Offline Map</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Modal>

      </ScrollView>

      {/* Floating Download Button */}
      <TouchableOpacity style={styles.floatingDownloadButton} onPress={handleDownloadPress}>
        <Ionicons name="download" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginBottom: 110,
    paddingBottom: 100,
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
    flex: 1,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#333",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  languageIndicator: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#29292B',
    borderRadius: 16,
    alignSelf: 'flex-end',
  },
  languageIndicatorText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  languageDropdown: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 320,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  languageList: {
    paddingVertical: 8,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  selectedLanguageOption: {
    backgroundColor: '#f8f9ff',
  },
  languageOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedLanguageName: {
    color: '#4f46e5',
    fontWeight: '600',
  },
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
  // Floating Download Button Styles
  floatingDownloadButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#29292B',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  // Map Modal Styles
  mapModal: {
    backgroundColor: '#fff',
    width: '95%',
    maxWidth: 400,
    maxHeight: height * 0.85,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  mapModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  mapModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  mapContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    height: 300,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  customMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  mapLegend: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  downloadMapButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29292B',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },
  downloadMapButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});