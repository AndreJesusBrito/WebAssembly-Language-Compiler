import { ExpressionNode } from "./ExpressionNode.ts"

export abstract class UnaryOperator extends ExpressionNode {
  protected operand: ExpressionNode;

  constructor(operand: ExpressionNode) {
    super();
    this.operand = operand;
  }

  protected abstract getOperatorString(): string;

  public toString(): string {
    return this.getOperatorString() + "(" + this.operand.toString() + ")";
  }
}
