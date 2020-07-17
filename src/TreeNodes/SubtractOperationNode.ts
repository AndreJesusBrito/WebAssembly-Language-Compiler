import { BinaryOperator } from "./BinaryOperator.ts";

export class SubtractOperationNode extends BinaryOperator {
  protected getOperatorString(): string {
    return '-';
  }
}
