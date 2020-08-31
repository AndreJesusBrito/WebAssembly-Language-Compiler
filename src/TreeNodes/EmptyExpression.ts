import { ExpressionNode } from "./ExpressionNode.ts";
import { IVisitorAST } from "./IVisitorAST.ts";

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