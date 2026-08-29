import type {
  Exercise,
  SubtractionGeneratorConfig,
} from '../types';

import { randomInt } from '../utils';

function crossesTen(minuend: number, result: number): boolean {
  const lowerTen = Math.floor(minuend / 10) * 10;

  return result < lowerTen;
}

export function generateSubtractionExercise(
  config: SubtractionGeneratorConfig
): Exercise {
  while (true) {
    const left = randomInt(
      config.minuendMin,
      config.minuendMax
    );

    const right = randomInt(
      config.subtrahendMin,
      config.subtrahendMax
    );

    const answer = left - right;

    if (!config.allowNegative && answer < 0) {
      continue;
    }

    if (
      answer < config.resultMin ||
      answer > config.resultMax
    ) {
      continue;
    }

    if (
      config.requireTensCrossing &&
      !crossesTen(left, answer)
    ) {
      continue;
    }

    return {
      id: crypto.randomUUID(),
      left,
      right,
      operator: '-',
      answer,
    };
  }
}