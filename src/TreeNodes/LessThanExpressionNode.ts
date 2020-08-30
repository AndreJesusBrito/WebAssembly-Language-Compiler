import { BinaryOperator } from "./BinaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";


export class LessThanExpressionNode extends BinaryOperator {

  protected getOperatorString(): string {
    return '<';
  }

  public get resultType(): string {
    return "bool";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitLessThanExpressionNode(this);
  }
}
