interface ToDoProps {
    _id: number;
    title: string;
    completed: boolean;
}

interface ToDoComponentProps{
    isChecked: boolean;
    ToDoTitle: string;
    id: number;
    handleCheck: () => void;
    handleDelete: () => void;
}

interface StudentProps {
    _id: number;
    username: string;
    gpa: number;
}

interface StudentComponentProps {
    studentName: string;
    studentGPA: number;
}

interface TeacherProps {
    _id: number;
    username: string;
    subject: string;
}

interface TeacherComponentProps {
    teacherName: string;
    teacherSubject: string;
}

interface AuthProps {
    authState?: {
        token: string | null;
        authenticated: boolean | null;
        role?: string | null;
      };
    signIn?: (username: string, password: string) => void;
    signOut?: () => void;
    addAnnouncement?: (title: string, content: string) => void;
    getAnnouncements?: () => Promise<AnnouncementProps[]>;
    getStudents?: () => Promise<StudentProps[]>;
    getTeachers?: () => Promise<TeacherProps[]>;
    getUserInfo?: () => Promise<UserInfoProps>;
    addToDo?: (title: string, username:string) => Promise<void>;
    getToDos?: () => Promise<ToDoProps[]>;
    checkToDo?: (id: number) => Promise<void>;
    deleteToDo?: (id: number) => Promise<void>;
}

interface AnnouncementProps {
    _id: string;
    title: string;
    content: string;
}

interface UserInfoProps {
    user: {
        username: string;
        role: string;
        gpa?: number;
        grades?: {
            course: string;
            grade: number;
        }[];
        toDos?: ToDoProps[];
    };
}