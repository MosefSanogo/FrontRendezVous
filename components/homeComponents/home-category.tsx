import { HomeCategoryData } from "@/types/home";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface HomeCategoryProps {
  data: HomeCategoryData;
  selectedId: string | number;
  onclick: (id: string, name: string) => void;
}

const HomeCategory = ({ data, selectedId, onclick }: HomeCategoryProps) => {
  const isSelected = String(data.id) === String(selectedId);

  return (
    <TouchableOpacity // ✅ meilleur que onTouchStart
      onPress={() => onclick(data.id.toString(), data.name)}
      style={[styles.container, isSelected && styles.selected]}
    >
      <Ionicons
        name={data.icon as IoniconsName} // ✅ typage correct
        size={15}
        color={isSelected ? "#ffffff" : "#000000"}
      />
      <Text style={[styles.label, isSelected && styles.labelSelected]}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

export default HomeCategory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    gap: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selected: {
    backgroundColor: "#000000",
  },
  label: {
    color: "#000000",
    fontSize: 12,
  },
  labelSelected: {
    color: "#ffffff",
  },
});
