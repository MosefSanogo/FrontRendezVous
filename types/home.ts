export interface HomeCardData {
  id: string | number;
  image: string;
  nom: string;
  category: string;
  ville: string;
  addresse: string;
}
export interface HomeCategoryData {
  id: string | number;
  name: string;
  icon: string; // ✅ typage correct, plus de 'as any'
}
