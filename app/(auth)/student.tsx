import ToDo from "@/components/ToDo";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthProvider";
import { router } from "expo-router";

const student = () => {
  const [studentUsername, setStudentUsername] = useState("");
  const [studentGPA, setStudentGPA] = useState(3.5);
  const [toDos, setToDos] = useState<ToDoProps[]>([]);
  const [toDoTitle, setToDoTitle] = useState("");
  const { signOut, getUserInfo, addToDo, getToDos, checkToDo, deleteToDo } =
    useAuth();

  const handleFetchInfo = async () => {
    const user = await getUserInfo!();
    const todos = await getToDos!();

    setStudentUsername(user.user.username);
    setToDos(todos);
  };

  useEffect(() => {
    handleFetchInfo();
  }, [addToDo, checkToDo]);

  return (
    <SafeAreaView className="flex item justify-start h-full w-full bg-black px-3">
      <TouchableOpacity onPress={signOut}>
        <Text className="text-white text-lg font-inter-b underline">
          Logout
        </Text>
      </TouchableOpacity>
      <Text className='text-white text-lg font-inter-b mt-3'>Latest Announcement:</Text>
                            <View className='gap-y-1'>
                                <Text className='text-gray-200 text-lg font-inter-sb'>Announcement Bomba</Text>
                                <Text className='text-gray-300 text-sm font-inter-sb'>Bomba annocunement</Text>
                            </View>
      <View>
        <Text className="text-white text-lg font-inter-b pb-1">
          Welcome Back, {studentUsername}!
        </Text>
        <Text className="text-white text-sm font-inter-sb">
          Your GPA: {studentGPA}
        </Text>
        <TouchableOpacity className="text-white text-sm font-inter-m py-1" onPress={()=>router.navigate("/grades")}>
          <Text className="text-gray-300 text-sm font-inter-sb underline">
            Show My Grades
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-white text-lg font-inter-b pt-5 pb-3">
        My ToDos:
      </Text>
      {toDos?.map((todo: ToDoProps) => (
        <ToDo
          key={todo._id}
          id={todo._id}
          ToDoTitle={todo.title}
          isChecked={todo.completed}
          handleCheck={async () => {
            await checkToDo?.(todo._id); // Call the backend function
            setToDos((prevToDos) =>
              prevToDos.map((t) =>
                t._id === todo._id ? { ...t, completed: !t.completed } : t
              )
            );
          }}
          handleDelete={async () => {
            await deleteToDo?.(todo._id); // Call the backend function
            setToDos((prevToDos) =>
              prevToDos.filter((t) => t._id !== todo._id)
            );
          }}
        />
      ))}

      <View className="w-full items-center justify-center">
        <Text className="text-white text-lg font-inter-b">Add a new ToDo</Text>
        <TextInput
          className="w-[60%] h-10 border border-white text-white bg-black rounded-lg p-2 mb-2"
          value={toDoTitle}
          onChangeText={setToDoTitle}
          placeholder="Enter a new ToDo"
        />
        <TouchableOpacity
          className="w-[60%] h-10 rounded-lg border border-white items-center justify-center mt-5"
          onPress={async () => {
            if (addToDo) {
              const newTodo = await addToDo(toDoTitle, studentUsername);
              if (newTodo !== undefined) {
                setToDos((prevToDos) => [...prevToDos, newTodo]);
              }
            }
          }}
        >
          <Text className="text-white font-inter-sb">Add ToDo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default student;
