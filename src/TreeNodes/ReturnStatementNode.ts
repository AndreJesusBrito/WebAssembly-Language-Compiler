import { StatementNode } from "./StatementNode"
import { IVisitorAST } from "./IVisitorAST";
import { ExpressionNode } from "./ExpressionNode";

export class ReturnStatementNode extends StatementNode {
  public expression: ExpressionNode;

  constructor(expression: ExpressionNode) {
    super();
    this.expression = expression;
  }

  public get returnsValue(): boolean {
    return this.expression !== null;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitReturnStatementNode(this);
  }

  public toString(): string {
    return "return" + (this.expression ? " " + this.expression.toString() : "");
  }
}
