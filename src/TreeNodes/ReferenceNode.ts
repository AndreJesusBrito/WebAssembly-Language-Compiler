import { ExpressionNode } from "./ExpressionNode.ts";

export abstract class ReferenceNode extends ExpressionNode {
  public returnsValue: boolean = true;

  constructor() {
    super();
  }
}
