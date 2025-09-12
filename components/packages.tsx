import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Link } from "expo-router";
import packagesList from './packagesList';

// FONTS
import LightText from '@/assets/fonts/LightText';
import MediumText from '@/assets/fonts/MediumText';
import BoldText from '@/assets/fonts/BoldText';

const Packages = ({ searchQuery }) => {
  // Filter packages based on search query
  const filteredPackages = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return packagesList;
    }
    
    const query = searchQuery.toLowerCase().trim();
    
    return packagesList.filter((pkg) => {
      // Search in name, destinations, description, and categories
      const searchInName = pkg.name.toLowerCase().includes(query);
      const searchInDestinations = pkg.destinations.some(dest => 
        dest.toLowerCase().includes(query)
      );
      const searchInDescription = pkg.description.toLowerCase().includes(query);
      const searchInCategories = pkg.category.some(cat => 
        cat.toLowerCase().includes(query)
      );
      
      return searchInName || searchInDestinations || searchInDescription || searchInCategories;
    });
  }, [searchQuery]);

  const getDisplayTitle = () => {
    if (searchQuery && searchQuery.trim() !== '') {
      return filteredPackages.length > 0 
        ? `Found ${filteredPackages.length} result${filteredPackages.length !== 1 ? 's' : ''} for "${searchQuery}"`
        : `No results found for "${searchQuery}"`;
    }
    return "Select your next trip";
  };

  const formatDestinations = (destinations) => {
    if (destinations.length <= 2) {
      return destinations.join(' → ');
    }
    return `${destinations[0]} → ${destinations[destinations.length - 1]} (${destinations.length - 2} more)`;
  };

  const getCategoryIcons = (categories) => {
    const iconMap = {
      'Family with Kids': 'people',
      'Adventure': 'mountain',
      'Spiritual': 'leaf',
      'Cultural': 'library',
      'Honeymoon': 'heart',
      'Couples': 'heart',
      'Wildlife': 'paw',
      'Nature': 'flower',
      'Photography': 'camera',
      'Winter Sports': 'snow',
      'Shopping': 'bag'
    };
    
    return categories.map(category => iconMap[category] || 'location').slice(0, 2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Trip Section */}
        <View style={styles.packageSection}>
          <Text style={styles.tripTitle}>{getDisplayTitle()}</Text>
        </View>

        {/* Package Cards */}
        {filteredPackages.length > 0 ? (
          <View style={styles.packagesList}>
            {filteredPackages.map((pkg) => (
              <Link href={`/packageDetails?id=${pkg.id}`} asChild key={pkg.id}>
                <TouchableOpacity style={styles.packageCard}>
                  <Image source={{ uri: pkg.image }} style={styles.packageImage} />
                  
                  <View style={styles.packageContent}>
                    {/* Categories and Duration */}
                    <View style={styles.packageHeader}>
                      <View style={styles.categoryContainer}>
                        {pkg.category.slice(0, 2).map((category, index) => (
                          <Text key={index} style={styles.categoryText}>{category}</Text>
                        ))}
                      </View>
                    </View>

                    {/* Package Name */}
                    <Text style={styles.packageTitle}>{pkg.name}</Text>
                    
                    {/* Duration and Nights */}
                    <View style={styles.durationRow}>
                      <Ionicons name="moon" size={14} color="#666" />
                      <Text style={styles.durationText}>{pkg.nights}</Text>
                      <Ionicons name="sunny" size={14} color="#666" />
                      <Text style={styles.durationText}>{pkg.duration} Days</Text>
                    </View>

                    {/* Destinations */}
                    <Text style={styles.destinationsText}>
                      {formatDestinations(pkg.destinations)}
                    </Text>

                    {/* Inclusions */}
                    <View style={styles.inclusionsRow}>
                      {pkg.inclusions.slice(0, 4).map((inclusion, index) => (
                        <View key={index} style={styles.inclusionItem}>
                          <Ionicons 
                            name={
                              inclusion === 'Hotel' ? 'bed' :
                              inclusion === 'Transfer' ? 'car' :
                              inclusion === 'Sightseeing' ? 'eye' :
                              inclusion === 'Meals' ? 'restaurant' :
                              'checkmark-circle'
                            } 
                            size={14} 
                            color="#666" 
                          />
                          <Text style={styles.inclusionText}>{inclusion}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Pricing and Action */}
                    <View style={styles.packageFooter}>
                      <View style={styles.pricingContainer}>
                        <Text style={styles.startingText}>Starting Price</Text>
                        <Text style={styles.priceText}>{pkg.currency}{pkg.startingPrice.toLocaleString('en-IN')}</Text>
                      </View>
                      
                      <TouchableOpacity style={styles.viewDetailsButton}>
                        <Text style={styles.viewDetailsText}>View Details</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Contact Options */}
                    <View style={styles.contactRow}>
                      <TouchableOpacity style={styles.enquireButton}>
                        <Ionicons name="mail" size={16} color="#007AFF" />
                        <Text style={styles.enquireText}>Enquire Now</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.whatsappButton}>
                        <Ionicons name="logo-whatsapp" size={16} color="#25D366" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        ) : (
          searchQuery && searchQuery.trim() !== '' && (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search" size={48} color="#ccc" />
              <Text style={styles.noResultsText}>Try searching for:</Text>
              <Text style={styles.suggestionsText}>• Package names (e.g., "Gangtok", "Darjeeling")</Text>
              <Text style={styles.suggestionsText}>• Destinations (e.g., "Sikkim", "Pelling")</Text>
              <Text style={styles.suggestionsText}>• Categories (e.g., "Adventure", "Family")</Text>
              <Text style={styles.suggestionsText}>• Activities (e.g., "Monastery", "Spiritual")</Text>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Packages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  packageSection: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  tripTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  packagesList: {
    paddingHorizontal: 16,
  },
  packageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  packageImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  packageContent: {
    padding: 16,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  durationText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  destinationsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  inclusionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  inclusionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  inclusionText: {
    fontSize: 12,
    color: '#666',
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  pricingContainer: {
    flex: 1,
  },
  startingText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  viewDetailsButton: {
    backgroundColor: '#FF5A5F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  enquireButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
  },
  enquireText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  whatsappButton: {
    backgroundColor: '#e8f5e8',
    padding: 10,
    borderRadius: 20,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 12,
  },
  suggestionsText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
    textAlign: 'center',
  },
});