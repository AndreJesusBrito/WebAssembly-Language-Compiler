import { UnaryOperator } from "./UnaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class NumberUnaryNegationNode extends UnaryOperator {
  protected getOperatorString(): string {
    return "-";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitNumberUnaryNegationNode(this);
  }
}
