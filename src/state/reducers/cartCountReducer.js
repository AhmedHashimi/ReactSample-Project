const cartCount = (count = 0, action) => {
  switch (action.type) {
    case "changeCount":
      console.log(action.payload);
      return (count = action.payload);
    default:
      return count;
  }
};
export default cartCount;
