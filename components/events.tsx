import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import eventList from './eventList';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Filter events based on search query
  const filteredEvents = eventList.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDurationIcon = (type) => {
    switch (type) {
      case 'Festival':
      case 'Religious Festival':
      case 'Buddhist Festival':
      case 'Traditional Festival':
      case 'Sacred Festival':
        return '🎭';
      case 'Food Festival':
        return '🍽️';
      case 'Seasonal Festival':
      case 'Horticultural Festival':
        return '🌸';
      case 'Tourism Festival':
        return '🎪';
      case 'Agricultural Festival':
        return '🌾';
      default:
        return '📅';
    }
  };

  const EventTicket = ({ event }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventImageContainer}>
        <Image source={{ uri: event.image }} style={styles.eventImage} />
      </View>
      
      <View style={styles.eventContent}>
        {/* Event Categories */}
        <View style={styles.categoryContainer}>
          {event.category.slice(0, 2).map((category, index) => (
            <View key={index} style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>

        {/* Event Title with Icon and Duration */}
        <View style={styles.titleContainer}>
          <Text style={styles.eventTitle}>
            {event.name} {getDurationIcon(event.type)}
          </Text>
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>{event.duration}</Text>
            <Text style={styles.daysText}>
              {event.duration === 1 ? 'Day' : 'Days'}
            </Text>
          </View>
        </View>

        {/* Event Location */}
        <Text style={styles.locationText}>{event.location}</Text>

        {/* Event Highlights */}
        <View style={styles.highlightsContainer}>
          {event.highlights.slice(0, 4).map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              {index === 0 && <Ionicons name="star" size={16} color="#666" />}
              {index === 1 && <Ionicons name="people" size={16} color="#666" />}
              {index === 2 && <Ionicons name="camera" size={16} color="#666" />}
              {index === 3 && <Ionicons name="musical-notes" size={16} color="#666" />}
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        {/* Pricing and Actions */}
        <View style={styles.actionContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Entry Fee</Text>
            <Text style={styles.priceValue}>{event.ticketPrice}</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
            
            <View style={styles.contactButtons}>
              <TouchableOpacity style={styles.enquireButton}>
                <Ionicons name="mail" size={16} color="#fff" />
                <Text style={styles.enquireText}>Enquire Now</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.whatsappButton}>
                <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Events List */}
        <View style={styles.eventsContainer}>
          {filteredEvents.map((event) => (
            <EventTicket key={event.id} event={event} />
          ))}
        </View>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Ionicons name="calendar-outline" size={80} color="#ccc" />
            <Text style={styles.noResultsText}>No events found</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your search terms</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
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
  eventsContainer: {
    paddingHorizontal: 10,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  eventImageContainer: {
    width: '100%',
    height: 200,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  durationContainer: {
    alignItems: 'center',
  },
  durationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  daysText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 15,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
  },
  highlightText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    flex: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  detailsButton: {
    backgroundColor: '#FF4757',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  enquireButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  enquireText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  whatsappButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});