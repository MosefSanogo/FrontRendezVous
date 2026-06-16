import { Colors } from "@/constants/theme";
import { Service } from "@/types/service";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

interface HomeCardProps {
  data: Service;
  onClick: (id: string | number) => void;
}

const HomeCard = ({ data, onClick }: HomeCardProps) => {
  const colors = Colors["light"];

  return (
    <TouchableOpacity
      onPress={() => onClick(data.id)}
      style={styles.container}
      activeOpacity={0.9}
    >
      <View style={styles.contentRow}>
        {/* IMAGE */}
        <Image
          source={{ uri: `http://192.168.1.218:3000/images/${data.image_url}` }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* INFO SECTION */}
        <View style={styles.mainInfo}>
          <View style={styles.headerInfo}>
            <View style={styles.titleRow}>
              <ThemedText style={styles.title} numberOfLines={1}>
                {data.nom}
              </ThemedText>
              {/* Optionnel : Badge de catégorie */}
              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: colors.button + "10" },
                ]}
              >
                <ThemedText
                  style={[styles.categoryText, { color: colors.button }]}
                >
                  {data.category}
                </ThemedText>
              </View>
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color={colors.button} />
              <ThemedText style={styles.cityText}>{data.ville_name}</ThemedText>
            </View>
          </View>

          {/* ADDRESS FOOTER */}
          <View style={styles.addressContainer}>
            <ThemedText style={styles.addressText} numberOfLines={1}>
              {data.adresse}
            </ThemedText>
          </View>
        </View>
      </View>

      {/* PETITE FLÈCHE INDICATIVE */}
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={16} color="#CCC" />
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    marginHorizontal: 1, // Pour ne pas couper l'ombre
    position: "relative",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
  },
  mainInfo: {
    flex: 1,
    marginLeft: 15,
    height: 75,
    justifyContent: "space-between",
  },
  headerInfo: {
    gap: 2,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
    color: "#1A1A1A",
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cityText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  addressContainer: {
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 6,
  },
  addressText: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  arrowContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: -8,
  },
});
