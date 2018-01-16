import React, { Component } from "react";
import { connect } from "react-redux";

//custom imports
import StackedBarChart from "./StackedBarChart";
import {
  mapStateToProps,
  mapDispatchToProps
} from "../redux_store/store_mapping";

//environment variables
require("dotenv").config();

class App extends Component {
  render() {
    const { sizes } = this.props.shoeSizes;
    const nextPage = this.props.shoeSizes.nextPage;
    const title = [this.props.shoeSizes.system, this.props.shoeSizes.gender];
    const {
      addShoeSizesAsync,
      addSubsequentShoeSizesAsync
    } = this.props.actions;

    return (
      <StackedBarChart
        title={title}
        nextPage={nextPage}
        sizes={sizes}
        addShoeSizesAsync={addShoeSizesAsync}
        addSubsequentShoeSizesAsync={addSubsequentShoeSizesAsync}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);