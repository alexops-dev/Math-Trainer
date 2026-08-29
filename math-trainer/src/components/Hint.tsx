import { buildBridgeToTenHint } from '../math/hints/bridgeToTen';

interface HintProps {
  left: number;
  right: number;
}

function Hint({ left, right }: HintProps) {
  const hint = buildBridgeToTenHint(left, right);

  return (
    <div className="hint-box">
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
          {hint.start} − {hint.firstSubtract} = {hint.firstResult}
        </strong>
      </div>

      <div className="hint-step">
        <span className="hint-label">
          2. Jetzt den Rest:
        </span>

        <strong>
          {hint.firstResult} − {hint.secondSubtract} = ?
        </strong>
      </div>
    </div>
  );
}

export default Hint;