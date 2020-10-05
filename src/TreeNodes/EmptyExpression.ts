import { ExpressionNode } from "./ExpressionNode";
import { IVisitorAST } from "./IVisitorAST";

export class EmptyExpression extends ExpressionNode {
  constructor() {
    super();
  }


  public get resultType() : string {
    return "";
  }

  visit(visitor: IVisitorAST) {
    return visitor.visitEmptyExpression(this);
  }
}