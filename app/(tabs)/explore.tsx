import { StyleSheet, View, Text } from "react-native";
import React from "react";

const Page = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore Screen</Text>
    </View>
  );
};

export default Page;
// 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // ✅ White background
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000", // Optional: black text for visibility
  },
});
