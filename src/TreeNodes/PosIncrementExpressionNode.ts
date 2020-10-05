import { UnaryOperator } from "./UnaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class PosIncrementExpressionNode extends UnaryOperator {
  protected getOperatorString(): string {
    return "++";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitPosIncrementExpressionNode(this);
  }
}
