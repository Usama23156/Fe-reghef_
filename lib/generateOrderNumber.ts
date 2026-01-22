export const generateOrderNumber = () => {
  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, ""); // YYYYMMDD

  const number = Math.floor(Math.random() * 101); // 0 → 100

  return {
    date,
    number,
  };
};
