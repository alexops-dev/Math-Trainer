import type { ComponentType } from 'react';

import type {
  Exercise,
  TrainerMode,
} from '../math/types';

export interface ExerciseHintProps {
  left: number;
  right: number;
}

export interface ExerciseModule {
  id: string;
  title: string;

  createExercise: () => Exercise;

  HintComponent: ComponentType<ExerciseHintProps>;

  session: {
    questions: number;
  };

  defaultMode?: TrainerMode;
}