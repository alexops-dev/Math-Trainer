import { buildBridgeToTenHint } from '../math/hints/bridgeToTen';

interface HintProps {
  left: number;
  right: number;
}

function Hint({
  left,
  right,
}: HintProps) {
  const hint =
    buildBridgeToTenHint(left, right);

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
        {left} − {right}
      </div>

      <div className="hint-step">
        <span className="hint-label">
          1. Erst bis zum Zehner:
        </span>

        <strong>
          {hint.start} − {hint.toTenAmount} = {hint.ten}
        </strong>
      </div>

      <div className="hint-step">
        <span className="hint-label">
          2. Zerlege die {hint.subtract}:
        </span>

        <strong>
          {hint.subtract} = {hint.toTenAmount} + {hint.remainingAmount}
        </strong>
      </div>

      <div className="hint-step">
        <span className="hint-label">
          3. Jetzt den Rest:
        </span>

        <strong>
          {hint.ten} − {hint.remainingAmount} = ?
        </strong>
      </div>
    </div>
  );
}

export default Hint;