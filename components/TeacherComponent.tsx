import { View, Text, TouchableOpacity, Image } from "react-native";

const TeacherComponent = ({teacherName,teacherSubject}:TeacherComponentProps) => {
  return (
    <View className="className='flex flex-row items-center justify-between border border-white p-3 rounded-md mb-2">
        <Text className='text-white font-inter-m'>{teacherName}</Text>
        <Text className='text-white font-inter-m'>{teacherSubject}</Text>
    </View>
  );
};

export default TeacherComponent;
