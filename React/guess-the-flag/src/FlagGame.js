import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FlagGame.css';

const FlagOption = ({country, onGuess}) => (
  <div>
    <input 
      type="radio"
      id={country.name}
      name="country"
      value={country.name}
      onClick={(e) => onGuess(e.target.value)}
    />
    <label htmlFor={country.name}>
      {country.name}
    </label>
  </div>
)

FlagOption.propTypes = {
  country: PropTypes.object.isRequired,
  onGuess: PropTypes.func.isRequired
}

const FlagDisplay = ({answer}) => (
  <img 
    src={answer.flag} 
    alt={`{answer.name} flag`} 
  />
);

FlagDisplay.propTypes = {
  answer: PropTypes.object.isRequired
}

const GuessButton = ({hasGuessed, onSubmit, onReset}) => {
  const onButtonClick = hasGuessed ? onReset : onSubmit;
  const buttonText = hasGuessed ? "NEXT" : "GUESS";
  return (
    <button 
      type="button" 
      onClick={() => {onButtonClick()}}
    >
      {buttonText}
    </button>
  );
}

GuessButton.propTypes = {
  hasGuessed: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

class FlagGame extends Component {
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
    const {hasGuessed, isCorrect, countries, answer} = this.state;
    let view = <div className="flag-game">Loading game...</div>;

    if (countries && countries.length > 0) {
      const flagOptions = hasGuessed ? 
        <p>{`${isCorrect ? "Correct!" : "Incorrect! Correct Answer:"} ${answer.name}`}</p> :
        countries.map(country => (
        <FlagOption 
          key={country.name} 
          country={country}
          onGuess={this.handleGuess}
        />
      ));

      view = 
        <div className="flag-game">
          <div className="flag-options">
            {flagOptions}
            <GuessButton 
              hasGuessed={hasGuessed} 
              onSubmit={this.handleSubmit}
              onReset={this.handleReset}
            />
          </div>
          <FlagDisplay answer={answer} />
        </div>
    }

    return (
      <div className="wrapper">
        {view}
      </div>
    );
  }
}

export default FlagGame;