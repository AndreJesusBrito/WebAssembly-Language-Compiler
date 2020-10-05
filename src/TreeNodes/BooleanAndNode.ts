import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class BooleanAndNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '&&';
  }


  public visit(visitor: IVisitorAST) {
    return visitor.visitBooleanAndNode(this);
  }
}
