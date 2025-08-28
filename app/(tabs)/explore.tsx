import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";

const Page = () => {
  const glRef = useRef();

  const onContextCreate = async (gl) => {
    glRef.current = gl;

    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Create three.js renderer
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    // Create a scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 0.1;

    // Load panoramic texture
    const texture = await new THREE.TextureLoader().loadAsync(
      require("../../assets/panoramic/p1.jpg")
    );

    // Create a sphere & map the texture inside
    const geometry = new THREE.SphereGeometry(5, 60, 40);
    geometry.scale(-1, 1, 1); // Invert the sphere

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Track rotation
    let rotation = 0;

    const render = () => {
      requestAnimationFrame(render);
      rotation += 0.001; // Auto-rotate
      sphere.rotation.y = rotation;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    render();
  };

  return (
    <View style={styles.container}>
      <GLView
        style={styles.viewer}
        onContextCreate={onContextCreate}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  viewer: {
    width: "100%",
    height: "100%",
  },
});
