import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class IntDivisionOperationNode extends BinaryOperator {
  protected getOperatorString(): string {
    return '\\';
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitIntDivisionOperationNode(this);
  }
}
