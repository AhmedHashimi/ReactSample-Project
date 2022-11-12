export const searchQuery = (queryResult) => {
  return (dispatch) => {
    dispatch({ type: "getSearch", payload: queryResult });
  };
};
export const removeQuery = () => {
  return (dispatch) => {
    dispatch({ type: "removeSearch", payload: [] });
  };
};
