import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import StudentComponent from '@/components/StudentComponent';
import TeacherComponent from '@/components/TeacherComponent';
import { useAuth } from '@/context/AuthProvider';
import { router } from 'expo-router';

const secretary = () => {
    const { signOut, getAnnouncements, getStudents, getTeachers, getUserInfo } = useAuth();
    const [secretaryUsername, setSecretaryUsername] = useState("");
    const [announcements, setAnnouncements] = useState<AnnouncementProps[]>([]);
    const [students, setStudents] = useState<StudentProps[]>([]);
    const [teachers, setTeachers] = useState<TeacherProps[]>([]);

    const fetchInfo = async () => {
      const announcements = await getAnnouncements!();
      const students = await getStudents!();
      const teachers = await getTeachers!();
      const user = await getUserInfo!();
      setAnnouncements(announcements);
      setStudents(students);
      setTeachers(teachers);
      setSecretaryUsername(user.user.username);
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const latestAnnouncement = announcements[announcements.length - 1];

    return (
        <SafeAreaView className='flex item justify-start h-full w-full bg-black px-5'>
            <TouchableOpacity onPress={signOut}>
                <Text className='text-white text-lg font-inter-b underline'>Logout</Text>
            </TouchableOpacity>
            <View>
                <Text className='text-white text-lg font-inter-b pb-1'>Welcome Back, {secretaryUsername}!</Text>
                
                {latestAnnouncement ? (
                    <>
                        <Text className='text-white text-lg font-inter-b mt-3'>Latest Announcement:</Text>
                            <View className='gap-y-1'>
                                <Text className='text-gray-200 text-lg font-inter-sb'>{latestAnnouncement.title}</Text>
                                <Text className='text-gray-300 text-sm font-inter-sb'>{latestAnnouncement.content}</Text>
                            </View>
                            <TouchableOpacity onPress={() => router.navigate("/announcement")}>
                                <Text className='text-gray-300 text-sm font-inter-sb underline mt-5'>
                                    Add a new announcement
                                </Text>
                            </TouchableOpacity>
                    </>
                ) : (
                    <Text className='text-gray-300 text-sm font-inter-m mt-3'>No announcements available</Text>
                )}
            </View>
            
            <Text className='text-white text-lg font-inter-b pt-5 pb-3'>Students:</Text>
            {students?.map((student: StudentProps) => (
                <StudentComponent key={student._id} studentName={student.username} studentGPA={student.gpa} />
            ))}
            
            <Text className='text-white text-lg font-inter-b pt-5 pb-3'>Teachers:</Text>
            {teachers?.map((teacher: TeacherProps) => (
                <TeacherComponent key={teacher._id} teacherName={teacher.username} teacherSubject={teacher.subject} />
            ))}
        </SafeAreaView>
    );
}

export default secretary;
