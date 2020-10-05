import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class BooleanOrNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '||';
  }


  public visit(visitor: IVisitorAST) {
    return visitor.visitBooleanOrNode(this);
  }
}
