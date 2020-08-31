import { UnaryOperator } from "./UnaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";


export class PosIncrementExpressionNode extends UnaryOperator {
  protected getOperatorString(): string {
    return "++";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitPosIncrementExpressionNode(this);
  }
}
