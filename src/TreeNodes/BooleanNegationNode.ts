import { UnaryOperator } from "./UnaryOperator";
import { IVisitorAST } from "./IVisitorAST";


export class BooleanNegationNode extends UnaryOperator {
  protected getOperatorString(): string {
    return "!";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitBooleanNegationNode(this);
  }
}
