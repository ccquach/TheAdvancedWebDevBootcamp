import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import FlagGame from './FlagGame';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      countries: [],
      answer: {},
      guess: '',
      hasGuessed: false,
      isCorrect: false
    };

    this.setupGame = this.setupGame.bind(this);
    this.handleGuess = this.handleGuess.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const countriesUrl = 'https://restcountries.eu/rest/v2/all';

    fetch(countriesUrl)
      .then(this.handleErrors)
      .then(data => data.json())
      .then(countries => this.setupGame(countries))
      .catch(err => console.log(err));
  }

  handleErrors(res) {
    if (!res.ok) throw Error(res.status);
    return res;
  }

  setupGame(data) {
    // get four random countries
    const countries = [];
    while (countries.length < 4) {
      const randIdx = Math.floor(Math.random() * data.length);
      const country = data[randIdx];
      if (!countries.includes(country)) countries.push(country);
    }
    // select random country as answer
    const randIdx = Math.floor(Math.random() * countries.length);
    const answer = countries[randIdx];
    
    this.setState({
      data,
      countries,
      answer,
      guess: '',
      hasGuessed: false
    });
  }

  handleGuess(option) {
    this.setState({
      guess: option
    });
  }

  handleSubmit() {
    const hasGuessed = true;
    const {answer, guess} = this.state;
    if (!guess) return;

    const isCorrect = guess === answer.name;
    this.setState({
      hasGuessed,
      isCorrect
    });
  }

  handleReset() {
    const {data} = this.state;
    this.setupGame(data);
  }

  render() {
    let view = <div className="flag-game">Loading game...</div>;
    const {countries, answer, hasGuessed, isCorrect} = this.state;

    if (countries && countries.length > 0) {
      view = 
        <FlagGame 
          countries={countries} 
          answer={answer} 
          hasGuessed={hasGuessed}
          isCorrect={isCorrect}
          onGuess={this.handleGuess}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        />
    }

    return (
      <div className="App">
        <Navbar />
        {view}
      </div>
    );
  }
}

export default App;
