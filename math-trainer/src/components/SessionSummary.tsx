import type {TrainerMode,} from '../math/types';

interface SessionSummaryProps {
  totalQuestions: number;
  firstTryCorrect: number;
  wrongAttempts: number;
  hintsUsed: number;
  bestStreak: number;
  onRestart: () => void;
  mode: TrainerMode;
}

function SessionSummary({
  totalQuestions,
  firstTryCorrect,
  wrongAttempts,
  hintsUsed,
  bestStreak,
  onRestart,
  mode,
}: SessionSummaryProps) {
  const accuracy = Math.round(
    (firstTryCorrect / totalQuestions) * 100
  );

  return (
    <div className="session-summary">
      <div className="summary-emoji">
        🎉
      </div>

      <h2>Geschafft!</h2>

      <p className="summary-message">
        Du hast alle {totalQuestions} Aufgaben gelöst.
      </p>

      <div className="summary-score">
        {firstTryCorrect} / {totalQuestions}
      </div>

      <div className="summary-label">
        beim ersten Versuch richtig
      </div>

      <div className="summary-accuracy">
        {accuracy} %
      </div>

      <div className="summary-stats">
        <div className="summary-stat">
          <span>🔥</span>

          <div>
            <strong>{bestStreak}</strong>
            <small>Beste Serie</small>
          </div>
        </div>

        <div className="summary-stat">
            {mode === 'practice' && (
            <div className="summary-stat">
                <span>💡</span>

                <div>
                <strong>{hintsUsed}</strong>
                <small>Tipps benutzt</small>
                </div>
            </div>
            )}
        </div>

        <div className="summary-stat">
          <span>🤔</span>

          <div>
            <strong>{wrongAttempts}</strong>
            <small>Falsche Versuche</small>
          </div>
        </div>
      </div>

    <div className="summary-support">
    <img
        src="/heart.png"
        alt=""
        className="summary-heart"
        aria-hidden="true"
    />

    <span>Du schaffst das!</span>
    </div>

      <button
        className="primary-button"
        onClick={onRestart}
      >
        Nochmal spielen
      </button>
    </div>
  );
}

export default SessionSummary;