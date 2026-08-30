import type {
  ExerciseModule,
} from './types';

import {
  subtractionCrossing20,
} from './subtraction-crossing-20';

export const exerciseRegistry: Record<
  string,
  ExerciseModule
> = {
  [subtractionCrossing20.id]:
    subtractionCrossing20,
};