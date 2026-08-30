import additionConfig from '../../config/addition-crossing-20.json';

import {
  generateAdditionExercise,
} from '../../math/generators/addition';

import type {
  AdditionExerciseConfig,
} from '../../math/types';

import type {
  ExerciseModule,
} from '../types';

import AdditionHint from './AdditionHint';

const config =
  additionConfig as AdditionExerciseConfig;

export const additionCrossing20: ExerciseModule =
  {
    id: config.id,

    title: config.title,

    createExercise: () =>
      generateAdditionExercise(
        config.generator
      ),

    HintComponent: AdditionHint,

    session: {
      questions:
        config.session.questions,
    },

    defaultMode: 'learning',
  };