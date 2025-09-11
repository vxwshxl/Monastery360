import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Link } from "expo-router";
import markers from './markers';

// FONTS
import LightText from '@/assets/fonts/LightText';
import MediumText from '@/assets/fonts/MediumText';
import BoldText from '@/assets/fonts/BoldText';

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Trip Section */}
        <View style={styles.monasterySection}>
          <Text style={styles.tripTitle}>Select your next trip</Text>
        </View>

        {/* Cards Grid */}
        <View style={styles.cardsGrid}>
          {markers.map((trip) => (
            <Link href="/destination" asChild key={trip.id}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

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
});
