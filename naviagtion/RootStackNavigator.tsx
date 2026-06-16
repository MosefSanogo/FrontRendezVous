import CodeScreen from "@/screens/home/CodeScreen";
import ConfirmScreen from "@/screens/home/ConfirmScreen";
import DetailScreen from "@/screens/home/DetailScreen";
import SearchScreen from "@/screens/home/SearchScreen";
import SuccessScreen from "@/screens/home/SuccessScreen";
import LangueScreen from "@/screens/settings/LangueScreen";
import NotificationScreen from "@/screens/settings/NotificationScreen";
import ProfilScreen from "@/screens/settings/ProfilScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Confirme"
        component={ConfirmScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Succes"
        component={SuccessScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Code"
        component={CodeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Compte"
        component={ProfilScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Langue"
        component={LangueScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
