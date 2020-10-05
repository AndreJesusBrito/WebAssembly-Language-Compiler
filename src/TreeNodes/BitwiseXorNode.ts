import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class BitwiseXorNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '^';
  }


  public visit(visitor: IVisitorAST) {
    return visitor.visitBitwiseXorNode(this);
  }
}
