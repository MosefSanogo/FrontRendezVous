import HomeAppointment from "@/components/homeComponents/home-appointment";
import HomeCard from "@/components/homeComponents/home-card";
import HomeCategory from "@/components/homeComponents/home-category";
import HomeHeader from "@/components/homeComponents/home-header";
import ThemedScrollView from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HomeStackNavigationProp } from "@/configs/home";
import serviceService from "@/services/service.service";
import { Service } from "@/types/service";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
const HomeScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      const loadServices = async () => {
        try {
          const data = await serviceService.findAllServices();
          setServices(data);
        } catch (error) {
          console.error("Erreur de chargement des services :", error);
        }
      };
      loadServices();
    }, []),
  );
  const data = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/men/24.jpg",
      title: "Clinique ABC",
      localisation: "123 Rue de la Paix, Paris",
      date: "2023-10-15",
      heure: "14:30",
      code: "5476e6f4-e40a-439f-aeda-181bb4a92d15",
    },
  ];
  const categories = [
    { id: 0, name: "Tous", icon: "apps-outline" },
    { id: 1, name: "Clinique", icon: "medkit-outline" },
    { id: 2, name: "Hôpital", icon: "business-outline" },
    { id: 3, name: "Administration", icon: "documents-outline" },
    { id: 4, name: "Pharmacie", icon: "flask-outline" },
    { id: 5, name: "Autres", icon: "ellipsis-horizontal-outline" },
  ];

  const [selectedCategory, setSelectedCategory] = React.useState<
    string | number
  >(0);
  const handleCategoryClick = (id: string | number, name: string) => {
    setSelectedCategory(id);
  };
  const navigation = useNavigation<HomeStackNavigationProp>();
  const handleCardClick = (id: string | number) => {
    navigation.navigate("Detail", { id });
  };
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}></Text>
      <ThemedScrollView>
        <HomeHeader />
        <HomeAppointment total={5} data={data[0]} />
        <ThemedText
          type="defaultSemiBold"
          style={{ paddingHorizontal: 16, marginTop: 20 }}
        >
          Catégories
        </ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            gap: 10,
            paddingHorizontal: 16,
            marginTop: 10,
          }}
        >
          {categories.map((cat) => (
            <HomeCategory
              key={cat.id}
              data={cat}
              selectedId={selectedCategory}
              onclick={handleCategoryClick}
            />
          ))}
        </ScrollView>
        <ThemedText
          type="defaultSemiBold"
          style={{ paddingHorizontal: 16, marginTop: 20 }}
        >
          Prestataires populaires
        </ThemedText>
        <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
          {services.map((card) => (
            <HomeCard key={card.id} data={card} onClick={handleCardClick} />
          ))}
        </View>
      </ThemedScrollView>
    </ThemedView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -32,
    backgroundColor: "#3333",
  },
});
