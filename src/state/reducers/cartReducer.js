const cartReducer = (cart = [], action) => {
  switch (action.type) {
    case "addToCart":
      return [...cart, action?.payload];
    case "removeFromCart":
      return [...action?.payload];
    default:
      return cart;
  }
};

export default cartReducer;
