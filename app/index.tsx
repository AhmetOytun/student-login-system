import { useAuth } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { authState } = useAuth();

  useEffect(() => {
    if (authState?.authenticated) {
      if (authState.role === "Student") {
        router.navigate("/student");
      } else if (authState.role === "Teacher") {
        router.navigate("/teacher");
      } else if (authState.role === "Secretary") {
        router.navigate("/secretary");
      }
    }
  }, [authState]);

  return (
    <View className="flex items-center justify-center h-full bg-black">
      <View className="flex items-center gap-y-5 mb-5">
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-32 h-32"
        />
        <Text className="text-white font-inter-sb text-xl">
          Student Management System
        </Text>
      </View>
      <View className="flex flex-row items-center gap-x-5">
        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="h-10 rounded-md w-1/3 border border-white items-center justify-center ml-auto mr-auto"
        >
          <Text className="text-lg font-inter-b text-white">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/register")}
          className="h-10 rounded-md w-1/3 border border-white items-center justify-center ml-auto mr-auto"
        >
          <Text className="text-lg font-inter-b text-white">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
