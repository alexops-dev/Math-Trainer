import type {ExerciseModule,} from './types';
import {subtractionCrossing20} from './subtraction-crossing-20';
import {additionCrossing20} from './addition-crossing-20';

export const exerciseRegistry: Record<
  string,
  ExerciseModule
> = {
  [subtractionCrossing20.id]:
    subtractionCrossing20,
  [additionCrossing20.id]:
    additionCrossing20,
};