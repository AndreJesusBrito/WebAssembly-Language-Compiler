import { BinaryOperator } from "./BinaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";


export class PowerOperationNode extends BinaryOperator {
  protected getOperatorString(): string {
    return '**';
  }

  public visit(visitor: IVisitorAST) {
    visitor.visitPowerOperationNode(this);
  }
}
