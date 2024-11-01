import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

const announcement = () => {
  const { addAnnouncement } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleAddAnnouncement = () => {
    addAnnouncement!(title, content);
    setContent("");
    setTitle("");
    }
  return (
    <SafeAreaView className="flex item justify-center items-center h-full w-full bg-black px-5">
      <TouchableOpacity
        className="absolute top-8 left-8"
        onPress={() => router.navigate("/secretary")}
      >
        <IonIcons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Text className="text-white font-inter-b mb-5">
        Add a new announcement
      </Text>
      <View className="flex items-start w-[60%]">
        <Text className="text-white font-inter-m pb-1">Title</Text>
        <TextInput
          maxLength={50}
            value={title}
            onChangeText={setTitle}
          className="w-full h-10 border border-white text-white bg-black rounded-lg p-2 mb-2"
        />
        <Text className="text-white font-inter-m pb-1">Content</Text>
        <TextInput
          value={content}
          onChangeText={setContent}
          maxLength={50}
          className="w-full h-10 border border-white text-white bg-black rounded-lg p-2 mb-2"
        />
        <TouchableOpacity
          className="w-full h-10 rounded-lg border border-white items-center justify-center mt-5"
          onPress={handleAddAnnouncement}
        >
          <Text className="text-white font-inter-sb">Add Announcement</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default announcement;
