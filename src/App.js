import React, { Component } from "react";

import InputForm from "./components/InputForm";

import "./App.css";

class App extends Component {
  state = {
    name: "",
    dob: "",
    numberTypes: {
      destiny: 0,
      lifePath: 0,
      personality: 0,
      soulUrge: 0
    }
  };

  // convertClassNameToCamelCase = str => {
  //   const words = str.split("-");

  //   return words.reduce((fullString, currentWord, index) => {
  //     if (index > 0) {
  //       return (
  //         fullString +
  //         currentWord.charAt(0).toUpperCase() +
  //         currentWord.slice(1)
  //       );
  //     }
  //     return currentWord;
  //   }, "");
  // };

  upperCaseFirstLetter = str => {
    const index = str.search(/[A-Z]/);
    let text = "";

    if (index !== -1) {
      text +=
        str.charAt(0).toUpperCase() +
        str.slice(1, index) +
        " " +
        str.slice(index);
    } else {
      text += str.charAt(0).toUpperCase() + str.slice(1);
    }

    return text;
  };

  updateName = name => {
    this.setState({ name });
  };

  updateDob = dob => {
    this.setState({ dob });
  };

  updateNumberTypes = numberTypes => {
    this.setState({ numberTypes });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="signature">
          <small>&copy;Brian Washington</small>
        </div>

        <InputForm
          name={this.state.name}
          dob={this.state.dob}
          updateName={this.updateName}
          updateDob={this.updateDob}
          updateNumberTypes={this.updateNumberTypes}
        />

        {this.state.numberTypes.lifePath !== 0 ? (
          <ul className="numberTypes">
            {Object.keys(this.state.numberTypes).map(numberType => {
              return (
                <li key={numberType}>
                  Your {this.upperCaseFirstLetter(numberType)} number is{" "}
                  {this.state.numberTypes[numberType]}
                </li>
              );
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
