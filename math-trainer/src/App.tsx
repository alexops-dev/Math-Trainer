import { useState } from 'react';

import subtractionConfig from './config/subtraction-crossing-20.json';

import { generateSubtractionExercise } from './math/generators/subtraction';

import type {
  Exercise,
  ExerciseConfig,
} from './math/types';

import NumberPad from './components/NumberPad';
import Hint from './components/Hint';

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

  const [showHint, setShowHint] =
    useState(false);

  const [questionNumber, setQuestionNumber] =
    useState(1);

  const [correctAnswers, setCorrectAnswers] =
    useState(0);

  const [streak, setStreak] =
    useState(0);

  const handleNumberClick = (number: number) => {
    if (feedback === 'correct') {
      return;
    }

    setUserAnswer(String(number));
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
      setCorrectAnswers((current) => current + 1);
      setStreak((current) => current + 1);
    } else {
      setFeedback('wrong');
      setStreak(0);
    }
  };

  const nextExercise = () => {
    setExercise(createExercise());

    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);

    setQuestionNumber(
      (current) => current + 1
    );
  };

  const toggleHint = () => {
    setShowHint((current) => !current);
  };

  return (
    <main className="app">
      <div className="trainer-card">
        <h1>Math Trainer</h1>

        <p className="level-title">
          {config.title}
        </p>

        <div className="session-info">
          <span>
            Aufgabe {questionNumber} von {config.session.questions}
          </span>

          {streak > 0 && (
            <span>
              🔥 {streak}
            </span>
          )}
        </div>

        <div className="progress-bar">
          <div
            className="progress-value"
            style={{
              width: `${
                ((questionNumber - 1) /
                  config.session.questions) *
                100
              }%`,
            }}
          />
        </div>

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

        {feedback !== 'correct' && (
          <button
            className="hint-button"
            onClick={toggleHint}
          >
            💡 {showHint ? 'Tipp schließen' : 'Tipp'}
          </button>
        )}

        {showHint && (
          <Hint
            left={exercise.left}
            right={exercise.right}
          />
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

        <div className="score">
          Richtig: {correctAnswers}
        </div>
      </div>
    </main>
  );
}

export default App;