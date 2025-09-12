import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import markers from './markers';

// FONTS

const Monastery = ({ searchQuery }) => {
  // Filter markers based on search query
  const filteredMarkers = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return markers;
    }
    
    const query = searchQuery.toLowerCase().trim();
    
    return markers.filter((marker) => {
      // Search in name, location, and description
      const searchInName = marker.name.toLowerCase().includes(query);
      const searchInLocation = marker.location.toLowerCase().includes(query);
      const searchInDescription = marker.description.toLowerCase().includes(query);
      
      return searchInName || searchInLocation || searchInDescription;
    });
  }, [searchQuery]);

  const getDisplayTitle = () => {
    if (searchQuery && searchQuery.trim() !== '') {
      return filteredMarkers.length > 0 
        ? `Found ${filteredMarkers.length} result${filteredMarkers.length !== 1 ? 's' : ''} for "${searchQuery}"`
        : `No results found for "${searchQuery}"`;
    }
    return "Select your next trip";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Trip Section */}
        <View style={styles.monasterySection}>
          <Text style={styles.tripTitle}>{getDisplayTitle()}</Text>
        </View>

        {/* Cards Grid */}
        {filteredMarkers.length > 0 ? (
          <View style={styles.cardsGrid}>
            {filteredMarkers.map((trip) => (
              <Link href={`/destination?id=${trip.id}`} asChild key={trip.id}>
                <TouchableOpacity style={styles.card}>
                  <Image source={{ uri: trip.image }} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>{trip.name}</Text>
                  <View style={styles.ratingRow}>
                    <Text style={styles.ratingText}>{trip.location}</Text>
                    <Text style={styles.ratingText}> • </Text>
                    <Ionicons name="star" size={14} color="#000" />
                    <Text style={styles.ratingText}>{trip.rating}</Text>
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
              <Text style={styles.suggestionsText}>• Monastery names (e.g., "Rumtek", "Tashiding")</Text>
              <Text style={styles.suggestionsText}>• Locations (e.g., "Gangtok", "Sikkim")</Text>
              <Text style={styles.suggestionsText}>• Keywords (e.g., "peaceful", "ancient")</Text>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Monastery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 20,
  },
  monasterySection: {
    marginBottom: 20,
  },
  tripTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 20,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: "#000",
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