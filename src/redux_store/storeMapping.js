import { bindActionCreators } from "redux";
import * as actions from "./actions/actionCreators";

export const mapStateToProps = state => ({
  shoeSizes: state.shoeSizes,
  requestHasError: state.requestHasError
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});
