import { IVisitorAST } from "./IVisitorAST.ts";
import { StatementNode } from "./StatementNode.ts";

export class EmptyStatement extends StatementNode {
  constructor() {
    super();
  }


  public get returnsValue(): boolean {
    return false;
  }

  public get resultType() : string {
    return "";
  }

  visit(visitor: IVisitorAST): any {
    return visitor.visitEmptyStatement(this);
  }
}