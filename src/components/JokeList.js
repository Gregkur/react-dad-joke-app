import React, { Component } from "react";
import Joke from "./Joke";
import "../style/JokeList.css";
import emoji from "../emoji.png";
import { v4 as uuid } from "uuid";
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
          jokeList.push({ joke: response.data.joke, votes: 0, id: uuid() });
        });
    }
    this.setState({ jokes: jokeList });
  }

  componentDidMount() {
    this.fetchJokes();
  }
  handleVote(id, delta) {
    this.setState((st) => ({
      jokes: st.jokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ),
    }));
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
              <Joke
                content={j.joke}
                votes={j.votes}
                key={j.id}
                upvote={() => this.handleVote(j.id, 1)}
                downvote={() => this.handleVote(j.id, -1)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
