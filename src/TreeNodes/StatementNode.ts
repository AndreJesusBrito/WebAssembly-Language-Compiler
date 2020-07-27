import { BaseNode } from "./BaseNode.ts"

export abstract class StatementNode extends BaseNode {
  protected _nextStatement: StatementNode | null;

  constructor() {
    super();
    this._nextStatement = null;
  }

  public get nextStatement(): StatementNode | null {
    return this._nextStatement;
  }

  public set nextStatement(nextStmt: StatementNode | null) {
    this._nextStatement = nextStmt;
  }
}
