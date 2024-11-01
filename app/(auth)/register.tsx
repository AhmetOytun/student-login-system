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
import DropDownPicker from "react-native-dropdown-picker";

export default function Index() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [roleItems, setRoleItems] = useState([
    { label: "Student", value: "Student" },
    { label: "Teacher", value: "Teacher" },
    { label: "Secretary", value: "Secretary" },
  ]);

  const makeVisible = () => {
    setKeyboardVisible(!keyboardVisible);
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
          email,
        }),
      });

      const res = await response.json();

      if (res.status === 200) {
        console.log("Register successful");
        router.navigate("/login");
      } else if (res.status === 401) {
        alert("Invalid username or password");
      } else if (res.status === 500) {
        alert("An error occurred during login");
      } else {
        alert("An error occurred during login");
      }
    } catch (error) {
      console.error("Error", error);
      alert("An error occurred during login");
    }
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
          <View className="mt-3">
            <Text className="text-white font-inter-sb text-lg">Email</Text>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={40}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              className="border text-white border-white h-10 text-[16px] pl-2 rounded-md"
            />
          </View>
          <View className="mt-3">
          <Text className="text-white font-inter-sb text-lg">Role</Text>
            <DropDownPicker
            style={{
              borderRadius: 10,
              borderColor: `white`,
              backgroundColor: `black`,
            }}
            textStyle={{
              color: `white`,
            }}
            arrowIconStyle={{
              tintColor: `white`,
            }}
            dropDownContainerStyle={{
              borderColor: `white`,
              backgroundColor: `black`,
            }}
              placeholder="Select a role"
              value={role}
              items={roleItems}
              setItems={setRoleItems}
              setValue={setRole}
              setOpen={setIsOpen}
              open={isOpen}
            />
          </View>
        </View>
        <TouchableOpacity
          className="h-10 rounded-md w-2/3 border border-white items-center justify-center ml-auto mr-auto"
          onPress={handleRegister}
        >
          <Text className="text-lg font-inter-b text-white">Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
