import HomeSearchCard from "@/components/homeComponents/home-search-card";
import ThemedSearchBar from "@/components/theme-search-box";
import ThemedScrollView from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HomeStackNavigationProp } from "@/configs/home";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const SearchScreen = () => {
  const colors = Colors["light"];
  const navigation = useNavigation<HomeStackNavigationProp>();
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleBackPress = () => {
    navigation.goBack();
  };
  const cardData = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      nom: "Dr. Marie Dupont",
      category: "Cardiologue",
      adresse: "123 Rue de la Paix, Paris",
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      nom: "Dr. Ahmed Traoré",
      category: "Dentiste",
      adresse: "456 Avenue de l'Indépendance, Bamako",
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/women/66.jpg",
      nom: "Dr. Fatoumata Coulibaly",
      category: "Pédiatre",
      adresse: "789 Boulevard de la Liberté, Bamako",
    },
  ];
  const dataFiltered = cardData.filter(
    (item) =>
      item.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.adresse.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <ThemedView style={[styles.container]}>
      <View style={[styles.title, { backgroundColor: colors.button }]}></View>
      <View style={[styles.header, { backgroundColor: colors.button }]}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <ThemedText
          style={{
            color: colors.white,
            fontSize: 17,
            width: "100%",
            textAlign: "center",
          }}
          type="defaultSemiBold"
        >
          Recherche
        </ThemedText>
      </View>
      <ThemedScrollView>
        <View>
          <ThemedText
            style={{
              color: colors.text,
              fontSize: 12,
              marginLeft: 16,
              marginBottom: 2,
            }}
            type="defaultSemiBold"
          >
            Nom, ville, spécialité, adresse, etc.
          </ThemedText>
          <ThemedSearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          {searchQuery.length > 0 &&
            dataFiltered.map((card) => (
              <HomeSearchCard
                key={card.id}
                data={card}
                onClick={(id) => navigation.navigate("Detail", { id })}
              />
            ))}
          {searchQuery.length > 0 && dataFiltered.length === 0 && (
            <ThemedText
              style={{
                color: colors.text,
                fontSize: 14,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              Aucun résultat trouvé pour {searchQuery}
            </ThemedText>
          )}
        </View>
      </ThemedScrollView>
    </ThemedView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -32,
    backgroundColor: "#3333",
    height: 32,
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 20,
  },
});
