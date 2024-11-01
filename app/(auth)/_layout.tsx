import { Stack } from "expo-router";
import { View } from "react-native";
import grades from "./grades";

export default function RootLayout() {

  return (
    <View className="bg-black w-full h-full">
    <Stack initialRouteName="editgrades" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="student" />
      <Stack.Screen name="teacher" />
      <Stack.Screen name="secretary" />
      <Stack.Screen name="announcement" />
      <Stack.Screen name="grades" />
      <Stack.Screen name="editgrades" />
    </Stack>
    </View>
  );
}
