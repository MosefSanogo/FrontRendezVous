import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface DateItem {
  id: string;
  date: Date;
}

const DAYS_TO_LOAD = 30;

// 🔹 Générer dates à partir d'une date donnée
const generateDatesFrom = (startDate: Date, count: number): DateItem[] => {
  const dates: DateItem[] = [];

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    dates.push({
      id: `${startDate.getTime()}-${i}`,
      date,
    });
  }

  return dates;
};

// 🔹 Format date
const formatDate = (date: Date) => {
  return {
    day: date.toLocaleDateString("fr-FR", { weekday: "short" }),
    number: date.getDate(),
  };
};

const DateSelector = ({
  onclick,
}: {
  onclick: (id: string, date: Date) => void;
}) => {
  const today = new Date();

  const [dates, setDates] = useState<DateItem[]>(
    generateDatesFrom(today, DAYS_TO_LOAD),
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  // 🔥 Charger plus de dates (effet infini)
  const loadMoreDates = () => {
    const lastDate = dates[dates.length - 1].date;

    const nextStart = new Date(lastDate);
    nextStart.setDate(lastDate.getDate() + 1);

    const moreDates = generateDatesFrom(nextStart, DAYS_TO_LOAD);

    setDates((prev) => [...prev, ...moreDates]);
  };

  const renderItem = ({ item }: { item: DateItem }) => {
    const isSelected =
      selectedDate?.toDateString() === item.date.toDateString();

    const { day, number } = formatDate(item.date);

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDate(item.date);
          onclick(item.id, item.date);
        }}
        style={[styles.dateItem, isSelected && styles.selectedDateItem]}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedText]}>
          {day}
        </Text>

        <Text style={[styles.dateText, isSelected && styles.selectedText]}>
          {number}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={loadMoreDates}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {},

  dateItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    width: 60,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  selectedDateItem: {
    backgroundColor: "#000",
  },

  dayText: {
    fontSize: 12,
    color: "#666",
    textTransform: "capitalize",
  },

  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  selectedText: {
    color: "#fff",
  },
});
