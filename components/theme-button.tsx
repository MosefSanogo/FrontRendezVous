import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const ThemeButton = ({
  name,
  onPress,
  style,
  textStyle,
  iconName = "add-outline",
  iconSize = 24,
  loader = false,
  iconColor,
}: {
  name?: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  iconName?: any;
  iconSize?: number;
  loader?: boolean;
  iconColor?: string;
}) => {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];
  const scale = new Animated.Value(1);
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={!loader ? onPress : undefined}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: theme.button,
            borderColor: theme.borderColor,
          },
          pressed && !loader ? styles.pressed : null,
          style,
        ]}
      >
        <View style={styles.content}>
          {loader && (
            <ActivityIndicator
              size="small"
              color={iconColor || theme.white}
              style={{ marginRight: 8 }}
            />
          )}
          {!loader && (
            <Ionicons
              name={iconName}
              size={iconSize}
              color={iconColor || theme.white}
            />
          )}
          {name && (
            <Text style={[styles.text, { color: theme.white }, textStyle]}>
              {name}
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default ThemeButton;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginLeft: 15,
  },
});
