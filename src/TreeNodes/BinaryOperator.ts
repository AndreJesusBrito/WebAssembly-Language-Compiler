import { ExpressionNode } from "./ExpressionNode"

export abstract class BinaryOperator extends ExpressionNode {
  private _operand1: ExpressionNode;
  private _operand2: ExpressionNode;


  constructor(operand1: ExpressionNode, operand2: ExpressionNode) {
    super();
    this._operand1 = operand1;
    this._operand2 = operand2;
  }


  protected abstract getOperatorString(): string;

  // TEMP TODO support all types
  public get resultType(): string {
    return this._operand1.resultType;
  }

  public get operand1(): ExpressionNode {
    return this._operand1;
  }

  public get operand2(): ExpressionNode {
    return this._operand2;
  }


  public toString(): string {
    return "(" + this.operand1.toString() + " " + this.getOperatorString() + " " + this.operand2.toString() + ")";
  }
}
