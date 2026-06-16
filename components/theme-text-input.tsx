import { Colors } from "@/constants/theme";
import React, { useState } from "react";
import { TextInput, useColorScheme } from "react-native";

const ThemeTextInput = ({
  style,
  ...props
}: React.ComponentProps<typeof TextInput>) => {
  const colorScheme = useColorScheme() || "light";
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[
        {
          backgroundColor: Colors[colorScheme].uiTextInputBackColor,
          borderColor: isFocused
            ? Colors[colorScheme].button // 🔥 couleur quand le champ est focus
            : Colors[colorScheme].uiTextInputBorder, // couleur normale
          color: Colors[colorScheme].text,
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          fontSize: 14,
        },
        style,
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholderTextColor={Colors[colorScheme].icon}
      {...props}
    />
  );
};

export default ThemeTextInput;
