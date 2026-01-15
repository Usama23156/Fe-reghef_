interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  box_size?: number | null; // null للسندوتشات الفردية
}