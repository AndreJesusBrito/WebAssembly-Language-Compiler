import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class GreaterThanExpressionNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '>';
  }

  public get resultType(): string {
    return "bool";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitGreaterThanExpressionNode(this);
  }
}
