import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Splash Screen */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          animation: "none", // ✅ Splash shows instantly
        }}
      />

      {/* Events Screen */}
      <Stack.Screen
        name="events"
        options={{
          headerShown: false,
          animation: "none", // ✅ Events shows instantly
        }}
      />

      {/* Packages Screen */}
      <Stack.Screen
        name="packages"
        options={{
          headerShown: false,
          animation: "none", // ✅ Packages shows instantly
        }}
      />

      {/* Home Tabs Layout */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          animation: "fade", // ✅ Smooth fade-in transition
        }}
      />

      {/* Destination Screen */}
      <Stack.Screen
        name="destination"
        options={{
          headerShown: false,
          presentation: "modal", // ✅ Opens like a modal
          animation: "slide_from_bottom", // ✅ Smooth bottom-to-top animation
        }}
      />

      {/* 360 Screen */}
      <Stack.Screen
        name="pano"
        options={{
          headerShown: false,
          presentation: "modal", // ✅ Opens like a modal
          animation: "slide_from_bottom", // ✅ Smooth bottom-to-top animation
        }}
      />
    </Stack>
  );
}
