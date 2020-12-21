import React, { Component } from "react";
import Joke from "./Joke";
import "../style/JokeList.css";
const axios = require("axios").default;

export default class JokeList extends Component {
  static defaultProps = {
    numJokes: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
    };
    this.fetchJokes = this.fetchJokes.bind(this);
  }
  //should fetch jokes through axios
  async fetchJokes() {
    const url = "https://icanhazdadjoke.com/";
    let jokeList = [];
    while (jokeList.length < this.props.numJokes) {
      await axios
        .get(url, { headers: { Accept: "application/json" } })
        .then(function (response) {
          jokeList.push(response.data.joke);
        });
    }
    this.setState({ jokes: jokeList });
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
