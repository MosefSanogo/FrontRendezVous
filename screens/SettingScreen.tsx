import { Item } from "@/components/settings/setting-item";
import ThemeHarder from "@/components/theme-hearder";
import ThemedScrollView from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HomeStackNavigationProp } from "@/configs/home";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const SettingScreen = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const handelLogout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("historique_rdv");
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };
  return (
    <ThemedView style={styles.container}>
      <ThemeHarder title="Paramètres" style={{ marginTop: -32 }} />
      <View style={{ marginTop: 15 }}>
        <ThemedScrollView>
          {/* PROFIL */}
          <View style={styles.section}>
            <Item
              icon="person-outline"
              label="Mon profil"
              onPress={() => {
                navigation.navigate("Compte");
              }}
            />
          </View>

          {/* PARAMS */}
          <View style={styles.section}>
            <Item
              icon="notifications-outline"
              label="Notifications"
              onPress={() => navigation.navigate("Notification")}
            />
            <Item
              icon="language-outline"
              label="Langue"
              onPress={() => navigation.navigate("Langue")}
            />
          </View>

          {/* SUPPORT */}
          <View style={styles.section}>
            <Item icon="help-circle-outline" label="Support & aide" />
            <Item
              icon="document-text-outline"
              label="Conditions & confidentialité"
            />
            <Item icon="information-circle-outline" label="À propos" />
          </View>

          {/* LOGOUT */}
          <TouchableOpacity style={styles.logout} onPress={handelLogout}>
            <Ionicons name="log-out-outline" size={20} color="red" />
            <ThemedText style={styles.logoutText}>Déconnexion</ThemedText>
          </TouchableOpacity>
        </ThemedScrollView>
      </View>
    </ThemedView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  section: {
    marginBottom: 25,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },

  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
});
