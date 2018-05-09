import React, { Component } from "react";

class Error extends Component {
  render() {
    const { errorMsg } = this.props;

    return <div className="error">{errorMsg}</div>;
  }
}

export default Error;
