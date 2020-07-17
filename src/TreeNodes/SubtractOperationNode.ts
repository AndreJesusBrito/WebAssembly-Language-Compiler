import { BinaryOperator } from "./BinaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";

export class SubtractOperationNode extends BinaryOperator {
  protected getOperatorString(): string {
    return '-';
  }

  public visit(visitor: IVisitorAST) {
    visitor.visitSubtractOperationNode(this);
  }
}
