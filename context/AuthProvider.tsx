import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    role?: string | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      if (token) {
        SecureStore.getItemAsync("role").then((role) => {
            setAuthState({ token, authenticated: true, role });
        }
        );
      } else {
        setAuthState({ token: null, authenticated: false, role: null });
      }
    });
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await fetch("http://10.0.2.2:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const res = await response.json();

      if (res.status === 200) {
        console.log("Login successful");
        await SecureStore.setItemAsync("token", res.token);
        await SecureStore.setItemAsync("role", res.role);
        setAuthState({ token: res.token, authenticated: true, role: res.role });
        if (res.role === "Student") {
          router.navigate("/student");
        } else if (res.role === "Teacher") {
          router.navigate("/teacher");
        } else if (res.role === "Secretary") {
          router.navigate("/secretary");
        } else {
          alert("An error occurred during login");
        }
      } else if (res.status === 401) {
        alert("Invalid username or password");
      } else if (res.status === 500) {
        alert("An error occurred during login");
      } else {
        alert("An error occurred during login");
      }
    } catch (error) {
      console.error("Error", error);
      alert("An error occurred during login");
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("role");
    setAuthState({ token: null, authenticated: false, role: null });
    router.navigate("/");
  };

  const addAnnouncement = async (title: string, content: string) => {
    try {
      const response = await fetch("http://10.0.2.2:3000/announcements/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `${authState.token}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      }).then((res) => res.json());
        if (response.status === 200) {
          alert("Announcement created successfully");
        } else if (response.status === 401) {
          alert("Unauthorized");
        } else if (response.status === 500) {
          alert("An error occurred during announcement creation");
        } else {
          alert("An error occurred during announcement creation");
        }
    }
    catch (error) {
      console.error("Error", error);
      alert("An error occurred during announcement creation");
    }
    }

    const getAnnouncements = async () => {
        try {
            const response = await fetch("http://10.0.2.2:3000/announcements/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": `${authState.token}`,
                },
            }).then((res) => res.json());
            if (response.status === 200) {
                return response.announcements;
            } else if (response.status === 401) {
                alert("Unauthorized");
            } else if (response.status === 500) {
                alert("An error occurred during announcement retrieval");
            } else {
                alert("An error occurred during announcement retrieval");
            }
        } catch (error) {
            console.error("Error", error);
            alert("An error occurred during announcement retrieval");
        }
    }

    const getStudents = async () => {
        try {
            const response = await fetch("http://10.0.2.2:3000/students/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": `${authState.token}`,
                },
            }).then((res) => res.json());
            if (response.status === 200) {
                return response.users;
            } else if (response.status === 401) {
                alert("Unauthorized");
            } else if (response.status === 500) {
                alert("An error occurred during student retrieval");
            } else {
                alert("An error occurred during student retrieval");
            }
        } catch (error) {
            console.error("Error", error);
            alert("An error occurred during student retrieval");
        }
    }

    const getTeachers = async () => {
        try {
            const response = await fetch("http://10.0.2.2:3000/teachers/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": `${authState.token}`,
                },
            }).then((res) => res.json());
            if (response.status === 200) {
                return response.users;
            } else if (response.status === 401) {
                alert("Unauthorized");
            } else if (response.status === 500) {
                alert("An error occurred during student retrieval");
            } else {
                alert("An error occurred during student retrieval");
            }
        } catch (error) {
            console.error("Error", error);
            alert("An error occurred during student retrieval");
        }
    }

    const getUserInfo = async () => {
        const user = await fetch("http://10.0.2.2:3000/user/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": `${authState.token}`,
            },
        }).then((res) => res.json());
        if (user.status === 200) {
            return user;
        } else if (user.status === 401) {
            alert("Unauthorized");
        } else if (user.status === 500) {
            alert("An error occurred during user retrieval");
        } else {
            alert("An error occurred during user retrieval");
        }

    }  

    const getToDos = async () => {
        try {
            const response = await fetch("http://10.0.2.2:3000/todos/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": `${authState.token}`,
                },
            }).then((res) => res.json());
            if (response.status === 200) {
                return response.todos;
            } else if (response.status === 401) {
                alert("Unauthorized");
            } else if (response.status === 500) {
                alert("An error occurred during todos retrieval");
            } else {
                alert("An error occurred during todos retrieval");
            }
        } catch (error) {
            console.error("Error", error);
            alert("An error occurred during todos retrieval");
        }
    }

    const addToDo = async (title: string, user: string) => {
        try {
            const response = await fetch("http://10.0.2.2:3000/todos/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": `${authState.token}`,
                },
                body: JSON.stringify({
                    title,
                    user
                }),
            }).then((res) => res.json());
            if (response.status === 200) {
                alert("ToDo created successfully");
                return response.todo;
            } else if (response.status === 401) {
                alert("Unauthorized");
            } else if (response.status === 500) {
                alert("An error occurred during ToDo creation");
            } else {
                alert("An error occurred during ToDo creation");
            }
        } catch (error) {
            console.error("Error", error);
            alert("An error occurred during ToDo creation");
        }
    }

    const checkToDo = async (id: number) => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/todos/check`, {
                method: "PUT",
                body: JSON.stringify({
                    id
                }),
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": `${authState.token}`,
                },
            }).then((res) => res.json());
            if (response.status === 200) {
                alert("ToDo checked successfully");
            } else if (response.status === 401) {
                alert("Unauthorized");
            } else if (response.status === 500) {
                alert("An error occurred during ToDo check");
            } else {
                alert("An error occurred during ToDo check");
            }
        } catch (error) {
            console.error("Error", error);
            alert("An error occurred during ToDo check");
        }
    }

    const deleteToDo = async (id: number) => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/todos/delete`, {
                method: "DELETE",
                body: JSON.stringify({
                    id
                }),
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": `${authState.token}`,
                },
            }).then((res) => res.json());
            if (response.status === 200) {
                alert("ToDo checked successfully");
            } else if (response.status === 401) {
                alert("Unauthorized");
            } else if (response.status === 500) {
                alert("An error occurred during ToDo check");
            } else {
                alert("An error occurred during ToDo check");
            }
        } catch (error) {
            console.error("Error", error);
            alert("An error occurred during ToDo check");
        }
    }

  const value = {
    authState,
    signIn,
    signOut,
    addAnnouncement,
    getAnnouncements,
    getStudents,
    getTeachers,
    getUserInfo,
    getToDos,
    addToDo,
    checkToDo,
    deleteToDo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
