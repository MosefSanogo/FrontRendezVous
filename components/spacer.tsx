import React from "react";
import { ViewStyle } from "react-native";
import { ThemedView } from "./themed-view";

function Spacer({
  width = "100%",
  height = 40,
  backgroundColor = "#ddd",
}: {
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
}) {
  return (
    <ThemedView
      style={{ width, height, backgroundColor: backgroundColor } as ViewStyle}
    />
  );
}

export default Spacer;
