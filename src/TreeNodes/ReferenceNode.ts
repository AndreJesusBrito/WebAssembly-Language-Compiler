import { ExpressionNode } from "./ExpressionNode";

export abstract class ReferenceNode extends ExpressionNode {
  public returnsValue: boolean = true;

  constructor() {
    super();
  }
}
