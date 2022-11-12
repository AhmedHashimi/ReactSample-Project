const isLoading = (loading = false, action) => {
  switch (action.type) {
    case "isLoading":
      return (loading = action.payload);
    default:
      return loading;
  }
};
export default isLoading;
