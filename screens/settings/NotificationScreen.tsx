import ThemeHarder from "@/components/theme-hearder";
import { ThemedView } from "@/components/themed-view";
import { HomeStackNavigationProp } from "@/configs/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, ToastAndroid, View } from "react-native";

const NotificationScreen = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();

  // État local pour gérer l'activation du toggle SMS
  const [isSmsEnabled, setIsSmsEnabled] = useState(true);
  useEffect(() => {
    const loadNotificationPreference = async () => {
      try {
        const value = await AsyncStorage.getItem("smsNotifications");
        if (value !== null) {
          setIsSmsEnabled(value === "true");
        }
      } catch (error) {
        console.error("Erreur de chargement AsyncStorage :", error);
      }
    };

    loadNotificationPreference();
  }, []);
  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleSwitch = async () => {
    try {
      const nextState = !isSmsEnabled;
      setIsSmsEnabled(nextState);
      await AsyncStorage.setItem("smsNotifications", String(nextState));
      ToastAndroid.show(
        `Rappels par SMS ${!isSmsEnabled ? "activés" : "désactivés"}`,
        ToastAndroid.SHORT,
      );
    } catch (error) {
      console.error("Erreur de sauvegarde AsyncStorage :", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemeHarder
        title="Notification"
        style={{ marginTop: -32 }}
        onBackPress={handleBackPress}
      />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Préférences de rappel</Text>

        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.settingTitle}>Rappels par SMS</Text>
            <Text style={styles.settingDescription}>
              {`Recevez un SMS de confirmation et un rappel automatique avant l'heure de votre rendez-vous.`}
            </Text>
          </View>

          <Switch
            trackColor={{ false: "#767577", true: "#e3efff" }}
            thumbColor={isSmsEnabled ? "#1a73e8" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isSmsEnabled}
          />
        </View>
      </View>
    </ThemedView>
  );
};

export default NotificationScreen;

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
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  textContainer: {
    flex: 1,
    paddingRight: 16, // Laisse de l'espace pour éviter que le texte colle au Switch
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: "#666666",
    lineHeight: 18,
  },
});
