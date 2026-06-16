import { ThemedText } from "@/components/themed-text";
import { HomeStackNavigationProp } from "@/configs/home";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width } = Dimensions.get("window");
const CodeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<HomeStackNavigationProp>();
  const insets = useSafeAreaInsets();
  const colors = Colors["light"];

  // On récupère les infos du RDV passées par la page précédente
  const { rdv } = route.params as { rdv: any };

  // La donnée que contiendra le QR Code (souvent l'ID ou un JSON)
  const qrValue = JSON.stringify({
    id: rdv.id,
    token: rdv.qrToken,
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER SIMPLE */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
          Détails du QR Code
        </ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <ThemedText style={styles.title}>{rdv.title}</ThemedText>
          <ThemedText style={styles.subtitle}>
            {rdv.nom || "Service médical"}
          </ThemedText>

          <View style={styles.qrContainer}>
            <QRCode
              value={qrValue}
              size={width * 0.6}
              color="black"
              backgroundColor="white"
            />
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <ThemedText style={styles.label}>Date</ThemedText>
              <ThemedText style={styles.value}>{rdv.date}</ThemedText>
            </View>
            <View style={styles.infoItem}>
              <ThemedText style={styles.label}>Heure</ThemedText>
              <ThemedText style={styles.value}>{rdv.heure}</ThemedText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <ThemedText style={styles.locationText}>
              {rdv.localisation}
            </ThemedText>
          </View>
        </View>

        <ThemedText style={styles.instructions}>
          Présentez ce QR Code à l&#39;accueil lors de votre arrivée.
        </ThemedText>
      </View>
    </View>
  );
};

export default CodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 50,
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  qrContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  infoItem: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#999",
    textTransform: "uppercase",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#EEE",
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  locationText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },
  instructions: {
    marginTop: 30,
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    paddingHorizontal: 40,
  },
});
