import { IVisitorAST } from "./IVisitorAST";
import { StatementNode } from "./StatementNode";

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