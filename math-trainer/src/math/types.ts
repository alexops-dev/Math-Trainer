export type Operator = '+' | '-';
export type TrainerMode = 'learning' | 'practice';


export interface Exercise {
  id: string;
  left: number;
  right: number;
  operator: Operator;
  answer: number;
}

export interface SubtractionGeneratorConfig {
  minuendMin: number;
  minuendMax: number;

  subtrahendMin: number;
  subtrahendMax: number;

  resultMin: number;
  resultMax: number;

  requireTensCrossing: boolean;
  allowNegative: boolean;
}

export interface ExerciseConfig {
  id: string;
  title: string;
  operation: 'subtraction';

  generator: SubtractionGeneratorConfig;

  session: {
    questions: number;
  };

  hint?: {
    type: 'bridgeToTen';
  };
}