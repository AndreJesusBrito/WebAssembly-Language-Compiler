import { StatementNode } from "./StatementNode"
import { IVisitorAST } from "./IVisitorAST";

export class StatementBlockNode extends StatementNode {
  private _innerStatement: StatementNode | null;

  constructor(innerStatement: StatementNode | null) {
    super();
    this._innerStatement = innerStatement;
  }

  public get returnsValue(): boolean {
    return false;
  }

  public get innerStatement() : StatementNode | null {
    return this._innerStatement;
  }

  public set innerStatement(innerStmt: StatementNode | null ) {
    this._innerStatement = innerStmt;
  }


  public visit(visitor: IVisitorAST): any {
    return visitor.visitStatementBlockNode(this);
  }

  public toString(): string {
    return "{\n" + (this._innerStatement?.toString() || "") + "}\n" + (this._nextStatement?.toString() || "");
  }
}
