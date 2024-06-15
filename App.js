import { StatusBar } from "expo-status-bar";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ResetPassword from "./screens/ResetPassword";
import ManageAccount from "./screens/ManageAccount";
import Stats from "./screens/Stats";
import ToDo from "./screens/ToDo";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Information from "./screens/Information";
import Helper from "./screens/Helper";
import Goal from "./screens/Goal";
import Guide from "./screens/Guide";
import Achievements from "./screens/Achievements";
import Why from "./screens/Why";
import Motivation from "./screens/Motivation";

const Stack = createNativeStackNavigator();

//<StatusBar style="auto" />
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageAccount"
          component={ManageAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ToDo"
          component={ToDo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stats"
          component={Stats}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Information"
          component={Information}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Helper"
          component={Helper}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Goal"
          component={Goal}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Guide"
          component={Guide}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Achievements"
          component={Achievements}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Why"
          component={Why}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Motivation"
          component={Motivation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
