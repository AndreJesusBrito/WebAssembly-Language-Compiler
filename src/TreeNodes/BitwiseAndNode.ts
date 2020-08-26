import { BinaryOperator } from "./BinaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";


export class BitwiseAndNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '&';
  }


  public visit(visitor: IVisitorAST) {
    return visitor.visitBitwiseAndNode(this);
  }
}
