import { ADD_SHOE_SIZES, ADD_SUBSEQUENT_SHOE_SIZES } from "./action_types";
import config from "../../config/config";
import axios from "axios";
import shoe_sizes from "../reducers/shoe_sizes";

const getShoeSizes = () => {
  const userName = process.env.REACT_APP_USERNAME;
  const passWord = process.env.REACT_APP_PASSWORD;

  const request = axios.create({
    baseURL: config.url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${window.btoa(`${userName}:${passWord}`)}`
    }
  });

  return request.get("sizingsample");
};

const getSubsequentShoeSizes = nextPage => {
  const userName = process.env.REACT_APP_USERNAME;
  const passWord = process.env.REACT_APP_PASSWORD;

  const request = axios.create({
    baseURL: config.url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${window.btoa(`${userName}:${passWord}`)}`
    }
  });

  return request.get(`sizingsample?page=${nextPage}`);
};

//action creators
const addShoeSizes = sizes => ({
  type: ADD_SHOE_SIZES,
  sizes
});

const addSubsequentShoeSizes = sizes => {
  return {
    type: ADD_SUBSEQUENT_SHOE_SIZES,
    sizes
  };
};

const addShoeSizesAsync = () => {
  return dispatch => {
    getShoeSizes()
      .then(shoeSizes => shoeSizes)
      .then(shoeSizes => {
        return dispatch(addShoeSizes(shoeSizes.data));
      })
      .catch(err => {
        console.log("Error", err.message);
      });
  };
};

const addSubsequentShoeSizesAsync = nextPage => {
  return dispatch => {
    getSubsequentShoeSizes(nextPage)
      .then(shoeSizes => shoeSizes)
      .then(shoeSizes => dispatch(addSubsequentShoeSizes(shoeSizes.data)))
      .catch(err => {
        console.log("Error", err.message);
      });
  };
};

export { addShoeSizesAsync, addSubsequentShoeSizesAsync };
