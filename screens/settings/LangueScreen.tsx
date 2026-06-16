import ThemeHarder from "@/components/theme-hearder";
import { ThemedView } from "@/components/themed-view";
import { HomeStackNavigationProp } from "@/configs/home";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";

const LangueScreen = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();

  // État local pour gérer la langue sélectionnée ('fr' ou 'An')
  const [currentLang, setCurrentLang] = useState<"fr" | "An">("fr");

  const handleBackPress = () => {
    navigation.goBack();
  };

  const selectLanguage = (lang: "fr" | "An") => {
    setCurrentLang(lang);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemeHarder
        title={currentLang === "fr" ? "Langue" : "Language"}
        style={{ marginTop: -32 }}
        onBackPress={handleBackPress}
      />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {currentLang === "fr"
            ? "Choisir la langue d'affichage"
            : "Choose Display Language"}
        </Text>

        {/* Option: Français */}
        <TouchableOpacity
          style={[
            styles.langOption,
            currentLang === "fr" && styles.activeOption,
            currentLang === "An" && styles.activeOption,
          ]}
          onPress={() => selectLanguage("fr")}
          activeOpacity={0.7}
        >
          <View style={styles.langInfo}>
            <Text style={styles.langName}>Français</Text>
            <Text style={styles.langSub}>French</Text>
          </View>
          {currentLang === "fr" ||
            (currentLang === "An" && <Text style={styles.checkMark}>✓</Text>)}
        </TouchableOpacity>

        {/* Option: Anglais */}
        <TouchableOpacity
          style={[styles.langOption]}
          onPress={() => {
            selectLanguage("An");
            ToastAndroid.show(
              "Fonctionnalité en cours de développement",
              ToastAndroid.SHORT,
            );
          }}
          activeOpacity={0.7}
        >
          <View style={styles.langInfo}>
            <Text style={styles.langName}>Anglais</Text>
            <Text style={styles.langSub}>English</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default LangueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888888",
    textTransform: "uppercase",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  langOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  activeOption: {
    borderColor: "#1a73e8",
    backgroundColor: "#e3efff",
  },
  langInfo: {
    flexDirection: "column",
    flex: 1,
  },
  langName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  langSub: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  checkMark: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a73e8",
    marginLeft: 10,
  },
});
