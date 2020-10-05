import { ExpressionNode } from "./ExpressionNode"

export abstract class UnaryOperator extends ExpressionNode {
  protected _operand: ExpressionNode;

  constructor(operand: ExpressionNode) {
    super();
    this._operand = operand;
  }

  protected abstract getOperatorString(): string;


  public get operand(): ExpressionNode {
    return this._operand;
  }

  // TEMP TODO support all types
  public get resultType(): string {
    return this._operand.resultType;
  }

  public toString(): string {
    return this.getOperatorString() + "(" + this._operand.toString() + ")";
  }
}
