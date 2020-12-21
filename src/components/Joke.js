import React, { Component } from "react";
import "../style/Joke.css";

export default class Joke extends Component {
  render() {
    return (
      <div>
        <p>{this.props.content}</p>
      </div>
    );
  }
}
