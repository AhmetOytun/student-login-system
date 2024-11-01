import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import StudentComponent from '@/components/StudentComponent';
import { useAuth } from '@/context/AuthProvider';
import { router } from 'expo-router';

const teacher = () => {
    const { signOut } = useAuth();
    const [teacherUsername, setTeacherUsername] = useState("sinan");
    const [students, setStudents] = useState<StudentProps[]>([
        {id: 1, name: "Oytun", gpa: 3.5},
        {id: 2, name: "Eren", gpa: 2.72},
        {id: 3, name: "Ali", gpa: 3.00},
    ]);

  return (
    <SafeAreaView className='flex item justify-start h-full w-full bg-black px-5'>
            <TouchableOpacity onPress={signOut}>
      <Text className='text-white text-lg font-inter-b underline'>Logout</Text>
      </TouchableOpacity>
      <Text className='text-white text-lg font-inter-b mt-3'>Latest Announcement:</Text>
                            <View className='gap-y-1'>
                                <Text className='text-gray-200 text-lg font-inter-sb'>Announcement Bomba</Text>
                                <Text className='text-gray-300 text-sm font-inter-sb'>Bomba annocunement</Text>
                            </View>
        <View>
        <Text className='text-white text-lg font-inter-b pb-1'>Welcome Back, {teacherUsername}!</Text>
      <TouchableOpacity className='text-white text-sm font-inter-m py-1' onPress={()=>router.navigate("/editgrades")}>
      <Text className='text-gray-300 text-sm font-inter-sb underline'>Edit Student Grades</Text>
      </TouchableOpacity>
        </View>
      <Text className='text-white text-lg font-inter-b pt-5 pb-3'>My Students:</Text>
        {students.map((student: StudentProps) => (
            <StudentComponent key={student.id} studentName={student.name} studentGPA={student.gpa}/>
        ))}
    </SafeAreaView>
  )
}

export default teacher