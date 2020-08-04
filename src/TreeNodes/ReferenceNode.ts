import { BaseNode } from "./BaseNode.ts"

export abstract class ReferenceNode extends BaseNode {
  public returnsValue: boolean = true;

  constructor() {
    super();
  }
}
