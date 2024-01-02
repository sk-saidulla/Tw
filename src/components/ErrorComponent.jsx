import React from "react";

const ErrorComponent = (error) => {
  return <p style={{ color: "red" }}>Internal Server Error</p>;
};

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: { message: "", stack: "" },
    info: { componentStack: "" },
  };

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    return hasError ? <ErrorComponent error /> : children;
  }
}
export default ErrorBoundary;
