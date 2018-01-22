const shoeSizes = (state = {}, action) => {
  switch (action.type) {
    case "ADD_SHOE_SIZES":
      return {
        ...state,
        ...action.sizes.data[0],
        nextPage: action.sizes["next-page"]
      };
    case "ADD_SUBSEQUENT_SHOE_SIZES":
      return { ...state, ...action.sizes.data[0] };

    default:
      return state;
  }
};

export default shoeSizes;
