import { groupByHour } from "@/utils/date";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TimeSlotGrid = ({
  date,
  slots,
  onclick,
}: {
  date: string;
  slots: any;
  onclick: (id: string, heure: string) => void;
}) => {
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const grouped = groupByHour(slots);
  const hours = Object.keys(grouped).sort();

  return (
    <View style={{ height: "auto" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {hours.map((hour) => (
            <View key={hour} style={styles.column}>
              {/* Heure */}

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {grouped[hour].map((slot: any) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  const isDisabled = slot.capacity_restant === 0;
                  const slotDate = new Date(date + "T" + slot.heure);
                  const now = new Date();
                  const nowPlus15 = new Date(now.getTime() + 15 * 60 * 1000);

                  // On veut: slotDate > now + 15 min
                  const isAfterNowPlus15 = slotDate > nowPlus15;

                  if (isAfterNowPlus15)
                    return (
                      <TouchableOpacity
                        key={slot.id}
                        disabled={isDisabled}
                        onPress={() => {
                          setSelectedSlot(slot);
                          onclick(slot.id, slot.heure);
                        }}
                        style={[
                          styles.slot,
                          isSelected && styles.selectedSlot,
                          isDisabled && styles.disabledSlot,
                        ]}
                      >
                        <Text
                          style={[
                            styles.slotText,
                            isSelected && styles.selectedText,
                            isDisabled && styles.disabledText,
                          ]}
                        >
                          {slot.heure.substring(0, 5)}
                        </Text>
                      </TouchableOpacity>
                    );
                })}
              </ScrollView>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TimeSlotGrid;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },

  column: {
    width: 80,
    marginRight: 10,
  },

  hourText: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
  },

  slot: {
    paddingVertical: 8,
    marginBottom: 6,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  selectedSlot: {
    backgroundColor: "#000",
  },

  disabledSlot: {
    backgroundColor: "#ccc",
  },

  slotText: {
    fontSize: 14,
    color: "#000",
  },

  selectedText: {
    color: "#fff",
  },

  disabledText: {
    color: "#888",
  },
});
