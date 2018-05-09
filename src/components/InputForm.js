import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

import Error from "./Error";

class InputForm extends Component {
  state = {
    nameErrorMsg: "",
    dobErrorMsg: "",
    showNameError: false,
    showDobError: false,
    entered: false
  };

  charToVal = {};

  handleDobFocus = e => {
    e.target.type = "date";
  };

  handleDobBlur = e => {
    e.target.type = "text";
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, dob } = this.props;

    if (!this.validateInput(name)) {
      return;
    } else {
      this.setState({ nameErrorMsg: "", dobErrorMsg: "" });
    }

    const numberTypes = {
      destiny: this.calculateDestiny(name),
      lifePath: this.calculateLifePath(dob),
      personality: this.calculatePersonality(name),
      soulUrge: this.calculateSoulUrge(name)
    };

    this.updateNumberTypes(numberTypes);

    // if (save.checked) {
    //   localStorage.setItem("name", nameValue.trim());
    //   localStorage.setItem("birthDate", date.value);
    // } else {
    //   localStorage.clear();
    // }

    // Object.keys(numberTypesMap).forEach(numberType => {
    //   numberTypesMap[numberType].innerHTML = "";
    //   numberTypesMap[numberType].classList.remove("show");
    // });

    // const delayDuration = 500;

    // numberTypes.forEach((numberType, index) => {
    //   const numberTypeName = convertClassNameToCamelCase(numberType.className);
    //   const numberTypeFunc = numberTypeCalculators[numberTypeName];
    //   const funcArg =
    //     numberTypeName !== "lifePath" ? nameValue.toLowerCase() : date.value;
    //   const resultText = numberType.className.split("-");

    //   setTimeout(() => {
    //     numberTypesMap[numberTypeName].classList.add("show");
    //     numberTypesMap[numberTypeName].innerHTML = `Your ${upperCaseFirstLetter(
    //       resultText
    //     )} number is&nbsp;<a id=${index + 1} href="${
    //       numberTypeLinks[numberTypeName]
    //     }" target="_blank" >${numberTypeFunc(funcArg)}</a>`;

    //     setTimeout(() => {
    //       document.getElementById(index + 1).classList.add("highlight");
    //     }, delayDuration + 250);
    //   }, delayDuration * index);
    // });

    // scrollToResults();
  };

  validateInput = fullname => {
    let isValid = true;
    const { dob } = this.props;
    const names = fullname.trim().split(/ +/g);

    const areNamesValid = names.every(name => {
      return name.match(/[a-zA-Z]+/, "gi");
    });

    if (!fullname) {
      this.setState({
        nameErrorMsg: "Please enter a name",
        showNameError: true
      });
      isValid = false;
    } else if (!areNamesValid) {
      this.setState({
        nameErrorMsg: "Please enter a valid name",
        showNameError: true
      });
      isValid = false;
    } else {
      this.setState({
        nameErrorMsg: "",
        showNameError: false
      });
    }

    if (!dob) {
      this.setState({
        dobErrorMsg: "Please enter a birth date",
        showDobError: true
      });
      isValid = false;
    } else {
      this.setState({ dobErrorMsg: "", showDobError: false });
    }

    if (!isValid) {
      return false;
    }

    const [year, month, day] = dob.split("-");
    const yearRegExp = new RegExp(/^\d{4}$/, "g");
    const monthAndDayRegExp = new RegExp(/^\d{2}$/, "g");

    const isValidYear = year.match(yearRegExp);
    const isValidMonth = month.match(monthAndDayRegExp);
    const isValidDay = day.match(monthAndDayRegExp);

    if (!isValidYear || !isValidMonth || !isValidDay) {
      isValid = false;
    }

    return isValid;
  };

  calculateDestiny = fullName => {
    const names = fullName.toLowerCase().split(" ");

    let result = names.reduce((total, name) => {
      let sum = 0;
      for (let i = 0; i < name.length; i++) {
        sum += this.charToVal[name.charAt(i)];
      }
      return this.reduceNumber(sum) + total;
    }, 0);

    return this.reduceNumber(result);
  };

  calculateLifePath = dob => {
    const [year, month, day] = dob.split("-");
    const sum = parseInt(year, 10) + parseInt(month, 10) + parseInt(day, 10);
    return this.reduceNumber(sum);
  };

  calculateSoulUrge = fullName => {
    const regexp = /[aeiou]/gi;

    if (!fullName.toLowerCase().match(regexp)) {
      return 0;
    }

    const result = fullName
      .toLowerCase()
      .match(regexp)
      .reduce((total, letter) => total + this.charToVal[letter], 0);

    return this.reduceNumber(result);
  };

  calculatePersonality = fullName => {
    const regexp = /[^aeiou\s]/gi;

    if (!fullName.toLowerCase().match(regexp)) {
      return 0;
    }

    const result = fullName
      .toLowerCase()
      .match(regexp)
      .reduce((total, letter) => total + this.charToVal[letter], 0);

    return this.reduceNumber(result);
  };

  reduceNumber = num => {
    if (num < 10 || num === 11 || num === 22 || num === 33) {
      return num;
    }

    let digit = num;
    num = 0;
    while (digit !== 0) {
      num += digit % 10;
      digit = Math.floor(digit / 10);
    }

    return this.reduceNumber(num);
  };

  updateName = e => {
    this.props.updateName(e.target.value);
  };

  updateDob = e => {
    this.props.updateDob(e.target.value);
  };

  updateSave = e => {
    // this.props.updateDob(e.target.value);
  };

  updateNumberTypes = numberTypes => {
    this.props.updateNumberTypes(numberTypes);
  };

  render() {
    const {
      showNameError,
      showDobError,
      nameErrorMsg,
      dobErrorMsg
    } = this.state;

    for (let i = 0; i < 26; i++) {
      this.charToVal[String.fromCharCode("a".charCodeAt(0) + i)] = i % 9 + 1;
    }

    return (
      <form className="main-form" onSubmit={this.handleSubmit}>
        <h1>Numerology</h1>
        <input
          type="text"
          name="name"
          placeholder="Please enter your name"
          onChange={this.updateName}
        />

        <CSSTransition
          in={showNameError}
          classNames="error"
          timeout={{ enter: 500, exit: 500 }}
        >
          {state => {
            return <Error errorMsg={nameErrorMsg} />;
          }}
        </CSSTransition>

        <input
          type="text"
          className="dob"
          placeholder="Please enter Date of Birth"
          onFocus={this.handleDobFocus}
          onBlur={this.handleDobBlur}
          onChange={this.updateDob}
        />
        <CSSTransition
          in={showDobError}
          classNames="error"
          timeout={{ enter: 500, exit: 500 }}
          mountOnEnter
        >
          {state => {
            return <Error errorMsg={dobErrorMsg} />;
          }}
        </CSSTransition>
        <label htmlFor="save">
          Remember Input
          <input
            type="checkbox"
            name="save-data"
            id="save"
            onChange={this.updateSave}
          />
        </label>
        <button>Calculate</button>
      </form>
    );
  }
}

export default InputForm;
