import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class BitwiseOrNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '|';
  }


  public visit(visitor: IVisitorAST) {
    return visitor.visitBitwiseOrNode(this);
  }
}
