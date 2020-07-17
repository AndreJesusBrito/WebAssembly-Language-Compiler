import { BinaryOperator } from "./BinaryOperator.ts";

export class IntDivisionOperationNode extends BinaryOperator {
  protected getOperatorString(): string {
    return '\\';
  }
}
