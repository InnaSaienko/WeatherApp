import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong: {this.state.error}</h2>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
