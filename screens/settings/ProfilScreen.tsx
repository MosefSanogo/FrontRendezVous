import ThemeEmptyData from "@/components/theme-empty-data";
import ThemeHarder from "@/components/theme-hearder";
import { ThemedView } from "@/components/themed-view";
import { HomeStackNavigationProp } from "@/configs/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfilScreen = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const [user, setUser] = useState({
    prenom: "",
    nom: "",
    tel: "",
  });
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Erreur de chargement des données utilisateur :", error);
      }
    };

    loadUserData();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Génère les initiales pour l'avatar
  const initiale =
    `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase();

  return (
    <ThemedView style={styles.container}>
      <ThemeHarder
        title="Mon profil"
        style={{ marginTop: -32 }}
        onBackPress={handleBackPress}
      />
      {user.prenom === "" && user.nom === "" && user.tel === "" ? (
        <ThemeEmptyData
          icon="person-outline"
          titre="Aucun profil trouvé"
          message="Veuillez prendre un rendez-vous pour voir votre profil."
        />
      ) : (
        <>
          {/* Section Avatar */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{initiale}</Text>
            </View>
            <Text style={styles.profileRole}>Utilisateur</Text>
          </View>

          {/* Formulaire d'information */}
          <View style={styles.formSection}>
            {/* Champ Prénom */}
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Prénom</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>{user.prenom}</Text>
              </View>
            </View>

            {/* Champ Nom */}
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Nom</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>{user.nom}</Text>
              </View>
            </View>

            {/* Champ Téléphone */}
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Numéro de Téléphone</Text>
              <View style={styles.infoBox}>
                <Text style={[styles.infoText, { letterSpacing: 0.5 }]}>
                  {user.tel}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </ThemedView>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 32,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#e3efff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a73e8",
  },
  profileRole: {
    fontSize: 14,
    color: "#666666",
    backgroundColor: "#f1f3f4",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: "hidden",
    fontWeight: "500",
  },
  formSection: {
    paddingHorizontal: 24,
  },
  infoGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888888",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  infoText: {
    fontSize: 16,
    color: "#111111",
    fontWeight: "500",
  },
});
