import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import eventList from './eventList';

const Events = ({ searchQuery = "" }) => {  // Accept searchQuery as prop with default value
  const router = useRouter();

  // Filter events based on search query
  const filteredEvents = eventList.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase())) ||
    event.highlights.some(highlight => highlight.toLowerCase().includes(searchQuery.toLowerCase()))
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
      {/* Left side - Image */}
      <View style={styles.eventImageContainer}>
        <Image source={{ uri: event.image }} style={styles.eventImage} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationBadgeText}>{event.duration} Days</Text>
        </View>
      </View>
      
      {/* Right side - Content */}
      <View style={styles.eventContent}>
        {/* Categories */}
        <View style={styles.categoryContainer}>
          {event.category.slice(0, 2).map((category, index) => (
            <View key={index} style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>

        {/* Title and Icon */}
        <Text style={styles.eventTitle} numberOfLines={2}>
          {event.name} {getDurationIcon(event.type)}
        </Text>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.locationText} numberOfLines={1}>{event.location}</Text>
        </View>

        {/* Highlights - Show only 2 in horizontal layout */}
        <View style={styles.highlightsContainer}>
          {event.highlights.slice(0, 2).map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              <View style={styles.highlightDot} />
              <Text style={styles.highlightText} numberOfLines={1}>{highlight}</Text>
            </View>
          ))}
        </View>

        {/* Bottom section - Price and Actions */}
        <View style={styles.bottomSection}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={styles.priceValue}>{event.ticketPrice}</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.whatsappButton}>
              <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.enquireButton}>
              <Text style={styles.enquireText}>Enquire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Results Info */}
        {searchQuery.length > 0 && (
          <View style={styles.searchResultsInfo}>
            <Text style={styles.searchResultsText}>
              {filteredEvents.length} results for "{searchQuery}"
            </Text>
          </View>
        )}

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
            <Text style={styles.noResultsText}>
              {searchQuery.length > 0 ? 'No events found' : 'No events available'}
            </Text>
            <Text style={styles.noResultsSubtext}>
              {searchQuery.length > 0 ? 'Try adjusting your search terms' : 'Check back later for upcoming events'}
            </Text>
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 100,
  },
  searchResultsInfo: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchResultsText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  eventsContainer: {
    paddingTop: 8,
    paddingHorizontal: 10,
  },
  eventCard: {
    flexDirection: 'row',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    elevation: 6,
    overflow: 'hidden',
    minHeight: 160,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
  },
  eventImageContainer: {
    width: 130,
    height: 180,
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    resizeMode: 'cover',
  },
  durationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backdropFilter: 'blur(10px)',
  },
  durationBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  eventContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 6,
  },
  categoryBadge: {
    backgroundColor: '#f8f9ff',
    borderColor: '#e1e7ff',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    color: '#4f46e5',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 22,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  highlightsContainer: {
    marginBottom: 16,
    gap: 6,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  highlightText: {
    fontSize: 12,
    color: '#555',
    flex: 1,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  whatsappButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f0fdf4',
    borderColor: '#dcfce7',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enquireButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  enquireText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
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