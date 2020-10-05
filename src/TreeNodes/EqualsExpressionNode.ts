import { BinaryOperator } from "./BinaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class EqualsExpressionNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '==';
  }

  public get resultType(): string {
    return "bool";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitEqualsExpressionNode(this);
  }
}
