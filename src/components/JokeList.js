import React, { Component } from "react";
import Joke from "./Joke";
import "../style/JokeList.css";
const axios = require("axios").default;

export default class JokeList extends Component {
  constructor(props) {
    super(props);
    this.fetchJokes = this.fetchJokes.bind(this);
  }
  //should fetch jokes through axios
  fetchJokes() {
    const url = "https://icanhazdadjoke.com/";
    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response, "success");
      })
      .catch(function (error) {
        // handle error
        console.log(error, "failed to fetch");
      })
      .then(function () {
        // always executed
      });
  }

  componentDidMount() {
    this.fetchJokes();
  }
  render() {
    return (
      <div>
        <h1>Dad Jokes</h1>
        <ul>
          <li>
            <Joke />
          </li>
        </ul>
      </div>
    );
  }
}
