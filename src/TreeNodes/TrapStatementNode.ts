import { StatementNode } from "./StatementNode"
import { IVisitorAST } from "./IVisitorAST";
import { ExpressionNode } from "./ExpressionNode";

export class TrapStatementNode extends StatementNode {
  public condition: ExpressionNode;

  constructor(condition: ExpressionNode) {
    super();
    this.condition = condition;
  }

  public get returnsValue(): boolean {
    return false;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitTrapStatementNode(this);
  }

  public toString(): string {
    // return "{\n" + (this._innerStatement?.toString() || "") + "}\n" + (this._nextStatement?.toString() || "");
    return "trap" + (this.condition ? " " + this.condition.toString() : "");
  }
}
