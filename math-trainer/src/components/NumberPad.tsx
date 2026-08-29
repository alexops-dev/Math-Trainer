interface NumberPadProps {
  onNumberClick: (number: number) => void;
  onClear: () => void;
}

function NumberPad({
  onNumberClick,
  onClear,
}: NumberPadProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="number-pad">
      {numbers.map((number) => (
        <button
          key={number}
          className="number-button"
          onClick={() => onNumberClick(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="number-button clear-button"
        onClick={onClear}
      >
        C
      </button>

      <button
        className="number-button"
        onClick={() => onNumberClick(0)}
      >
        0
      </button>
    </div>
  );
}

export default NumberPad;