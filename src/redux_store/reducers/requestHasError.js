const requestHasError = (state = false, action) => {
  switch (action.type) {
    case "FETCH_FAILURE":
      return true;
    case "FETCH_SUCCESS":
      return false;
    default:
      return state;
  }
};
export default requestHasError;
