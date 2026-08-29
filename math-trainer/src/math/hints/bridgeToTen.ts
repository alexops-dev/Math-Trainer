export interface BridgeToTenHint {
  start: number;
  subtract: number;

  toTenAmount: number;
  ten: number;

  remainingAmount: number;

  finalResult: number;
}

export function buildBridgeToTenHint(
  left: number,
  right: number
): BridgeToTenHint {
  const ones = left % 10;

  const toTenAmount = ones;
  const ten = left - toTenAmount;

  const remainingAmount =
    right - toTenAmount;

  const finalResult =
    left - right;

  return {
    start: left,
    subtract: right,

    toTenAmount,
    ten,

    remainingAmount,

    finalResult,
  };
}