import { UnaryOperator } from "./UnaryOperator";
import { IVisitorAST } from "./IVisitorAST";
import { ReferenceNode } from "./ReferenceNode";


export class PreIncrementExpressionNode extends UnaryOperator {
  protected getOperatorString(): string {
    return "++";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitPreIncrementExpressionNode(this);
  }
}
