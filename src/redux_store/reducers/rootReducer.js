import { combineReducers } from "redux";
import shoeSizes from "./shoeSizes";
import requestHasError from "./requestHasError";

const appReducer = combineReducers({
  shoeSizes,
  requestHasError
});

const rootReducer = (state, action) => {
  if (action.type === "FETCH_FAILURE") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
