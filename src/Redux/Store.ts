import { createStore,combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import cartReducers from "./Reducers/CartReducers";

const combinedReducers=combineReducers({cartReducers})

const store= createStore(combinedReducers,{},applyMiddleware(thunk))

export default store