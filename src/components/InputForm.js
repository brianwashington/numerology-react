import React, { Component } from "react";
import Error from "./Error";

class InputForm extends Component {
  handleDobFocus = e => {
    e.target.type = "date";
  };

  handleDobBlur = e => {
    e.target.type = "text";
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form className="main-form" onSubmit={this.handleSubmit}>
        <h1>Numerology</h1>
        <input type="text" name="name" placeholder="Please enter your name" />
        <div className="name-error error" />

        <Error errorMsg="Please enter a name" />

        <input
          type="text"
          className="dob"
          placeholder="Please enter Date of Birth"
          onFocus={this.handleDobFocus}
          onBlur={this.handleDobBlur}
        />
        <div className="dob-error error" />

        <label htmlFor="save">
          Remember Input
          <input type="checkbox" name="save-data" id="save" />
        </label>
        <button>Calculate</button>
      </form>
    );
  }
}

export default InputForm;
