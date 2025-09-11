import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity, StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import { CameraView, Camera } from "expo-camera";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { AREventEmitter, AR_EVENTS } from '../../components/AREventEmitter';

const Page = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  // Only show camera when page is focused AND we're in camera mode
  const shouldShowCamera = isFocused && showCamera && !webViewUrl;

  // Request camera permissions on component mount
  useEffect(() => {
    getCameraPermissions();
  }, []);

  // Reset to camera view when tab is focused
  useFocusEffect(
    React.useCallback(() => {
      setWebViewUrl(null);
      setShowCamera(true);
      setScanned(false);
    }, [])
  );

  useEffect(() => {
    if (webViewUrl && showCamera === false) {
      // WebView just opened, trigger TabBar animation
      AREventEmitter.emit(AR_EVENTS.WEBVIEW_OPENED);
    }
  }, [webViewUrl, showCamera]);

  // Listen for AR toggle events from TabBar using DeviceEventEmitter
  useEffect(() => {
    const subscription = AREventEmitter.addListener(AR_EVENTS.TOGGLE_RESET, () => {
      if (webViewUrl) {
        resetToCamera();
      }
    });

    return () => subscription.remove();
  }, [webViewUrl]);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ type, data }) => {
    if (scanned) return;
    
    setScanned(true);
    
    // Check if the scanned data is a valid URL
    const isValidUrl = (string) => {
      try {
        new URL(string);
        return true;
      } catch (_) {
        // If it doesn't start with http/https, try adding https://
        try {
          new URL(`https://${string}`);
          return true;
        } catch (_) {
          return false;
        }
      }
    };

    if (isValidUrl(data)) {
      let url = data;
      // Add https:// if the URL doesn't have a protocol
      if (!data.startsWith('http://') && !data.startsWith('https://')) {
        url = `https://${data}`;
      }
      
      setWebViewUrl(url);
      setShowCamera(false);
    } else {
      Alert.alert(
        "Invalid QR Code", 
        "The scanned QR code is not a valid URL",
        [{ text: "OK", onPress: () => setScanned(false) }]
      );
    }
  };

  const resetToCamera = () => {
    setWebViewUrl(null);
    setShowCamera(true);
    setScanned(false);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity style={styles.button} onPress={getCameraPermissions}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (shouldShowCamera) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>
              {scanned ? "QR Code Scanned!" : "Scan a QR Code"}
            </Text>
          </View>
        </CameraView>
      </View>
    );
  }

  if (webViewUrl) {
    return (
      <View style={styles.fullscreenContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" translucent={true} />
        <TouchableOpacity style={styles.backButton} onPress={resetToCamera}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <WebView
          source={{ uri: webViewUrl }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlaybook={true}
          geolocationEnabled={true}
          allowsFullscreenVideo={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            Alert.alert(
              "Error loading page",
              "Failed to load the webpage. Please try again.",
              [{ text: "Back to Camera", onPress: resetToCamera }]
            );
          }}
        />
      </View>
    );
  }

  // Fallback view when camera is not active
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.text}>Camera not active</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight || 0, // Android status bar height
  },
  camera: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  scanText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    margin: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

});