import React, { Component } from "react";
import "../style/Joke.css";

export default class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up"></i>
          <span>{this.props.votes}</span>
          <i className="fas fa-arrow-down"></i>
        </div>
        <div className="Joke-text">{this.props.content}</div>
      </div>
    );
  }
}
