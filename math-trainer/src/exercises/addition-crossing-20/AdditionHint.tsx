import {
  buildAdditionBridgeToTenHint,
} from '../../math/hints/additionBridgeToTen';

interface AdditionHintProps {
  left: number;
  right: number;
}

function AdditionHint({
  left,
  right,
}: AdditionHintProps) {
  const hint =
    buildAdditionBridgeToTenHint(
      left,
      right
    );

  return (
    <div className="hint-box">
      <img
        src="/cube-grass.png"
        alt=""
        className="hint-cube"
        aria-hidden="true"
      />

      <div className="hint-title">
        💡 Schritt für Schritt
      </div>

      <div className="hint-original">
        <span className="math-token token-start">
          {left}
        </span>

        <span className="math-operator">
          +
        </span>

        <span className="math-token token-subtract">
          {right}
        </span>

        <span className="math-operator">
          =
        </span>

        <span className="math-question">
          ?
        </span>
      </div>

      <div className="hint-step">
        <span className="hint-label">
          1. Erst bis zum Zehner:
        </span>

        <div className="hint-equation">
          <span className="math-token token-start">
            {hint.start}
          </span>

          <span className="math-operator">
            +
          </span>

          <span className="math-token token-bridge">
            {hint.toTenAmount}
          </span>

          <span className="math-operator">
            =
          </span>

          <span className="math-token token-ten">
            {hint.ten}
          </span>
        </div>
      </div>

      <div className="hint-step">
        <span className="hint-label">
          2. Zerlege die {hint.add}:
        </span>

        <div className="hint-equation">
          <span className="math-token token-subtract">
            {hint.add}
          </span>

          <span className="math-operator">
            =
          </span>

          <span className="math-token token-bridge">
            {hint.toTenAmount}
          </span>

          <span className="math-operator">
            +
          </span>

          <span className="math-token token-rest">
            {hint.remainingAmount}
          </span>
        </div>
      </div>

      <div className="hint-step">
        <span className="hint-label">
          3. Jetzt den Rest:
        </span>

        <div className="hint-equation">
          <span className="math-token token-ten">
            {hint.ten}
          </span>

          <span className="math-operator">
            +
          </span>

          <span className="math-token token-rest">
            {hint.remainingAmount}
          </span>

          <span className="math-operator">
            =
          </span>

          <span className="math-question">
            ?
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdditionHint;