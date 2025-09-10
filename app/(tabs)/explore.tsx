import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import markers from '../../components/markers';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        // provider={PROVIDER_GOOGLE} // 👈 Uses Google Maps
        style={styles.map}
        initialRegion={markers[0].coordinates}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.name}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
