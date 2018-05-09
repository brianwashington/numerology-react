import React, { Component } from "react";

class Results extends Component {
  render() {
    const { lifePath, soulUrge, destiny, personality } = this.props.numberTypes;

    return (
      <ul className="numberTypes">
        <li className="life-path">{lifePath || ""}</li>
        <li className="soul-urge">{soulUrge || ""}</li>
        <li className="destiny">{destiny || ""}</li>
        <li className="personality">{personality || ""}</li>
      </ul>
    );
  }
}

export default Results;
