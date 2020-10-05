import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class PowerOperationNode extends BinaryOperator {
  protected getOperatorString(): string {
    return '**';
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitPowerOperationNode(this);
  }
}
