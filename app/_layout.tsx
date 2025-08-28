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

      {/* Home Tabs Layout */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          animation: "fade", // ✅ Smooth fade-in transition
        }}
      />
    </Stack>
  );
}
