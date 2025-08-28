import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/(tabs)");
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/* ✅ White status bar icons for dark splash */}
      <StatusBar style="light" />
      <LottieView
        source={require("../assets/animations/360.json")}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Dark background
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});
