import { TextInput, TouchableOpacity } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import student from "./student";

const grades = () => {
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [courses, setCourses] = useState([
        { label: "System Programming", value: "AA-95.5" },
        { label: "Data Structures", value: "BA-81.5" },
        { label: "Algorithms", value: "BB-74.5" },
        { label: "Databases", value: "AB-85.5" },
        { label: "Operating Systems", value: "AA-99.5" },
    ]);
    const [isOpenCourse, setIsOpenCourse] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [students, setStudents] = useState([
        { label: "Oytun", value: "3.5" },
        { label: "Eren", value: "2.72" },
        { label: "Ali", value: "3.00" },
    ]);
  return (
    <View className="flex item justify-center items-center h-full w-full bg-black px-5">
              <TouchableOpacity
        className="absolute top-8 left-8"
        onPress={() => router.navigate("/")}
      >
        <IonIcons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Text className="text-white text-lg font-inter-b pb-1">
        You are teaching the following courses:
        </Text>
        <DropDownPicker
            style={{
              borderRadius: 10,
              borderColor: `white`,
              backgroundColor: `black`,
              marginBottom: 10,
              marginTop: 30,
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
              placeholder="Select a course"
              value={selectedCourse}
              items={courses}
              setItems={setCourses}
              setValue={setSelectedCourse}
              setOpen={setIsOpenCourse}
              open={isOpenCourse}
            />
      <DropDownPicker
            style={{
              borderRadius: 10,
              borderColor: `white`,
              backgroundColor: `black`,
              marginBottom: 10,
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
              placeholder="Select a student"
              value={selectedStudent}
              items={students}
              setItems={setStudents}
              setValue={setSelectedStudent}
              setOpen={setIsOpen}
              open={isOpen}
            />
            <Text className="text-white text-lg font-inter-b pb-1">
        Enter the grade for the selected student:
        </Text>
            <TextInput
              className="border text-white border-white h-10 text-[16px] pl-2 rounded-md"
              placeholder="Enter the grade"

            />
            <TouchableOpacity
                className="w-[60%] h-10 rounded-lg border border-white items-center justify-center mt-5"
                onPress={async () => {
                    alert("Grade has been updated!");
                }}
            >
                <Text className="text-white font-inter-sb">Update Grade</Text>
            </TouchableOpacity>
    </View>

  );
};

export default grades;
