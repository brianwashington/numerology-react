import React, { Component } from "react";

import InputForm from "./components/InputForm";
import Results from "./components/Results";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="signature">
          <small>&copy;Brian Washington</small>
        </div>

        <InputForm />

        <Results />
      </div>
    );
  }
}

export default App;
