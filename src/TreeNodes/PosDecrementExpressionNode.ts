import { UnaryOperator } from "./UnaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";


export class PosDecrementExpressionNode extends UnaryOperator {

  protected getOperatorString(): string {
    return "--";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitPosDecrementExpressionNode(this);
  }
}
