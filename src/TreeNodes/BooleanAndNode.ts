import { BinaryOperator } from "./BinaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";


export class BooleanAndNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '&&';
  }


  public visit(visitor: IVisitorAST) {
    return visitor.visitBooleanAndNode(this);
  }
}
