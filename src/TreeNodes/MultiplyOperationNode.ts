import { BinaryOperator } from "./BinaryOperator.ts";

export class MultiplyOperationNode extends BinaryOperator {
  protected getOperatorString(): string {
    return '*';
  }
}
