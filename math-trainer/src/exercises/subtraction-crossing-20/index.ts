import subtractionConfig from '../../config/subtraction-crossing-20.json';

import { generateSubtractionExercise } from '../../math/generators/subtraction';

import type {
  ExerciseConfig,
} from '../../math/types';

import type {
  ExerciseModule,
} from '../types';

import SubtractionHint from './SubtractionHint';

const config =
  subtractionConfig as ExerciseConfig;

export const subtractionCrossing20: ExerciseModule =
  {
    id: config.id,

    title: config.title,

    createExercise: () =>
      generateSubtractionExercise(
        config.generator
      ),

    HintComponent: SubtractionHint,

    session: {
      questions:
        config.session.questions,
    },

    defaultMode: 'learning',
  };