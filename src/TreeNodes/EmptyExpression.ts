import { ExpressionNode } from "./ExpressionNode.ts";

export class EmptyExpression extends ExpressionNode {
  constructor() {
    throw Error("EmptyExpression constructor evoked")
    super();
  }

  visit() {
    // do nothing
  }
}