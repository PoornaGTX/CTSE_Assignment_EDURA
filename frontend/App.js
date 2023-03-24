import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

//icons
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./constants/styles";

import IconButton from "./components/icons/IconButton";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import MySubjects from "./screens/MySubjects";
import GradesScreen from "./screens/GradesScreen";
import GradeSubjects from "./screens/GradeSubjects";
import ManageSubjectScreen from "./screens/ManageSubjectScreen";
import ManageGradesScreen from "./screens/ManageGradesScreen";
import StatsScreenAdmin from "./screens/StatsScreenAdmin";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

import { useAppContext } from "./context/appContext";
import { AppProvider } from "./context/appContext";

import StudentTimeTableScreen from "./screens/StudentTimeTableScreen";
import AllTeachersScreen from "./screens/AllTeachersScreen";
import SelectedTeacherScreen from "./screens/SelectedTeacherScreen";
import StudentNoticesScreen from "./screens/StudentNoticesScreen";

// export const user = { type: "Student", grade: "Grade 5", subscribeIds: ["2"] };

import TeacherAllNotices from "./screens/TeacherAllNotices";
import TeacherAddNotice from "./screens/TeacherAddNotice";
import ChatRoom from "./screens/ChatRoom";

//for unathunticated users
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryHeader },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primaryBackgroud },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

//use by admin
const AdminBottomTabHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0D25A7" },
        headerTitleAlign: "center",
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primaryBackgroud },
      }}
    >
      <Stack.Screen
        name="All Grades"
        component={GradesScreen}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Subjects"
        component={GradeSubjects}
        options={{
          contentStyle: { backgroundColor: "#8208E2" },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ManageSubjects"
        component={ManageSubjectScreen}
        options={{
          presentation: "modal",
          title: "Manage Subject",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ManageGrade"
        component={ManageGradesScreen}
        options={{ presentation: "modal", title: "Manage Grades" }}
      />
    </Stack.Navigator>
  );
};

//use by Teacher
const TeacherBottomTabHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#3db1ff" },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="All Notices"
        component={TeacherAllNotices}
        options={{
          contentStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddNotice"
        component={TeacherAddNotice}
        options={{
          presentation: "modal",
          title: "Add Notice",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

//use by student
const StudentBottomTabHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0D25A7" },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="My Subjects"
        component={MySubjects}
        options={{
          contentStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="AllTeachersScreen"
        component={AllTeachersScreen}
        options={{
          presentation: "modal",
          title: "All Teachers",
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="SelectedTeacher"
        component={SelectedTeacherScreen}
        options={{
          presentation: "modal",
          title: "Teacher",
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      />
      <Bottom.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox" size={size} color="white" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

function AuthenticatedStack() {
  // const user = "Admin"; //temp
  const { user, logOutUser } = useAppContext();

  return (
    <Bottom.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0D25A7" },
        tabBarStyle: { backgroundColor: "#0D25A7" },
        tabBarActiveTintColor: "red",
      }}
    >
      {user.type === "Admin" && (
        <Bottom.Screen
          name="AdminHome"
          component={AdminBottomTabHome}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color="white" />
            ),
          }}
        />
      )}

      {user.type === "Admin" && (
        <Bottom.Screen
          name="Stats"
          component={StatsScreenAdmin}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart" size={size} color="white" />
            ),
            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
      )}
      {user.type === "teacher" && (
        <>
          <Bottom.Screen
            name="TeacherAllNotice"
            component={TeacherBottomTabHome}
            options={{
              headerShown: false,

              tabBarShowLabel: false,

              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color="white" />
              ),
            }}
          />

          <Bottom.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={{
              headerShown: false,

              tabBarShowLabel: false,

              tabBarIcon: ({ color, size }) => (
                <Ionicons name="chatbox" size={size} color="white" />
              ),
            }}
          />
        </>
      )}
      {user.type === "student" && (
        <>
          <Bottom.Screen
            name="StudentHome"
            component={StudentBottomTabHome}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color="white" />
              ),
            }}
          />
          <Bottom.Screen
            name="Timetable"
            component={StudentTimeTableScreen}
            options={{
              headerShown: true,
              tabBarShowLabel: false,
              headerTitleAlign: "center",
              headerTintColor: "white",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar" size={size} color="white" />
              ),
            }}
          />
          <Bottom.Screen
            name="My Notices"
            component={StudentNoticesScreen}
            options={{
              headerShown: true,
              tabBarShowLabel: false,
              headerTitleAlign: "center",
              headerTintColor: "white",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="notifications" size={size} color="white" />
              ),
            }}
          />
        </>
      )}
      <Bottom.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color="white" />
          ),
          headerTitleAlign: "center",
          headerRight: () => {
            return (
              <IconButton
                icon="exit"
                color="white"
                size={24}
                onPressProp={() => logOutUser()}
              />
            );
          },
          headerTintColor: "white",
          tabBarHideOnKeyboard: true,
        }}
      />
    </Bottom.Navigator>
  );
}

function Navigation() {
  const { isLogedIn } = useAppContext();
  return (
    <NavigationContainer>
      {isLogedIn && <AuthenticatedStack />}
      {!isLogedIn && <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AppProvider>
        <Navigation />
      </AppProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
