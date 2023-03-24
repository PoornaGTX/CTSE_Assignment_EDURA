import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

//icons
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./constants/styles";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import GradesScreen from "./screens/GradesScreen";
import ManageGradesScreen from "./screens/ManageGradesScreen";
import GradeSubjects from "./screens/GradeSubjects";

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

import { useAppContext } from "./context/appContext";
import { AppProvider } from "./context/appContext";

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
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
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
        name="ManageGrade"
        component={ManageGradesScreen}
        options={{ presentation: "modal", title: "Manage Grades" }}
      />
    </Stack.Navigator>
  );
};

function AuthenticatedStack() {
  // const user = "Admin";
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
