import { HomeStackNavigationProp } from "@/configs/home";
import { Colors } from "@/constants/theme";
import { AppointmentItem } from "@/types/appointments";
import { formatDate } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Animated,
    Image,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { ThemedText } from "../themed-text";

interface HomeAppointmentProps {
  data: AppointmentItem;
  total: number;
}

const HomeAppointment = ({ data, total }: HomeAppointmentProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const navigation = useNavigation<HomeStackNavigationProp>();

  const handleClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs", params: { screen: "Mes RDV" } }],
    });
  };
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
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <ThemedText style={styles.title}>
          Rendez-vous à venir ({total})
        </ThemedText>

        <TouchableOpacity onPress={handleClick} activeOpacity={0.7}>
          <ThemedText style={styles.link}>Voir tous</ThemedText>
        </TouchableOpacity>
      </View>

      {/* CARD */}
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {}}
      >
        <View style={[styles.card, { backgroundColor: colors.button }]}>
          {/* LEFT */}
          <View style={styles.left}>
            <Image source={{ uri: data.image }} style={styles.image} />

            <View style={styles.info}>
              <ThemedText style={styles.name}>{data.title}</ThemedText>

              <View style={styles.row}>
                <Ionicons name="location-outline" size={12} color="#fff" />
                <ThemedText style={styles.text} numberOfLines={1}>
                  {data.localisation}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* RIGHT */}
          <View style={styles.right}>
            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={12} color="#fff" />
              <ThemedText style={styles.text}>
                {formatDate(new Date(data.date))}
              </ThemedText>
            </View>

            <View style={styles.row}>
              <Ionicons name="time-outline" size={12} color="#fff" />
              <ThemedText style={styles.text}>{data.heure}</ThemedText>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default HomeAppointment;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
  },

  link: {
    fontSize: 13,
    color: "#007bff",
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 16,

    // shadow iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // shadow Android
    elevation: 3,
  },

  left: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },

  image: {
    width: 55,
    height: 55,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#fff",
  },

  info: {
    flex: 1,
    justifyContent: "center",
    gap: 5,
  },

  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },

  right: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  text: {
    fontSize: 12,
    color: "#fff",
  },
});
