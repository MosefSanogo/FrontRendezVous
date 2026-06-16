import { Colors } from "@/constants/theme";
import AppointmentsScreen from "@/screens/AppointmentsScreen";
import BookingScreen from "@/screens/BookingScreen";
import HomeScreen from "@/screens/home/HomeScreen";
import SettingScreen from "@/screens/SettingScreen";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.background,
        tabBarStyle: {
          backgroundColor: colors.white,
          elevation: 1,
          height: insets.bottom ? 60 + insets.bottom : 80,
          paddingTop: 20,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarHideOnKeyboard: true,
      }}
      id="MainTabs"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? colors.button : colors.text}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mes RDV"
        component={AppointmentsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Mes RDV",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "bag" : "bag-outline"}
              size={24}
              color={focused ? colors.button : colors.text}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favoris"
        component={BookingScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Mes favoris",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "heart-sharp" : "heart-outline"}
              size={24}
              color={focused ? colors.button : colors.text}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Profil",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? colors.button : colors.text}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});
