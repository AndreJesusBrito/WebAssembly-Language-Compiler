import { ExpressionNode } from "./ExpressionNode.ts"
import { IVisitorAST } from "./IVisitorAST.ts";

export class ConditionalOperatorNode extends ExpressionNode {
  public condition : ExpressionNode;
  public firstExpression : ExpressionNode;
  public elseExpression : ExpressionNode;

  constructor(condition: ExpressionNode, firstExpression: ExpressionNode, elseExpression: ExpressionNode) {
    super();
    this.condition = condition;
    this.firstExpression = firstExpression;
    this.elseExpression = elseExpression;
  }

  public get resultType(): string {
    return this.firstExpression.resultType;
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitConditionalOperatorNode(this);
  }


  public toString(): string {
    return "(" + this.condition.toString()
     + ") ? (" + this.firstExpression.toString()
     + ") : (" + this.elseExpression.toString() + ")";
  }
}
