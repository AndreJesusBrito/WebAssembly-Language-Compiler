import { BinaryOperator } from "./BinaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";


export class AddOperationNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '+';
  }


  public visit(visitor: IVisitorAST) {
    visitor.visitAddOperationNode(this);
  }
}
