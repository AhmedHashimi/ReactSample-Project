export const isLoading = (loading) => {
  return (dispatch) => {
    dispatch({ type: "isLoading", payload: loading });
  };
};
