import { StatementNode } from "./StatementNode.ts"
import { IVisitorAST } from "./IVisitorAST.ts";
import { ExpressionNode } from "./ExpressionNode.ts";

export class StatementSingleNode extends StatementNode {
  protected _innerExpression: ExpressionNode;

  constructor(innerExpression: ExpressionNode) {
    super();
    this._innerExpression = innerExpression;
  }

  public get innerExpression(): ExpressionNode {
    return this._innerExpression;
  }

  public set innerExpression(innerExpression : ExpressionNode) {
    this._innerExpression = innerExpression;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitStatementSingleNode(this);
  }

  public toString(): string {
    return this._innerExpression.toString() + ";\n" + (this._nextStatement?.toString() || "");
  }
}
