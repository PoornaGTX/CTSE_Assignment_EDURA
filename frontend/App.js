import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

//icons
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./constants/styles";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createNativeStackNavigator();
// const Bottom = createBottomTabNavigator();

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
