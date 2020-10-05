import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class BooleanXorNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '^^';
  }


  public visit(visitor: IVisitorAST) {
    return visitor.visitBooleanXorNode(this);
  }
}
