export const addToCart = (order) => {
  return (dispatch) => {
    dispatch({ type: "addToCart", payload: order });
  };
};
export const removeFromCart = (order) => {
  return (dispatch) => {
    dispatch({ type: "removeFromCart", payload: order });
  };
};
export const changeCount = (order) => {
  return (dispatch) => {
    dispatch({ type: "changeCount", payload: order });
  };
};
