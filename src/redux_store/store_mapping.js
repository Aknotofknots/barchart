import { bindActionCreators } from "redux";
import * as actions from "./actions/action_creators";

export const mapStateToProps = state => ({
  shoeSizes: state.shoe_sizes
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});
