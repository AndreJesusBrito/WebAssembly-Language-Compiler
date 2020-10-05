import { StatementNode } from "./StatementNode"
import { IVisitorAST } from "./IVisitorAST";
import { ExpressionNode } from "./ExpressionNode";
import { LoopBaseNode } from "./LoopBaseNode";

export class WhileStatementNode extends LoopBaseNode {
  public condition: ExpressionNode;
  public innerStatement: StatementNode;

  constructor(condition: ExpressionNode, innerStatement: StatementNode) {
    super();
    this.condition = condition;
    this.innerStatement = innerStatement;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitWhileStatementNode(this);
  }

  public toString(): string {
    return "while (" + this.condition.toString() + ") {" + this.innerStatement.toString() + "}";
  }
}
