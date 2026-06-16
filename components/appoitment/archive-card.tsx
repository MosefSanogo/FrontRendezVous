import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface ArchiveCardProps {
  data: any;
  onPress?: (id: number | string) => void;
}

const ArchiveCard = ({ data, onPress }: ArchiveCardProps) => {
  const colors = Colors["light"];

  // Gestion des couleurs selon le statut
  const getStatusConfig = (statut: string) => {
    switch (statut.toLowerCase()) {
      case "confirmé":
      case "terminé":
        return { color: "#4CAF50", bg: "#E8F5E9" };
      case "annulé":
        return { color: "#F44336", bg: "#FFEBEE" };
      default:
        return { color: "#FF9800", bg: "#FFF3E0" };
    }
  };

  const statusStyle = getStatusConfig(data.statut);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(data.id)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: `http://192.168.1.218:3000/images/${data.image}` }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <ThemedText
            type="defaultSemiBold"
            style={styles.title}
            numberOfLines={1}
          >
            {data.nom}
          </ThemedText>
          <View
            style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}
          >
            <ThemedText
              style={[styles.statusText, { color: statusStyle.color }]}
            >
              {data.statut}
            </ThemedText>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <ThemedText style={styles.infoText} numberOfLines={1}>
            {data.adresse}
          </ThemedText>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.dateTime}>
            <Ionicons name="calendar-outline" size={14} color={colors.button} />
            <ThemedText style={styles.footerText}>
              {data.date.split("T")[0]}
            </ThemedText>
          </View>
          <View style={styles.dateTime}>
            <Ionicons name="time-outline" size={14} color={colors.button} />
            <ThemedText style={styles.footerText}>{data.heure}</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  footerRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 15,
  },
  dateTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default ArchiveCard;
