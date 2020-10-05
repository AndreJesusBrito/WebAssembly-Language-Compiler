import {BaseNode} from "./BaseNode"

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
