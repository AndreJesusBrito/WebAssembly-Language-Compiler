import { StatementNode } from "./StatementNode.ts"
import { IVisitorAST } from "./IVisitorAST.ts";
import { ExpressionNode } from "./ExpressionNode.ts";
import { LoopBaseNode } from "./LoopBaseNode.ts";

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
