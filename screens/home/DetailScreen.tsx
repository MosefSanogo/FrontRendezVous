import { Ionicons } from "@expo/vector-icons";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Components
import DateSelector from "@/components/DateSelector";
import ThemeButton from "@/components/theme-button";
import ThemedScrollView from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import TimeSlotGrid from "@/components/TimeSlotGrid";

import ServiceSelector from "@/components/ServiceSelector";
import { HomeStackNavigationProp } from "@/configs/home";
import { Colors } from "@/constants/theme";
import favorisService from "@/services/favoris.service";
import serviceService from "@/services/service.service";
import timeSlotService from "@/services/timeSlot.service";
import { FavorisType } from "@/types/favoris.type";
import { ServiceView, SousService } from "@/types/service";
import { AvailabilityDay } from "@/types/timeSlot";
import { existInFavoris } from "@/utils/favoris.util";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DetailRouteProp = RouteProp<{ params: { id: string | number } }, "params">;

const DetailScreen = () => {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation<HomeStackNavigationProp>();
  const insets = useSafeAreaInsets();
  const colors = Colors["light"];

  const { id } = route.params;

  // States
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<string>("");
  const [selectedHeure, setSelectedHeure] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string | number>("");
  const [user, setUser] = useState({
    id: "",
    nom: "",
    prenom: "",
    tel: "",
  });
  const [heart, setHeart] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [service, setService] = useState<ServiceView | null>(null);
  const [favoris, setFavoris] = useState<FavorisType[]>([]);
  const [subServices, setSubServices] = useState<SousService[]>([]);
  const [timeSlots, setTimeSlots] = useState<AvailabilityDay>({
    date: "",
    total_slots: 0,
    time_slots: [],
  });
  useFocusEffect(
    React.useCallback(() => {
      const loadService = async () => {
        try {
          const userData = await AsyncStorage.getItem("user");
          if (userData) {
            const currentUser = JSON.parse(userData);

            setUser(currentUser);

            const data = await favorisService.getAllFavoris(currentUser.id);
            setFavoris(data);
            if (existInFavoris(data, id)) {
              setHeart(true);
            }
          }
        } catch (error: any) {
          console.log(error.response?.config?.url);
          console.log(error.response?.status);
          console.log(error.response?.data);
        }
      };
      loadService();
    }, []),
  );
  useFocusEffect(
    React.useCallback(() => {
      const loadService = async () => {
        try {
          const data = await serviceService.findByServiceId(id);
          setService(data);
        } catch (error) {
          console.error("Erreur de chargement du service :", error);
        }
      };
      loadService();
    }, [id]),
  );
  useFocusEffect(
    React.useCallback(() => {
      const loadService = async () => {
        try {
          const data = await serviceService.getSousServiceActif(id);
          setSubServices(data);
        } catch (error) {
          console.error("Erreur de chargement du service :", error);
        }
      };
      loadService();
    }, [id]),
  );
  useFocusEffect(
    React.useCallback(() => {
      const loadTimeSlots = async () => {
        if (!selectedDate || !selectedService) return;
        setLoader(true);
        try {
          const data = await timeSlotService.generateTimeSlots(
            id,
            selectedService,
            selectedDate,
          );
          setTimeSlots(data);
        } catch (error) {
          console.error("Erreur de chargement des créneaux horaires :", error);
        } finally {
          setLoader(false);
        }
      };
      loadTimeSlots();
    }, [selectedDate, selectedService, id]),
  );
  // Handlers
  const handleDateChange = (id: string, date: Date) => {
    setSelectedDate(new Date(date).toISOString().split("T")[0]);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2500);
  };

  const handleTimeSelect = (id: string, heure: string) => {
    setSelectedHeure(heure);
    setSelectedTimeId(id);
  };
  const handleServiceSelect = (id: string | number, heure: string) => {
    setSelectedService(id);
  };
  const handleHeart = async () => {
    if (!user) {
      ToastAndroid.show(
        "Veuillez prendre un rendez pour mettre en favoris",
        ToastAndroid.SHORT,
      );
      return;
    }
    if (existInFavoris(favoris, id)) {
      await favorisService.deteleFavoris(id, user.id);

      setFavoris((prev) => prev.filter((v) => v.service_id !== id));

      setHeart(false);
    } else {
      await favorisService.registerFavoris({
        serviceId: id,
        citoyenId: user.id,
      });
      setFavoris((prev) => [...prev, { service_id: id, citoyen_id: user.id }]);
      setHeart(true);
    }
  };
  const handleConfirm = () => {
    setIsSubmitting(true);
    // Simulation API
    setTimeout(() => {
      setIsSubmitting(false);
      navigation.navigate("Confirme", {
        rdv: {
          service: id,
          sousService: selectedService,
          timeSlot: selectedTimeId,
          date: selectedDate || "",
          heure: selectedHeure,
          nom: service?.agencyName || "Service Inconnu",
          image: service?.img || "",
          adresse: service?.address || "123 Rue de la Paix, Paris",
        },
      });
    }, 500);
  };

  return (
    <View style={styles.container}>
      <ThemedScrollView>
        {/* Header Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `http://192.168.1.218:3000/images/${service?.img}`,
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "transparent"]}
            style={styles.topGradient}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.bottomGradient}
          />

          <ThemedText type="defaultSemiBold" style={styles.doctorName}>
            {service?.agencyName || "Service Inconnu"}
          </ThemedText>

          {/* Back Button - Positioned absolutely over the image */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backButton, { top: insets.top + 10 }]}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleHeart}
            style={[styles.heartButton, { top: insets.top + 10 }]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={heart ? "heart-sharp" : "heart-outline"}
              size={24}
              color={!heart ? "#fff" : "#eb4f11"}
            />
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <ThemedText type="defaultSemiBold" style={styles.sectionLabel}>
            {service?.category || "Catégorie Inconnue"}
          </ThemedText>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons
                name="location-outline"
                size={14}
                color={colors.text + "99"}
              />
              <ThemedText
                style={[styles.infoText, { color: colors.text + "99" }]}
              >
                {service?.address || "123 Rue de la Paix, Paris"}
              </ThemedText>
            </View>
            <View style={styles.infoItem}>
              <Ionicons
                name="call-outline"
                size={14}
                color={colors.text + "99"}
              />
              <ThemedText
                style={[styles.infoText, { color: colors.text + "99" }]}
              >
                {service?.phone || "Aucun numéro disponible"}
              </ThemedText>
            </View>
          </View>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Sélectionnez un service
          </ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {subServices.map((i) => (
              <ServiceSelector
                item={i}
                key={i.id}
                onclick={handleServiceSelect}
                value={selectedService}
              />
            ))}
          </ScrollView>
          {selectedService && (
            <>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Sélectionnez une date
              </ThemedText>
              <DateSelector onclick={handleDateChange} />
            </>
          )}
          {selectedDate && selectedService && (
            <View style={styles.timeSlotSection}>
              {loader && (
                <ActivityIndicator
                  size={35}
                  color={colors.button}
                  style={{ marginTop: 20 }}
                />
              )}
              {!loader && (
                <>
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.sectionTitle}
                  >
                    Sélectionnez un créneau
                  </ThemedText>

                  {timeSlots.time_slots.length > 0 && (
                    <TimeSlotGrid
                      date={selectedDate}
                      slots={timeSlots.time_slots}
                      onclick={handleTimeSelect}
                    />
                  )}
                  {timeSlots.time_slots.length === 0 && (
                    <ThemedText
                      style={{
                        marginTop: 20,
                        opacity: 0.6,
                        textAlign: "center",
                        fontStyle: "italic",
                        fontSize: 15,
                      }}
                    >
                      Aucun créneau disponible pour cette date.
                    </ThemedText>
                  )}
                </>
              )}
            </View>
          )}
        </View>
      </ThemedScrollView>

      {/* Action Button */}
      {selectedHeure && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
          <ThemeButton
            name="Continuer"
            onPress={handleConfirm}
            iconName="arrow-forward"
            loader={isSubmitting}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    width: "100%",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  doctorName: {
    fontSize: 22,
    position: "absolute",
    left: 20,
    bottom: 20,
    color: "#fff",
  },
  backButton: {
    position: "absolute",
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  heartButton: {
    position: "absolute",
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 16,
    opacity: 0.6,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "700",
  },
  timeSlotSection: {
    marginTop: 10,
    gap: 10,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "transparent",
  },
});

export default DetailScreen;
