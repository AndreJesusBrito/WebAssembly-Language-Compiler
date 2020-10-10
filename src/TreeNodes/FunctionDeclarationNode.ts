import { StatementNode } from "./StatementNode"
import { IVisitorAST } from "./IVisitorAST";
import { BaseNode } from "./BaseNode";

export class FunctionDefinitionNode extends BaseNode {
  name: string;
  body: StatementNode;

  constructor(name: string, body: StatementNode) {
    super();

    this.name = name;
    this.body = body;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitFunctionDefinitionNode(this);
  }

  public toString(): string {
    return "func " + this.name;
  }
}
