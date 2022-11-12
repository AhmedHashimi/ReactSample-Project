import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import searchReducer from "./searchReducer";
import cartCount from "./cartCountReducer";
import isLoading from "./spinnerReducer";
const joinedReducers = combineReducers({
  cart: cartReducer,
  searchResult: searchReducer,
  count: cartCount,
  isLoading,
});
export default joinedReducers;
