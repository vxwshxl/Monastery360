import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  PanResponder,
  Animated,
  Dimensions,
  Image
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PanoramicViewer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Animation values for pan and zoom
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotationX = useRef(new Animated.Value(0)).current;
  const rotationY = useRef(new Animated.Value(0)).current;

  // Pan responder for touch handling
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        // Convert touch movement to rotation
        const rotX = gestureState.dy * 0.01;
        const rotY = gestureState.dx * 0.01;
        
        // Limit vertical rotation
        const limitedRotX = Math.max(-1, Math.min(1, rotX));
        
        Animated.parallel([
          Animated.timing(rotationX, {
            toValue: limitedRotX,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(rotationY, {
            toValue: rotY,
            duration: 0,
            useNativeDriver: false,
          })
        ]).start();
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoading(false);
  };

  const handleImageError = (error) => {
    console.error('Error loading panoramic image:', error);
    setError('Failed to load panoramic image');
    setIsLoading(false);
  };

  // For demo purposes, using a placeholder since we can't access the local asset
  // In a real app, you would use: require('../../assets/panoramic/p1.jpg')
  const imageSource = { 
    uri: 'https://images.unsplash.com/photo-1557971370-e7298ee473fb?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  };

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorSubtext}>
            Please ensure the panoramic image exists and is accessible
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Panoramic Image Container */}
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              { scale: scale },
              { rotateY: rotationY.interpolate({
                inputRange: [-1, 1],
                outputRange: ['-180deg', '180deg'],
              }) },
              { rotateX: rotationX.interpolate({
                inputRange: [-1, 1],
                outputRange: ['30deg', '-30deg'],
              }) },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Image
          source={imageSource}
          style={styles.panoramicImage}
          onLoad={handleImageLoad}
          onError={handleImageError}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading panoramic view...</Text>
        </View>
      )}

      {/* Controls Panel */}
      {!isLoading && imageLoaded && (
        <>
          <View style={styles.controlsPanel}>
            <Text style={styles.title}>Panoramic Explorer</Text>
            <Text style={styles.instruction}>👆 Touch and drag to explore</Text>
            <Text style={styles.instruction}>🔄 Pan around the scene</Text>
            <Text style={styles.instruction}>📱 Optimized for mobile</Text>
          </View>

          {/* Status Panel */}
          <View style={styles.statusPanel}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>Interactive View Active</Text>
          </View>
        </>
      )}

      {/* Demo Notice */}
      <View style={styles.demoNotice}>
        <Text style={styles.demoText}>
          Demo: Using sample image. Replace with your panoramic image.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  panoramicImage: {
    width: screenWidth * 2, // Make image wider for panning effect
    height: screenHeight,
    alignSelf: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
  },
  controlsPanel: {
    position: 'absolute',
    top: 60,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 16,
    maxWidth: screenWidth - 32,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instruction: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  statusPanel: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#10B981',
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
  },
  demoNotice: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.8)',
    borderRadius: 8,
    padding: 12,
  },
  demoText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default PanoramicViewer;