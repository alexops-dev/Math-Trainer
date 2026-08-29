import { useState } from 'react';

import subtractionConfig from './config/subtraction-crossing-20.json';

import { generateSubtractionExercise } from './math/generators/subtraction';

import type {
  Exercise,
  ExerciseConfig,
} from './math/types';

import './App.css';

const config = subtractionConfig as ExerciseConfig;

function createExercise(): Exercise {
  return generateSubtractionExercise(config.generator);
}

function App() {
  const [exercise, setExercise] =
    useState<Exercise>(createExercise());

  const nextExercise = () => {
    setExercise(createExercise());
  };

  return (
    <main>
      <h1>Math Trainer</h1>

      <h2>{config.title}</h2>

      <div>
        {exercise.left} {exercise.operator} {exercise.right} = ?
      </div>

      <button onClick={nextExercise}>
        Neue Aufgabe
      </button>
    </main>
  );
}

export default App;