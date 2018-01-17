import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/root_reducer";

//create store with middleware
const storeEnhancer = compose(
  applyMiddleware(thunk)
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer, storeEnhancer);

export default store;
