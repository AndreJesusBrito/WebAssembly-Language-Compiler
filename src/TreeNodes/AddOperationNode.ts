import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class AddOperationNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '+';
  }


  public visit(visitor: IVisitorAST) {
    return visitor.visitAddOperationNode(this);
  }
}
