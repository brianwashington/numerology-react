import React, { Component } from "react";

class Error extends Component {
  componentDidMount() {
    console.log("mounted");
  }

  render() {
    return <div className="error-enter">{this.props.errorMsg}</div>;
  }
}

export default Error;
