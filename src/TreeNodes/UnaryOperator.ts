import { ExpressionNode } from "./ExpressionNode.ts"

export abstract class UnaryOperator extends ExpressionNode {
  protected _operand: ExpressionNode;

  constructor(operand: ExpressionNode) {
    super();
    this._operand = operand;
  }

  protected abstract getOperatorString(): string;


  public get operand() : ExpressionNode {
    return this._operand;
  }

  public toString(): string {
    return this.getOperatorString() + "(" + this._operand.toString() + ")";
  }
}
