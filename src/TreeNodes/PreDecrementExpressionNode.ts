import { UnaryOperator } from "./UnaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";
import { ReferenceNode } from "./ReferenceNode.ts";


export class PreDecrementExpressionNode extends UnaryOperator {

  protected getOperatorString(): string {
    return "--";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitPreDecrementExpressionNode(this);
  }
}
