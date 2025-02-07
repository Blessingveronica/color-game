import React, { useState, useEffect } from 'react';
import './game.css';

const Game = () => {
  const colors = ['#ff5733', '#33ff57', '#3357ff', '#f1c40f', '#8e44ad', '#e74c3c'];
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [colorOptions, setColorOptions] = useState([]);

  // Function to generate a new game
  const generateNewGame = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    const randomColors = [...colors];
    randomColors.splice(Math.floor(Math.random() * colors.length), 1, randomColor);
    setColorOptions(shuffleArray(randomColors));
    setGameStatus('');
  };

  // Helper function to shuffle colors
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Check if the guess is correct
  const handleGuess = (selectedColor) => {
    if (selectedColor === targetColor) {
      setScore(score + 1);
      setGameStatus('Correct!');
    } else {
      setGameStatus('Wrong! Try Again.');
    }
  };

  useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);  // Add generateNewGame to the dependency array

  return (
    <div className="game-container">
      <div className="color-box" style={{ backgroundColor: targetColor }} data-testid="colorBox"></div>
      <div className="game-instructions" data-testid="gameInstructions">
        Guess the correct color!
      </div>
      <div className="color-options">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            data-testid="colorOption"
            className="color-option-button"
          />
        ))}
      </div>
      <div className="game-status" data-testid="gameStatus">
        {gameStatus}
      </div>
      <div className="score" data-testid="score">
        Score: {score}
      </div>
      <button className="new-game-button" onClick={generateNewGame} data-testid="newGameButton">
        New Game
      </button>
    </div>
  );
};

export default Game;
