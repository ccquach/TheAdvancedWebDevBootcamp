import React from 'react';
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

const FlagDisplay = ({answer}) => (
  <img 
    src={answer.flag} 
    alt={`{answer.name} flag`} 
  />
);

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

const FlagGame = ({countries, answer, hasGuessed, isCorrect, onGuess, onSubmit, onReset}) => {
  const flagOptions = hasGuessed ? 
    <p>{`${isCorrect ? "Correct!" : "Incorrect! Correct Answer:"} ${answer.name}`}</p> :
    countries.map(country => (
    <FlagOption 
      key={country.name} 
      country={country}
      onGuess={onGuess}
    />
  ));

  return (
    <div className="flag-game">
      <div className="flag-options">
        {flagOptions}
        <GuessButton 
          hasGuessed={hasGuessed} 
          onSubmit={onSubmit}
          onReset={onReset}
        />
      </div>
      <FlagDisplay answer={answer} />
    </div>
  );
}

FlagGame.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  answer: PropTypes.object.isRequired,
  hasGuessed: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  onGuess: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

export default FlagGame;