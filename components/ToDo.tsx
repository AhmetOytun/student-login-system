import { View, Text, TouchableOpacity, Image } from "react-native";

const ToDo = ({isChecked,ToDoTitle,handleCheck,id,handleDelete}:ToDoComponentProps) => {
  return (
    <View className="flex-row w-full justify-between items-center px-2 border border-white rounded-md h-12 mb-5">
      <TouchableOpacity className="w-8 h-8 border border-white rounded-md items-center justify-center" onPress={handleDelete}>
        <Text className="text-white">x</Text>
      </TouchableOpacity>
      <Text className="text-white">{ToDoTitle}</Text>
      <TouchableOpacity className="w-8 h-8 border border-white rounded-md items-center justify-center" onPress={handleCheck}>
        <Image source={require("@/assets/images/check.png")} className={`w-4 h-4 ${isChecked ? "visible" : "hidden"}`} />
      </TouchableOpacity>
    </View>
  );
};

export default ToDo;
