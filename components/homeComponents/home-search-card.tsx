import { Colors } from "@/constants/theme";
import React from "react";
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { ThemedText } from "../themed-text";
interface HomeSearchCardData {
  id: string | number;
  image: string;
  nom: string;
  category: string;
  adresse: string;
}
interface HomeSearchCardProps {
  data: HomeSearchCardData;
  onClick: (id: string) => void;
}
const HomeSearchCard = ({ data, onClick }: HomeSearchCardProps) => {
  const colors = Colors[useColorScheme() ?? "light"];
  return (
    <TouchableOpacity
      onPress={() => onClick(data.id.toString())}
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        flexDirection: "row",
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: data.image }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
        resizeMode="cover"
      />
      <View>
        <ThemedText
          style={{ fontSize: 14, fontWeight: "bold", color: colors.button }}
        >
          {data.nom}
        </ThemedText>
        <ThemedText style={{ fontSize: 12, color: colors.text }}>
          {data.category}
        </ThemedText>
        <ThemedText style={{ fontSize: 12, color: colors.text }}>
          {data.adresse}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default HomeSearchCard;
const styles = StyleSheet.create({});
