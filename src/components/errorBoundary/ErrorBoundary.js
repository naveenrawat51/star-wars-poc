import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("error: ", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h4 style={{ textAlign: "center" }}>Something went wrong!!</h4>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
