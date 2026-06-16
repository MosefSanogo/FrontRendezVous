import { SousService } from "@/types/service";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ServiceSelector = ({
  item,
  onclick,
  value,
}: {
  item: SousService;
  onclick: (id: string | number, nom: string) => void;
  value: string | number;
}) => {
  const isSelected = value === item.id;

  return (
    <TouchableOpacity
      onPress={() => {
        onclick(item.id, item.nom);
      }}
      style={[styles.dateItem, isSelected && styles.selectedDateItem]}
    >
      <Text style={[styles.dateText, isSelected && styles.selectedText]}>
        {item.nom}
      </Text>
    </TouchableOpacity>
  );
};

export default ServiceSelector;

const styles = StyleSheet.create({
  container: {},

  dateItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  selectedDateItem: {
    backgroundColor: "#000",
  },

  dayText: {
    fontSize: 12,
    color: "#666",
    textTransform: "capitalize",
  },

  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  selectedText: {
    color: "#fff",
  },
});
