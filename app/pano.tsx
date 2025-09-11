import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { Link, useRouter } from "expo-router";

const Web360 = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Controls */}
      <View style={styles.headerControls}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Favorite Button */}
        {/* <Link href="/pano" asChild>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Link> */}
      </View>

      {/* 360 WebView */}
      <WebView
        source={require("../app/360.html")}
        style={styles.webview}
        allowsFullscreenVideo
        javaScriptEnabled
        domStorageEnabled
      />
    </SafeAreaView>
  );
};

export default Web360;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  webview: {
    flex: 1,
  },

  /** Header Controls */
  headerControls: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    zIndex: 3,
  },
  headerButton: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
