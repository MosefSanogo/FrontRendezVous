import HomeConfirm from "@/components/homeComponents/home-confirm";
import ThemeButton from "@/components/theme-button";
import ThemeTextInput from "@/components/theme-text-input";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HomeStackNavigationProp, rdv } from "@/configs/home";
import { Colors } from "@/constants/theme";
import reservationService from "@/services/reservation.service";
import userService from "@/services/user.service";
import { User } from "@/types/user";
import { formatPhone } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ConfirmScreen = () => {
  const insets = useSafeAreaInsets();
  const [prenom, setPrenom] = useState<string>("");
  const [nom, setnom] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const loadUserData = async () => {
        try {
          const userData = await AsyncStorage.getItem("user");
          if (userData) {
            //setUser(JSON.parse(userData));
            const parsedUser: User = JSON.parse(userData);
            setPrenom(parsedUser.prenom);
            setnom(parsedUser.nom);
            setTelephone(parsedUser.telephone);
          }
        } catch (error) {
          console.error(
            "Erreur de chargement des données utilisateur :",
            error,
          );
        }
      };
      loadUserData();
    }, []),
  );

  const route = useRoute();
  const { rdv } = route.params as { rdv: rdv };
  const data = {
    service: rdv.service,
    sousService: rdv.sousService,
    timeSlot: rdv.timeSlot,
    image: rdv.image,
    nom: rdv.nom,
    date: new Date(rdv.date as string),
    heure: rdv.heure,
    adresse: rdv.adresse,
  };
  const colors = Colors["light"];
  const navigation = useNavigation<HomeStackNavigationProp>();
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleChange = (text: string) => {
    const formatted = formatPhone(text);
    setTelephone(formatted);
  };
  const handleSubmit = async () => {
    setLoader(true);
    if (!prenom || !nom || !telephone) {
      ToastAndroid.show("Veuillez remplir tous les champs", ToastAndroid.SHORT);
      setLoader(false);
      return;
    }
    if (telephone.length < 11) {
      ToastAndroid.show(
        "Veuillez renseigner un bon numéro",
        ToastAndroid.SHORT,
      );
      setLoader(false);
      return;
    }
    try {
      const userdata = await userService.register({ prenom, nom, telephone });
      if (userdata) {
        setUser(userdata);
        try {
          const reservationData = await reservationService.registerReservation({
            citoyenId: userdata.id,
            serviceId: data.service,
            sousServiceId: data.sousService,
            timeSlotId: data.timeSlot,
            date: new Date(data.date).toISOString().split("T")[0],
            heure: data.heure,
          });
          if (
            reservationData &&
            reservationData.id &&
            reservationData.qrToken
          ) {
            await AsyncStorage.setItem(
              "user",
              JSON.stringify({
                id: userdata.id,
                nom,
                prenom,
                telephone,
              }),
            );
            await sauvegarderDansHistorique({
              ...data,
              id: reservationData.id,
              qrToken: reservationData.qrToken,
            });
            setTimeout(async () => {
              setLoader(false);
              navigation.reset({
                index: 0,
                routes: [{ name: "Succes" }],
              });
            }, 1000);
          } else {
            ToastAndroid.show(
              "Une erreur est survenue lors de la réservation",
              ToastAndroid.SHORT,
            );
          }
        } catch (error) {
          console.error(
            "Erreur lors de l'enregistrement de la réservation :",
            error,
          );
          ToastAndroid.show("Une erreur est survenue", ToastAndroid.SHORT);
        } finally {
          setLoader(false);
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de l'utilisateur :",
        error,
      );
      ToastAndroid.show("Une erreur est survenue", ToastAndroid.SHORT);
    } finally {
      setLoader(false);
    }

    return;
  };

  const sauvegarderDansHistorique = async (
    nouveauRdv: typeof data & { id: number | null; qrToken: string | null },
  ) => {
    try {
      const historiqueExistant = await AsyncStorage.getItem("historique_rdv");

      let nouveauTableau = [];

      if (historiqueExistant !== null) {
        nouveauTableau = JSON.parse(historiqueExistant);
      }

      nouveauTableau.unshift(nouveauRdv);

      await AsyncStorage.setItem(
        "historique_rdv",
        JSON.stringify(nouveauTableau),
      );

      console.log("RDV ajouté à l'historique hors-ligne avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'historique :", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
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
          Confirmez le rendez-vous
        </ThemedText>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
      >
        <HomeConfirm data={data} />

        {/* CARD FORM */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Vos informations
          </ThemedText>

          <View style={styles.group}>
            <ThemedText style={styles.label}>Prénom</ThemedText>
            <ThemeTextInput
              style={styles.input}
              placeholder="Ex: Mohamed"
              onChangeText={setPrenom}
              value={prenom}
            />
          </View>

          <View style={styles.group}>
            <ThemedText style={styles.label}>Nom</ThemedText>
            <ThemeTextInput
              style={styles.input}
              placeholder="Ex: Sanogo"
              onChangeText={setnom}
              value={nom}
            />
          </View>

          <View style={styles.group}>
            <ThemedText style={styles.label}>Téléphone</ThemedText>
            <ThemeTextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Ex: 71 00 10 00"
              onChangeText={handleChange}
              value={telephone}
              maxLength={11}
            />
          </View>
        </View>

        {/* BOUTON */}
        <ThemeButton
          name={loader ? "Chargement..." : "Confirmer le rendez-vous"}
          onPress={handleSubmit}
          style={[styles.button, { marginBottom: 20 + insets.bottom }]}
          iconName="checkmark-circle-outline"
          loader={loader}
        />
      </KeyboardAwareScrollView>
      {loader && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </ThemedView>
  );
};

export default ConfirmScreen;

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
  scroll: {
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  card: {
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 3, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },

  group: {
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },

  button: {
    marginHorizontal: 16,
    marginTop: 30,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
});
