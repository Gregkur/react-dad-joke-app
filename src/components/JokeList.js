import React, { Component } from "react";
import Joke from "./Joke";
import "../style/JokeList.css";
import emoji from "../emoji.png";
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
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img alt="laughing emoji" src={emoji} />
          <button>Load more!</button>
        </div>
        <ul className="JokeList-jokes">
          {this.state.jokes.map((j) => {
            return (
              <li>
                <Joke content={j} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
