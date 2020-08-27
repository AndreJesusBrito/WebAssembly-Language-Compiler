import { StatementNode } from "./StatementNode.ts"
import { IVisitorAST } from "./IVisitorAST.ts";
import { ExpressionNode } from "./ExpressionNode.ts";

export class IfStatementNode extends StatementNode {
  public condition: ExpressionNode;
  public firstStatement: StatementNode;
  public elseStatement: StatementNode | null;

  constructor(condition: ExpressionNode, firstStatement: StatementNode, elseStatement: StatementNode | null) {
    super();
    this.condition = condition;
    this.firstStatement = firstStatement;
    this.elseStatement = elseStatement;
  }

  public get returnsValue(): boolean {
    return false;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitIfStatementNode(this);
  }

  public toString(): string {
    // return "{\n" + (this._innerStatement?.toString() || "") + "}\n" + (this._nextStatement?.toString() || "");
    return "if (" + this.condition.toString() + ") {" + this.firstStatement?.toString() + "}"
          + (this.elseStatement ? "else {" + this.elseStatement.toString() + "}" : "");
  }
}
