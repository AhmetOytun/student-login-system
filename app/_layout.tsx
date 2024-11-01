import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Platform, View } from "react-native";
import { AuthProvider } from "@/context/AuthProvider";
/* prevent the splash screen from auto-hiding before the app is ready */
SplashScreen.preventAutoHideAsync();
/* set the navigation bar style for */
if (Platform.OS === "android") {
  /* this makes the navigation bar position fixed */
  NavigationBar.setPositionAsync("absolute");
  /* this makes the navigation bar transparent */
  NavigationBar.setBackgroundColorAsync("#ffffff01");
}

export default function RootLayout() {
  /* loading fonts */
  const [loaded, error] = useFonts({
    "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("@/assets/fonts/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  /* show nothing until the fonts are loaded or when we get an error */
  if (!loaded && !error) {
    /* return a black bg when loading */
    return <View className="bg-black w-full h-full">
    </View>;
  }

  return (
    <View className="flex-1 bg-black">
    <AuthProvider>
    <Stack screenOptions={{headerShown: false, animation:"fade"}}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="index" />
    </Stack>
    </AuthProvider>
    </View>
  );
}
