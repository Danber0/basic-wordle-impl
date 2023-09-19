import React from "react";
import "./App.css";

interface LineProps {
  guess: string;
  solution: string;
  isSubmittedGuess: boolean;
}

const LETTERS_COUNT = 5;

function App() {
  const [guesses, setGuesses] = React.useState<string[]>(Array(6).fill(null));
  const [solution, setSolution] = React.useState("hello");
  const [currentGuess, setCurrentGuess] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isGameOver, setIsGameOver] = React.useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isGameOver) return;

    if (e.key.match(/^[a-z]$/) && currentGuess.length < LETTERS_COUNT) {
      setCurrentGuess((typed) => typed + e.key);
    }

    if (e.key === "Enter") {
      if (currentGuess.length !== LETTERS_COUNT) return;

      const newGuess = [...guesses];
      newGuess[currentIndex] = currentGuess;
      setGuesses(newGuess);
      setCurrentIndex((prevState) => prevState + 1);
      setCurrentGuess("");

      if (solution === currentGuess) {
        setIsGameOver(true);
      }
    }

    if (e.key === "Backspace") {
      setCurrentGuess((typed) => typed.slice(0, -1));
    }
  };

  return (
    <div className="board">
      {isGameOver && "WON!"}

      <input className="input" onKeyDown={handleKeyPress} />
      {guesses.map((guess, index) => {
        return (
          <Line
            key={index}
            guess={index === currentIndex ? currentGuess : guess}
            isSubmittedGuess={index !== currentIndex && guess !== null}
            solution={solution}
          />
        );
      })}
    </div>
  );
}

export const Line = ({ guess, solution, isSubmittedGuess }: LineProps) => {
  const lines = [];

  for (let i = 0; i < LETTERS_COUNT; i++) {
    let className = "";
    const char = guess?.[i];

    if (isSubmittedGuess) {
      if (char === solution[i]) {
        className = "correct";
      } else if (solution?.includes(char)) {
        className = "close";
      } else {
        className = "incorrect";
      }
    }

    lines.push(
      <div key={i} className={`line ${className}`}>
        {char?.toUpperCase()}
      </div>,
    );
  }

  return <div className="lines">{lines}</div>;
};

export default App;
