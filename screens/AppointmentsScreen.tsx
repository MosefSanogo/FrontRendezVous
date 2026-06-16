import AppointmentCard from "@/components/appoitment/appointment-card";
import ArchiveCard from "@/components/appoitment/archive-card";
import ThemeEmptyData from "@/components/theme-empty-data";
import ThemeHarder from "@/components/theme-hearder";
import ThemedScrollView from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HomeStackNavigationProp } from "@/configs/home";
import { Colors } from "@/constants/theme";
import { AppointmentItem } from "@/types/appointments";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const AppointmentsScreen = () => {
  const colors = Colors["light"];
  const [tabI, setTabI] = useState<number>(0);
  const [historiques, setHistoriques] = useState<any[]>([]);
  const [archives, setArchives] = useState<any[]>([]);
  const navigation = useNavigation<HomeStackNavigationProp>();
  const handleActive = (id: number) => {
    setTabI(id);
  };
  useFocusEffect(
    React.useCallback(() => {
      const loadHistories = async () => {
        try {
          const histories = await AsyncStorage.getItem("historique_rdv");

          if (histories !== null) {
            const valideData: any[] = JSON.parse(histories);

            const filter: any[] = valideData.filter((d) => {
              const rdvDate = new Date(`${d.date.split("T")[0]}T${d.heure}`);
              return rdvDate >= new Date();
            });

            const filterArchive: any[] = valideData.filter((d) => {
              const rdvDate = new Date(`${d.date.split("T")[0]}T${d.heure}`);
              return rdvDate < new Date();
            });

            setHistoriques(filter);
            setArchives(filterArchive);
          } else {
            setHistoriques([]);
          }
        } catch (error) {
          console.error("Erreur lecture AsyncStorage:", error);
          setHistoriques([]);
        }
      };

      loadHistories();
    }, []),
  );

  const handeClick = (code: string) => {
    const find: AppointmentItem | any = historiques.find(
      (i) => i.id.toString() === code,
    );
    navigation.navigate("Code", {
      rdv: find,
    });
  };
  return (
    <ThemedView style={styles.container}>
      <ThemeHarder title=" Mes Rendez-vous" style={{ marginTop: -32 }} />
      <View style={styles.tab}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            tabI === 0 && styles.tabItemActive,
            tabI === 0 && { borderBottomColor: colors.button },
          ]}
          onPress={() => handleActive(0)}
          activeOpacity={0.9}
        >
          <ThemedText
            style={[tabI === 0 && { color: colors.button }, { fontSize: 14 }]}
            type="defaultSemiBold"
          >
            A venir
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleActive(1)}
          style={[
            styles.tabItem,
            tabI === 1 && styles.tabItemActive,
            tabI === 1 && { borderBottomColor: colors.button },
          ]}
          activeOpacity={0.9}
        >
          <ThemedText
            style={[tabI === 1 && { color: colors.button }, { fontSize: 14 }]}
            type="defaultSemiBold"
          >
            Passés
          </ThemedText>
        </TouchableOpacity>
      </View>
      {tabI === 0 && (
        <>
          <View style={styles.view}>
            <ThemedScrollView>
              {historiques.map((card, key) => (
                <AppointmentCard
                  data={card}
                  key={card.id}
                  onclick={handeClick}
                />
              ))}
            </ThemedScrollView>
          </View>
          {historiques.length === 0 && <ThemeEmptyData />}
        </>
      )}
      {tabI === 1 && (
        <>
          <FlatList
            data={archives}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ArchiveCard
                data={{ ...item, statut: "Terminé" }}
                onPress={(id) => console.log("Détails de l'archive :", id)}
              />
            )}
            contentContainerStyle={{ padding: 16 }}
          />
          {archives.length === 0 && (
            <ThemeEmptyData
              titre="Aucune archive"
              message="Vos rendez-vous passés ou annulés apparaîtront ici une fois archivés."
              icon="archive-outline"
              style={{ position: "absolute", top: "50%" }}
            />
          )}
        </>
      )}
    </ThemedView>
  );
};

export default AppointmentsScreen;

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
  },
  tab: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabItem: {
    width: "50%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tabItemActive: {
    borderBottomWidth: 2,
  },
  view: {
    padding: 15,
    gap: 15,
  },
});
