// configureStore.js
// Create store and combine reducers
// Dont have a comfortable understanding of this file.

import { createStore, applyMiddleware, combineReducers } from "redux";
import {createLogger } from "redux-logger";
import {default as reduxThunk} from "redux-thunk";
import login from "./modules/login"

// Imported Reducers to be combined
import resourceReducer from "./modules/resource";


const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  reduxThunk,
  loggerMiddleware
)(createStore);

const reducer = combineReducers({
  login,
  
});

const configureStore = (initialState) =>
  createStoreWithMiddleware(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default configureStore;