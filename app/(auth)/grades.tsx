import StudentComponent from "@/components/StudentComponent";
import { TouchableOpacity } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { View, Text } from "react-native";

const grades = () => {
  return (
    <View className="flex item justify-center items-center h-full w-full bg-black px-5">
              <TouchableOpacity
        className="absolute top-8 left-8"
        onPress={() => router.navigate("/")}
      >
        <IonIcons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
        <View className="w-full space-y-2">
            <Text className="text-white text-lg font-inter-b pb-1">
                Grades
            </Text>
        <StudentComponent studentName="System Programming" studentGPA={"AA-95.5"} />
        <StudentComponent studentName="Data Structures" studentGPA={"BA-81.5"} />
        <StudentComponent studentName="Algorithms" studentGPA={"BB-74.5"} />
        <StudentComponent studentName="Databases" studentGPA={"AB-85.5"} />
        <StudentComponent studentName="Operating Systems" studentGPA={"AA-99.5"} />
        </View>
    </View>
  );
};

export default grades;
