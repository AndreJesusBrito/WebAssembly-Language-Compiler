import { BinaryOperator } from "./BinaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";


export class BooleanOrNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '||';
  }


  public visit(visitor: IVisitorAST) {
    return visitor.visitBooleanOrNode(this);
  }
}
