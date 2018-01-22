import {
  ADD_SHOE_SIZES,
  ADD_SUBSEQUENT_SHOE_SIZES,
  FETCH_FAILURE,
  FETCH_SUCCESS
} from "./actionTypes";
import config from "../../config/config";
import axios from "axios";

//action creators
const addShoeSizesFailure = () => ({ type: FETCH_FAILURE });
const addShoeSizesSuccess = () => ({ type: FETCH_SUCCESS });
const addShoeSizes = sizes => ({
  type: ADD_SHOE_SIZES,
  sizes
});
const addSubsequentShoeSizes = sizes => ({
  type: ADD_SUBSEQUENT_SHOE_SIZES,
  sizes
});

const addShoeSizesAsync = () => {
  return dispatch => {
    getShoeSizes()
      .then(shoeSizes => shoeSizes)
      .then(shoeSizes => {
        dispatch(addShoeSizesSuccess());
        dispatch(addShoeSizes(shoeSizes.data));
      })
      .catch(error => {
        dispatch(addShoeSizesFailure());
        console.log("Error in network request", error.response.data);
      });
  };
};

const addSubsequentShoeSizesAsync = nextPage => {
  return dispatch => {
    getSubsequentShoeSizes(nextPage)
      .then(shoeSizes => shoeSizes)
      .then(shoeSizes => {
        dispatch(addShoeSizesSuccess());
        dispatch(addSubsequentShoeSizes(shoeSizes.data));
      })
      .catch(error => {
        dispatch(addShoeSizesFailure());
        console.log("Error in network request", error.response.data);
      });
  };
};

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

export { addShoeSizesAsync, addSubsequentShoeSizesAsync };
