import HomeCard from "@/components/homeComponents/home-card";
import ThemeEmptyData from "@/components/theme-empty-data";
import ThemeHarder from "@/components/theme-hearder";
import ThemedScrollView from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HomeStackNavigationProp } from "@/configs/home";
import { Colors } from "@/constants/theme";
import favorisService from "@/services/favoris.service";
import { FavorisType } from "@/types/favoris.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const BookingScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const cardData: any[] = [];
  const colors = Colors["light"];
  const navigation = useNavigation<HomeStackNavigationProp>();
  const [favoris, setFavoris] = useState<FavorisType[]>([]);
  const [user, setUser] = useState({
    id: "",
    nom: "",
    prenom: "",
    tel: "",
  });
  useFocusEffect(
    React.useCallback(() => {
      const loadService = async () => {
        setLoading(true);
        try {
          const delay = new Promise((resolve) => setTimeout(resolve, 500));

          const [userData] = await Promise.all([
            AsyncStorage.getItem("user"),
            delay,
          ]);

          if (userData) {
            const currentUser = JSON.parse(userData);

            setUser(currentUser);

            const data = await favorisService.getAllFavorisWithService(
              currentUser.id,
            );
            setFavoris(data);
          }
        } catch (error: any) {
          console.log(error.response?.config?.url);
          console.log(error.response?.status);
          console.log(error.response?.data);
        } finally {
          setLoading(false);
        }
      };
      loadService();
    }, []),
  );
  const handleCardClick = (id: string | number) => {
    navigation.navigate("Detail", { id });
  };
  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return (
    <ThemedView style={styles.container}>
      <ThemeHarder title="Mes favoris" style={{ marginTop: -32 }} />
      {loading ? (
        <ActivityIndicator
          size={35}
          color={colors.button}
          style={{ marginTop: 20 }}
        />
      ) : (
        <ThemedScrollView>
          {favoris.length === 0 ? (
            <View
              style={{
                marginTop: "50%",
              }}
            >
              <ThemeEmptyData
                icon="heart-outline"
                titre="Aucun favori"
                message="Cliquez sur le cœur dans les détails d'un service pour l'ajouter ici."
              />
            </View>
          ) : (
            <>
              <ThemedText
                style={{
                  paddingHorizontal: 16,
                  marginTop: 10,
                  fontWeight: "bold",
                }}
              >
                Mes Favoris
              </ThemedText>
              <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
                {favoris.map((card) => (
                  <HomeCard
                    key={card.id}
                    data={card}
                    onClick={handleCardClick}
                  />
                ))}
              </View>
            </>
          )}
        </ThemedScrollView>
      )}
    </ThemedView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
