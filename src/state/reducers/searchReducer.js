const searchReducer = (search = [], action) => {
  switch (action.type) {
    case "getSearch":
      return action?.payload;
    case "removeSearch":
      return action?.payload;
    default:
      return search;
  }
};

export default searchReducer;
