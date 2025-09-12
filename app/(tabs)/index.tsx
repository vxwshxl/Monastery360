import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Animated } from "react-native";
import Events from '../../components/events';
import Monastery from '../../components/monastery';
import Packages from '../../components/packages';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("monastery");
  const [showLanguageFilter, setShowLanguageFilter] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [fadeAnim] = useState(new Animated.Value(0));

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
    // Here you can add logic to change app language or filter content
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
});