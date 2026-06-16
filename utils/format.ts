export const formatPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/.{1,2}/g);

  return match ? match.join(" ") : "";
};
