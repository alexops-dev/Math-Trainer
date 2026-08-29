export interface BridgeToTenHint {
  start: number;
  subtract: number;

  firstSubtract: number;
  firstResult: number;

  secondSubtract: number;
  finalResult: number;
}

export function buildBridgeToTenHint(
  left: number,
  right: number
): BridgeToTenHint {
  const ones = left % 10;

  const firstSubtract = ones;
  const firstResult = left - firstSubtract;

  const secondSubtract = right - firstSubtract;
  const finalResult = left - right;

  return {
    start: left,
    subtract: right,

    firstSubtract,
    firstResult,

    secondSubtract,
    finalResult,
  };
}