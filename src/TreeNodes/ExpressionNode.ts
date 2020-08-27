import {BaseNode} from "./BaseNode.ts"

export abstract class ExpressionNode extends BaseNode {
  public abstract resultType: string;
  public returnsValue = true;

  constructor() {
    super();
  }


  // public evalType() {
  //   return false;
  // }
}
