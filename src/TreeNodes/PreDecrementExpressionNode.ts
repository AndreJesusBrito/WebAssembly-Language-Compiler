import { UnaryOperator } from "./UnaryOperator";
import { IVisitorAST } from "./IVisitorAST";
import { ReferenceNode } from "./ReferenceNode";


export class PreDecrementExpressionNode extends UnaryOperator {

  protected getOperatorString(): string {
    return "--";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitPreDecrementExpressionNode(this);
  }
}
