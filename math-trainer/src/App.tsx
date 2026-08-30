import { useState } from 'react';

import HomePage from './pages/HomePage';
import TrainerPage from './pages/TrainerPage';
import {
  exerciseRegistry,
} from './exercises/registry';
const subtractionExercise =
  exerciseRegistry[
    'subtraction-crossing-20'
  ];

import './App.css';

type Page =
  | 'home'
  | 'subtraction';

function App() {
  const [page, setPage] =
    useState<Page>('home');

  if (page === 'subtraction') {
    return (
    <TrainerPage
      exerciseModule={
        subtractionExercise
      }
      onBack={() => setPage('home')}
    />
    );
  }

  return (
    <HomePage
      onStartSubtraction={() =>
        setPage('subtraction')
      }
    />
  );
}

export default App;