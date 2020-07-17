import { ExpressionNode } from "./ExpressionNode.ts"
import { UnaryOperator } from "./UnaryOperator.ts";

export class NumberUnaryNegationNode extends UnaryOperator {
  protected getOperatorString(): string {
    return "-";
  }
}
