import { HomeStackNavigationProp } from "@/configs/home";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";
const HomeHeader = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();

  const handleCardClick = () => {
    navigation.navigate("Search");
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <View>
          <ThemedText style={styles.fullname}>MALIRDV</ThemedText>
          <ThemedText style={styles.welcome}>
            Bienvenue dans votre application !
          </ThemedText>
        </View>
      </View>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <TouchableOpacity onPress={handleCardClick} style={styles.touchable}>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCardClick} style={styles.touchable}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: "cover",
  },
  imgView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  fullname: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 12,
    color: "#666",
  },
  touchable: {
    padding: 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
