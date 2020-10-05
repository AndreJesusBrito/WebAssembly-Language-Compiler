import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class BitwiseAndNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '&';
  }


  public visit(visitor: IVisitorAST) {
    return visitor.visitBitwiseAndNode(this);
  }
}
