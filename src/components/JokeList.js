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
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false,
    };
    this.fetchJokes = this.fetchJokes.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    this.setState(
      (st) => ({
        loading: false,
        jokes: [...st.jokes, ...jokeList],
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
    window.localStorage.setItem("jokes", JSON.stringify(jokeList));
  }

  componentDidMount() {
    if (this.state.length === 0) {
      this.fetchJokes();
    }
  }
  handleClick() {
    this.setState({ loading: true });
    this.fetchJokes();
  }
  handleVote(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((j) =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        ),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }
  render() {
    if (this.state.loading) {
      return (
        <div>
          <h1 className="JokeList-title">Loading</h1>
          <svg
            className="spinner"
            width="170px"
            height="170px"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="path"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              cx="33"
              cy="33"
              r="30"
            ></circle>
          </svg>
        </div>
      );
    }
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img alt="laughing emoji" src={emoji} />
          <button className="JokeList-getmore" onClick={this.handleClick}>
            Load more!
          </button>
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
