import { BinaryOperator } from "./BinaryOperator.ts";

export class AddOperationNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '+';
  }

}
