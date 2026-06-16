export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("fr-FR", options);
};

export const formatTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleTimeString("fr-FR", options);
};

export const groupByHour = (slots: any) => {
  const grouped: any = {};
  slots.forEach((slot: any) => {
    const hour = slot.heure.split(":")[0];

    if (!grouped[hour]) {
      grouped[hour] = [];
    }
    if (slot.capacity_restante > 0) {
      grouped[hour].push(slot);
    }
  });

  return grouped;
};

export function compareHeureWithNow(heure: string): boolean {
  // Format attendu: "HH:MM"
  const [hStr, mStr] = heure.split(":");
  const h = Number(hStr);
  const m = Number(mStr);

  const now = new Date();
  const nowH = now.getHours();
  const nowM = now.getMinutes();

  // Convertir en minutes
  const minutesHeure = h * 60 + m;
  const minutesNow = nowH * 60 + nowM;
  return minutesHeure > minutesNow + 30;
}
