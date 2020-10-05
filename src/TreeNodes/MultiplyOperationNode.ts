import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class MultiplyOperationNode extends BinaryOperator {
  protected getOperatorString(): string {
    return '*';
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitMultiplyOperationNode(this);
  }
}
