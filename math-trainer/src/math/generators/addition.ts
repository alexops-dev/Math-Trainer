import type {
  AdditionGeneratorConfig,
  Exercise,
} from '../types';

import { randomInt } from '../utils';

function crossesTen(
  left: number,
  right: number
): boolean {
  return left < 10 &&
    right < 10 &&
    left + right > 10;
}

export function generateAdditionExercise(
  config: AdditionGeneratorConfig
): Exercise {
  while (true) {
    const left = randomInt(
      config.addendMin,
      config.addendMax
    );

    const right = randomInt(
      config.addendMin,
      config.addendMax
    );

    const answer = left + right;

    if (
      answer < config.resultMin ||
      answer > config.resultMax
    ) {
      continue;
    }

    if (
      config.requireTensCrossing &&
      !crossesTen(left, right)
    ) {
      continue;
    }

    return {
      id: crypto.randomUUID(),
      left,
      right,
      operator: '+',
      answer,
    };
  }
}