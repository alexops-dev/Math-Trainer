export interface AdditionBridgeToTenHint {
  start: number;
  add: number;
  toTenAmount: number;
  ten: number;
  remainingAmount: number;
  finalResult: number;
}

export function buildAdditionBridgeToTenHint(
  start: number,
  add: number
): AdditionBridgeToTenHint {
  const ten = 10;

  const toTenAmount =
    ten - start;

  const remainingAmount =
    add - toTenAmount;

  const finalResult =
    start + add;

  return {
    start,
    add,
    toTenAmount,
    ten,
    remainingAmount,
    finalResult,
  };
}