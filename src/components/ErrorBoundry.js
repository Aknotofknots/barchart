import React, { Component } from "react";
import { ErrorBar } from "victory";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{ textAlign: "center" }}>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
