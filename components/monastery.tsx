import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Link } from "expo-router";

const monastery = [
  {
    id: 1,
    title: "Tashiding Monastery",
    location: "Gyalshing, Sikkim",
    rating: 4.98,
    image: { uri: "https://s7ap1.scene7.com/is/image/incredibleindia/spiritual-spots-in-pelling-popular?qlt=82&ts=1726655959297,3" },
  },
  {
    id: 2,
    title: "Rumtek Monastery",
    location: "Gangtok, Sikkim",
    rating: 4.94,
    image: { uri: "https://www.tourmyindia.com/states/sikkim/images/rumtek1.jpg" },
  },
  {
    id: 3,
    title: "Phensang Monastery",
    location: "Gangtok, Sikkim",
    rating: 4.93,
    image: { uri: "https://media1.thrillophilia.com/filestore/puil20n60h8emomhi7qokxljttqb_thrangutaraabbey.jpg?w=400&dpr=2,7" },
  },
  {
    id: 4,
    title: "Pemayangtse Monastery",
    location: "Gyalshing, Sikkim",
    rating: 4.98,
    image: { uri: "https://s7ap1.scene7.com/is/image/incredibleindia/pemayangtse-monastery-pelling-sikkim-2-attr-hero?qlt=82&ts=1726656027807,2" },
  },
];

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
          {monastery.map((trip) => (
            <Link href="/destination" asChild key={trip.id}>
              <TouchableOpacity style={styles.card}>
                <Image source={trip.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{trip.title}</Text>
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
