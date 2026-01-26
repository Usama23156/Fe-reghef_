
export interface product {
  id: number;
  image: string;
  name_ar: string;
  name_en: string;
  price: number;
  box_size?: number | null; // null للسندوتشات الفردية
  category_id:string;
}