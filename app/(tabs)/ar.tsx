import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { WebView } from "react-native-webview";

const Page = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://mywebar.com/p/Project_0_7jxxca2k2i" }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        // Needed for camera + AR permissions
        geolocationEnabled={true}
        // Android only: allow camera + mic
        androidCameraAccess={true as any}
        androidMicrophoneAccess={true as any}
        // iOS needs this
        allowsFullscreenVideo={true}
        // Pass permissions via injected JS (helps mimic iframe "allow")
        injectedJavaScript={`
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => console.log("Camera/Mic access granted"))
            .catch(err => console.error("Camera/Mic denied", err));
          true;
        `}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  webview: {
    flex: 1,
  },
});
