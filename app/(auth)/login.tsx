import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthProvider";

export default function Index() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const makeVisible = () => {
    setKeyboardVisible(!keyboardVisible);
  };

  return (
    <View className="flex items-center justify-center h-full bg-black">
      <TouchableOpacity
        className="absolute top-8 left-8"
        onPress={() => router.navigate("/")}
      >
        <IonIcons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <View className="flex items-center gap-y-5 mb-5">
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-32 h-32"
        />
        <Text className="text-white font-inter-sb text-xl">
          Student Management System
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        className="flex w-full px-10 mt-5 gap-y-3"
      >
        <View>
          <Text className="text-white font-inter-sb text-lg">Username</Text>
          <TextInput
            autoCapitalize="none"
            maxLength={25}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
            className="border text-white border-white h-10 text-[16px] pl-2 rounded-md"
          />
        </View>
        <View className="mb-5">
          <Text className="text-white font-inter-sb text-lg">Password</Text>
          <View className="flex flex-row items-center border border-white rounded-md h-10">
            <TextInput
              secureTextEntry={!keyboardVisible}
              maxLength={25}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              className="flex-1 text-white text-[16px] pl-2"
            />
            <TouchableOpacity onPress={makeVisible}>
              {keyboardVisible ? (
                <Image
                  source={require("@/assets/images/icon.png")}
                  className="w-6 h-6 mr-2"
                />
              ) : (
                <Image
                  source={require("@/assets/images/icon-noeyes.png")}
                  className="w-6 h-6 mr-2"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          className="h-10 rounded-md w-2/3 border border-white items-center justify-center ml-auto mr-auto"
          onPress={() => signIn && signIn(username, password)}
        >
          <Text className="text-lg font-inter-b text-white">Login</Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-center gap-x-5 gap-y-2">
          <TouchableOpacity>
            <Text className="text-white font-inter-sb text-sm">
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>(router.navigate("/register"))}>
            <Text className="text-white font-inter-sb text-sm">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
