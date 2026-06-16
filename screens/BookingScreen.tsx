import HomeCard from "@/components/homeComponents/home-card";
import ThemeEmptyData from "@/components/theme-empty-data";
import ThemeHarder from "@/components/theme-hearder";
import ThemedScrollView from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HomeStackNavigationProp } from "@/configs/home";
import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const BookingScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const cardData: any[] = [];
  const colors = Colors["light"];
  const navigation = useNavigation<HomeStackNavigationProp>();
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
          {cardData.length === 0 ? (
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
                {cardData.map((card) => (
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
