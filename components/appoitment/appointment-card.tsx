import { Colors } from "@/constants/theme";
import { formatDate } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

const AppointmentCard = ({
  data,
  onclick,
}: {
  data: any;
  onclick: (id: string) => void;
}) => {
  const colors = Colors["light"];
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onclick(data.id.toString())}
    >
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
      >
        {/* LEFT SECTION: AVATAR & INFO */}
        <View style={styles.left}>
          <Image
            source={{ uri: `http://192.168.1.218:3000/images/${data.image}` }}
            style={styles.image}
          />

          <View style={styles.info}>
            <ThemedText style={styles.name} numberOfLines={1}>
              {data.nom}
            </ThemedText>

            <View style={styles.row}>
              <Ionicons
                name="location-outline"
                size={13}
                color={colors.tabIconDefault}
              />
              <ThemedText style={styles.locationText} numberOfLines={1}>
                {data.adresse}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* RIGHT SECTION: DATE & TIME BADGE */}
        <View style={styles.right}>
          <ThemedText style={styles.dateText}>
            {formatDate(new Date(data.date))}{" "}
            {/* Utilise directement data.date si déjà formaté par SQL */}
          </ThemedText>

          <View
            style={[
              styles.timeBadge,
              { backgroundColor: colors.button + "15" },
            ]}
          >
            <Ionicons name="time-outline" size={12} color={colors.button} />
            <ThemedText style={[styles.timeText, { color: colors.button }]}>
              {data.heure.substring(0, 5)}
            </ThemedText>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    // Soft Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  locationText: {
    fontSize: 12,
    color: "#757575",
    flex: 1,
  },
  right: {
    alignItems: "flex-end",
    gap: 6,
    paddingLeft: 10,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#424242",
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default AppointmentCard;
