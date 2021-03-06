import { UnaryOperator } from "./UnaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class BitwiseNegationNode extends UnaryOperator {
  protected getOperatorString(): string {
    return "!";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitBitwiseNegationNode(this);
  }
}
