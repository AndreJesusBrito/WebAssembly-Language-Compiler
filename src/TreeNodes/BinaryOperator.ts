import { ExpressionNode } from "./ExpressionNode.ts"

export abstract class BinaryOperator extends ExpressionNode {
  private operand1: ExpressionNode;
  private operand2: ExpressionNode;


  constructor(operand1: ExpressionNode, operand2: ExpressionNode) {
    super();
    this.operand1 = operand1;
    this.operand2 = operand2;
  }

  protected abstract getOperatorString(): string;

  public toString(): string {
    return "(" + this.operand1.toString() + " " + this.getOperatorString() + " " + this.operand2.toString() + ")";
  }
}
