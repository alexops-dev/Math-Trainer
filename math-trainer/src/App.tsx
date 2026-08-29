import { useState } from 'react';

import subtractionConfig from './config/subtraction-crossing-20.json';

import { generateSubtractionExercise } from './math/generators/subtraction';

import type {
  Exercise,
  ExerciseConfig,
} from './math/types';

import NumberPad from './components/NumberPad';

import './App.css';

const config = subtractionConfig as ExerciseConfig;

function createExercise(): Exercise {
  return generateSubtractionExercise(config.generator);
}

type Feedback = 'correct' | 'wrong' | null;

function App() {
  const [exercise, setExercise] =
    useState<Exercise>(createExercise());

  const [userAnswer, setUserAnswer] = useState('');

  const [feedback, setFeedback] =
    useState<Feedback>(null);

  const handleNumberClick = (number: number) => {
    if (feedback === 'correct') {
      return;
    }

    setUserAnswer((current) => current + number);
    setFeedback(null);
  };

  const handleClear = () => {
    setUserAnswer('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (userAnswer === '') {
      return;
    }

    const numericAnswer = Number(userAnswer);

    if (numericAnswer === exercise.answer) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  const nextExercise = () => {
    setExercise(createExercise());
    setUserAnswer('');
    setFeedback(null);
  };

  return (
    <main className="app">
      <div className="trainer-card">
        <h1>Math Trainer</h1>

        <p className="level-title">
          {config.title}
        </p>

        <div className="exercise">
          <span>{exercise.left}</span>
          <span>{exercise.operator}</span>
          <span>{exercise.right}</span>
          <span>=</span>

          <div className="answer-box">
            {userAnswer || '?'}
          </div>
        </div>

        {feedback === 'correct' && (
          <div className="feedback correct">
            🎉 Richtig!
          </div>
        )}

        {feedback === 'wrong' && (
          <div className="feedback wrong">
            🤔 Versuch es noch einmal
          </div>
        )}

        <NumberPad
          onNumberClick={handleNumberClick}
          onClear={handleClear}
        />

        {feedback !== 'correct' && (
          <button
            className="primary-button"
            onClick={checkAnswer}
            disabled={userAnswer === ''}
          >
            Prüfen
          </button>
        )}

        {feedback === 'correct' && (
          <button
            className="primary-button"
            onClick={nextExercise}
          >
            Weiter
          </button>
        )}
      </div>
    </main>
  );
}

export default App;