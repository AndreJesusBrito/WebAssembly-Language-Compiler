import { UnaryOperator } from "./UnaryOperator.ts";
import { IVisitorAST } from "./IVisitorAST.ts";


export class NumberUnaryNegationNode extends UnaryOperator {
  protected getOperatorString(): string {
    return "-";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitNumberUnaryNegationNode(this);
  }
}
