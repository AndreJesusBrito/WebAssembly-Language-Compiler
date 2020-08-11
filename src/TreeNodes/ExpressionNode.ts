import {BaseNode} from "./BaseNode.ts"

export abstract class ExpressionNode extends BaseNode {
  public abstract resultType: string;

  constructor() {
    super();
  }


  // public evalType() {
  //   return false;
  // }
}
