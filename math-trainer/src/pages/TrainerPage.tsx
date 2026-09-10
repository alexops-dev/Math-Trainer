import { useState, useEffect } from 'react';
import NumberPad from '../components/NumberPad';
import SessionSummary from '../components/SessionSummary';
import type {
  Exercise,
  TrainerMode,
} from '../math/types';
import type {
  ExerciseModule,
} from '../exercises/types';

type Feedback = 'correct' | 'wrong' | null;

interface TrainerPageProps {
  exerciseModule: ExerciseModule;
  onBack: () => void;
}

function TrainerPage({
  exerciseModule,
  onBack,
}: TrainerPageProps) {
  const {
    title,
    createExercise,
    HintComponent,
    session,
    defaultMode = 'learning',
    } = exerciseModule;

  const [trainerMode, setTrainerMode] =
    useState<TrainerMode>(defaultMode);

  const [showHint, setShowHint] =
    useState(true);

  const toggleTrainerMode = () => {
    setTrainerMode((current) => {
      const next =
        current === 'learning'
          ? 'practice'
          : 'learning';

      setShowHint(next === 'learning');

      return next;
    });
  };

  const totalQuestions =
    session.questions;

  const [exercise, setExercise] =
    useState<Exercise>(createExercise());

  const [userAnswer, setUserAnswer] =
    useState('');

  const [feedback, setFeedback] =
    useState<Feedback>(null);

  const [questionNumber, setQuestionNumber] =
    useState(1);

  const [firstTryCorrect, setFirstTryCorrect] =
    useState(0);

  const [wrongAttempts, setWrongAttempts] =
    useState(0);

  const [
    attemptsForCurrentQuestion,
    setAttemptsForCurrentQuestion,
  ] = useState(0);

  const [streak, setStreak] =
    useState(0);

  const [bestStreak, setBestStreak] =
    useState(0);

  const [hintsUsed, setHintsUsed] =
    useState(0);

  const [
    hintUsedForCurrentQuestion,
    setHintUsedForCurrentQuestion,
  ] = useState(false);

  const [sessionFinished, setSessionFinished] =
    useState(false);

  const handleNumberClick = (
    number: number
  ) => {
    if (feedback === 'correct') {
      return;
    }

    setUserAnswer(String(number));
    setFeedback(null);
  };

  const handleClear = () => {
    setUserAnswer('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (
      userAnswer === '' ||
      feedback === 'correct'
    ) {
      return;
    }

    const numericAnswer =
      Number(userAnswer);

    if (
      numericAnswer === exercise.answer
    ) {
      setFeedback('correct');

      if (
        attemptsForCurrentQuestion === 0
      ) {
        setFirstTryCorrect(
          (current) => current + 1
        );
      }

      const newStreak = streak + 1;

      setStreak(newStreak);

      setBestStreak((current) =>
        Math.max(current, newStreak)
      );
    } else {
      setFeedback('wrong');

      setWrongAttempts(
        (current) => current + 1
      );

      setAttemptsForCurrentQuestion(
        (current) => current + 1
      );

      setStreak(0);
    }
  };

  const handleHint = () => {
    setShowHint((current) => !current);

    if (
      trainerMode === 'practice' &&
      !hintUsedForCurrentQuestion
    ) {
      setHintsUsed(
        (current) => current + 1
      );

      setHintUsedForCurrentQuestion(true);
    }
  };

  const nextExercise = () => {
    if (
      questionNumber >= totalQuestions
    ) {
      setSessionFinished(true);
      return;
    }

    setExercise(createExercise());

    setQuestionNumber(
      (current) => current + 1
    );

    setUserAnswer('');
    setFeedback(null);

    setShowHint(
      trainerMode === 'learning'
    );

    setAttemptsForCurrentQuestion(0);

    setHintUsedForCurrentQuestion(false);
  };
  
  useEffect(() => {
  if (feedback !== 'correct') {
    return;
  }

  const timer = window.setTimeout(() => {
    nextExercise();
  }, 1100);

  return () => {
    window.clearTimeout(timer);
  };
  }, [feedback]);

  const restartSession = () => {
    setExercise(createExercise());

    setUserAnswer('');
    setFeedback(null);

    setShowHint(
      trainerMode === 'learning'
    );

    setQuestionNumber(1);

    setFirstTryCorrect(0);
    setWrongAttempts(0);

    setAttemptsForCurrentQuestion(0);

    setStreak(0);
    setBestStreak(0);

    setHintsUsed(0);

    setHintUsedForCurrentQuestion(false);

    setSessionFinished(false);
  };

  if (sessionFinished) {
    return (
      <main className="app">
        <div className="trainer-card">

          <button
            className="back-button"
            onClick={onBack}
          >
            ← Übungen
          </button>

          <div className="app-header">
            <img
              src="/logo-math-trainer.png"
              alt="Math Trainer"
              className="app-logo"
            />

            <p className="level-title">
              {title}
            </p>
          </div>

          <SessionSummary
            totalQuestions={totalQuestions}
            firstTryCorrect={firstTryCorrect}
            wrongAttempts={wrongAttempts}
            hintsUsed={hintsUsed}
            bestStreak={bestStreak}
            onRestart={restartSession}
            mode={trainerMode}
          />
        </div>
      </main>
    );
  }

  const progress =
    ((questionNumber - 1) /
      totalQuestions) *
    100;

  return (
    <main className="app">
      <div className="trainer-card">

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Übungen
        </button>

        <div className="app-header">
          <img
            src="/logo-math-trainer.png"
            alt="Math Trainer"
            className="app-logo"
          />

          <p className="level-title">
            {title}
          </p>
        </div>

        <div className="session-info">
          <span>
            Aufgabe {questionNumber} von{' '}
            {totalQuestions}
          </span>

          {streak > 0 && (
            <span>
              🔥 {streak}
            </span>
          )}
        </div>

        <div className="progress-bar">
          <div
            className="progress-value"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="trainer-layout">
          <section className="trainer-main">
            <div
              className={
                feedback === 'correct'
                  ? 'exercise exercise-success'
                  : 'exercise'
              }
            >
              <span>{exercise.left}</span>

              <span>
                {exercise.operator}
              </span>

              <span>{exercise.right}</span>

              <span>=</span>

              <div className="answer-box">
                {userAnswer || '?'}
              </div>
            </div>

            {feedback === 'correct' && (
              <div className="feedback correct">
                🎉 Richtig!
              </div>
            )}

            {feedback === 'wrong' && (
              <div className="feedback wrong">
                🤔 Versuch es noch einmal
              </div>
            )}

            <div
              className={
                feedback === 'correct'
                  ? 'mode-toggle mode-toggle-hidden'
                  : 'mode-toggle'
              }
            >
              <span
                className={
                  trainerMode === 'learning'
                    ? 'mode-label active'
                    : 'mode-label'
                }
              >
                Lernmodus
              </span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={trainerMode === 'practice'}
                  onChange={toggleTrainerMode}
                  disabled={feedback === 'correct'}
                />

                <span className="slider" />
              </label>

              <span
                className={
                  trainerMode === 'practice'
                    ? 'mode-label active'
                    : 'mode-label'
                }
              >
                Übungsmodus
              </span>
            </div>
            <div className="hint-button-mobile">
              {trainerMode === 'practice' &&
                feedback !== 'correct' && (
                  <button
                    className="hint-button"
                    onClick={handleHint}
                  >
                    💡{' '}
                    {showHint
                      ? 'Tipp schließen'
                      : 'Tipp zeigen'}
                  </button>
                )}
            </div>

            <div className="hint-mobile">
              {trainerMode === 'learning' && (
                <HintComponent
                  left={exercise.left}
                  right={exercise.right}
                />
              )}

              {trainerMode === 'practice' &&
                showHint &&
                feedback !== 'correct' && (
                  <HintComponent
                    left={exercise.left}
                    right={exercise.right}
                  />
                )}
            </div>

            <NumberPad
              onNumberClick={
                handleNumberClick
              }
              onClear={handleClear}
            />

            {feedback !== 'correct' && (
              <button
                className="primary-button"
                onClick={checkAnswer}
                disabled={userAnswer === ''}
              >
                Prüfen
              </button>
            )}

            {/* {feedback === 'correct' && (
              <button
                className="primary-button"
                onClick={nextExercise}
              >
                {questionNumber ===
                totalQuestions
                  ? 'Ergebnis'
                  : 'Weiter'}
              </button>
            )} */}

            <div className="score">
              Beim ersten Versuch richtig:{' '}
              {firstTryCorrect}
            </div>
          </section>

          <aside className="hint-desktop">
            {trainerMode === 'learning' && (
              <HintComponent
                left={exercise.left}
                right={exercise.right}
              />
            )}

            {trainerMode === 'practice' &&
              feedback !== 'correct' && (
                <>
                  {!showHint && (
                    <button
                      className="hint-button hint-button-desktop"
                      onClick={handleHint}
                    >
                      💡 Tipp zeigen
                    </button>
                  )}

                  {showHint && (
                    <>
                      <button
                        className="hint-button hint-button-desktop"
                        onClick={handleHint}
                      >
                        💡 Tipp schließen
                      </button>

                      <HintComponent
                        left={
                          exercise.left
                        }
                        right={
                          exercise.right
                        }
                      />
                    </>
                  )}
                </>
              )}
          </aside>
        </div>
      </div>
    </main>
  );
}

export default TrainerPage;