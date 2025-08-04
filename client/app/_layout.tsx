// client/app/_layout.tsx
import { StyleSheet, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContext";
import { useFonts } from "expo-font";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(main)/profileModal"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};
const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    // replace SpaceMono with Candal
    Candal: require("../assets/fonts/Candal-Regular.ttf"),
    // if you still need SpaceMono elsewhere, uncomment:
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // don’t render anything until the font is ready
  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
