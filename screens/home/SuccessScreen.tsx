import ThemeButton from "@/components/theme-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HomeStackNavigationProp } from "@/configs/home";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SuccessScreen = () => {
  const color = Colors["light"];
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeStackNavigationProp>();

  const handleContinue = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs", params: { screen: "Mes RDV" } }],
    });
  };

  return (
    <ThemedView style={styles.container}>
      {/* CONTENU */}
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" color={color.button} size={90} />

        <ThemedText style={styles.title}>Félicitations 🎉</ThemedText>

        <ThemedText style={styles.subtitle}>
          Votre réservation a été validée avec succès.
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          MALIRDV vous dit à bientôt 👋
        </ThemedText>
      </View>

      {/* BOUTON */}
      <ThemeButton
        name="Continuer"
        onPress={handleContinue}
        style={[styles.button, { marginBottom: 20 + insets.bottom }]}
        iconName="arrow-forward"
      />
    </ThemedView>
  );
};

export default SuccessScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },

  button: {
    marginHorizontal: 20,
  },
});
