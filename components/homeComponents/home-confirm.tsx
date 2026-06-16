import { Colors } from "@/constants/theme";
import { formatDate } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

interface HomeConfirmData {
  image: string;
  nom: string;
  date: Date | null;
  heure: string | null;
  adresse: string;
}

const HomeConfirm = ({ data }: { data: HomeConfirmData }) => {
  const colors = Colors["light"];

  return (
    <View style={styles.card}>
      {/* IMAGE */}
      <Image
        source={{ uri: `http://192.168.1.218:3000/images/${data.image}` }}
        style={styles.image}
      />

      {/* INFOS */}
      <View style={styles.content}>
        <ThemedText style={styles.name}>{data.nom}</ThemedText>

        {/* DATE */}
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <ThemedText style={styles.text}>
            {formatDate(data.date || new Date())}
          </ThemedText>
        </View>

        {/* HEURE */}
        <View style={styles.row}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <ThemedText style={styles.text}>{data.heure || "--:--"}</ThemedText>
        </View>

        {/* ADRESSE */}
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <ThemedText style={styles.text} numberOfLines={1}>
            {data.adresse}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export default HomeConfirm;
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 15,
  },

  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
    gap: 6,
  },

  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  text: {
    fontSize: 13,
    color: "#666",
    flexShrink: 1,
  },
});
