export const generateOrderNumber = () => {
  // const date = new Date()
  //   .toISOString()
  //   .slice(0, 10)
  //   .replace(/-/g, "");

   const random = Math.floor(Math.random() * 101); 

  return `${random}`;
};
