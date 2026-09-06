import { useState } from 'react';

import HomePage from './pages/HomePage';
import TrainerPage from './pages/TrainerPage';

import {
  exerciseRegistry,
} from './exercises/registry';

import './App.css';

function App() {
  const [
    selectedExerciseId,
    setSelectedExerciseId,
  ] = useState<string | null>(null);

  if (selectedExerciseId) {
    const exerciseModule =
      exerciseRegistry[
        selectedExerciseId
      ];

    return (
      <TrainerPage
        exerciseModule={
          exerciseModule
        }
        onBack={() =>
          setSelectedExerciseId(null)
        }
      />
    );
  }

  return (
    <HomePage
      onStartExercise={
        setSelectedExerciseId
      }
    />
  );
}

export default App;