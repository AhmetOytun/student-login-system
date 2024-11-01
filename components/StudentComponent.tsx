import { View, Text, TouchableOpacity, Image } from "react-native";

const StudentComponent = ({studentName,studentGPA}:StudentComponentProps) => {
  return (
    <View className="className='flex flex-row items-center justify-between border border-white p-3 rounded-md mb-2">
        <Text className='text-white font-inter-m'>{studentName}</Text>
        <Text className='text-white font-inter-m'>{studentGPA}</Text>
    </View>
  );
};

export default StudentComponent;
