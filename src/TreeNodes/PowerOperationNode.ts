import { BinaryOperator } from "./BinaryOperator.ts";

export class PowerOperationNode extends BinaryOperator {
  protected getOperatorString(): string {
    return '**';
  }
}
