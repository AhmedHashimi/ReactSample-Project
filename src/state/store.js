import { createStore, applyMiddleware } from "redux";
import joinedReducers from "./reducers/index.js";
import thunk from "redux-thunk";

export const store = createStore(joinedReducers, {}, applyMiddleware(thunk));
