import { UnaryOperator } from "./UnaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class PosDecrementExpressionNode extends UnaryOperator {

  protected getOperatorString(): string {
    return "--";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitPosDecrementExpressionNode(this);
  }
}
