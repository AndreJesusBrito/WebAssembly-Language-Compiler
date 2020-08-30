import { UnaryOperator } from "./UnaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";
import { ReferenceNode } from "./ReferenceNode.ts";


export class PreIncrementExpressionNode extends UnaryOperator {
  protected getOperatorString(): string {
    return "++";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitPreIncrementExpressionNode(this);
  }
}
