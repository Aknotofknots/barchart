import React, { Component } from "react";
import { connect } from "react-redux";
import StackedBarChart from "./StackedBarChart";
import SmallScreenNotice from "./SmallScreenNotice";
import PaginationButton from "./PaginationButton";
import ErrorView from "./ErrorView";

import {
  mapStateToProps,
  mapDispatchToProps
} from "../redux_store/storeMapping";
require("dotenv").config();

class App extends Component {
  state = {
    clicked: false
  };

  handlePagination = () => {
    this.setState({
      clicked: !this.state.clicked
    });

    this.state.clicked
      ? this.props.actions.addShoeSizesAsync()
      : this.props.actions.addSubsequentShoeSizesAsync(
          this.props.shoeSizes.nextPage
        );
  };

  render() {
    const { sizes } = this.props.shoeSizes;
    const requestHasError = this.props.requestHasError;
    const { addShoeSizesAsync } = this.props.actions;
    const nextPage = this.props.shoeSizes.nextPage;
    const title = [this.props.shoeSizes.system, this.props.shoeSizes.gender];

    return (
      <section className="bar-chart">
        {requestHasError ? (
          <ErrorView addShoeSizesAsync={addShoeSizesAsync} />
        ) : (
          <StackedBarChart
            title={title}
            sizes={sizes}
            addShoeSizesAsync={addShoeSizesAsync}
          />
        )}
        <SmallScreenNotice />
        {requestHasError ? null : (
          <PaginationButton handlePagination={this.handlePagination} />
        )}
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
