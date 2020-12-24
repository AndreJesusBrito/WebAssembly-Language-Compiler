import { StatementNode } from "./StatementNode"
import { IVisitorAST } from "./IVisitorAST";
import { BaseNode } from "./BaseNode";
import { FunctionDefinitionArgument } from "./FunctionDeclarationArgument";

export class FunctionDefinitionNode extends BaseNode {
  name: string;
  args: FunctionDefinitionArgument[];
  body: StatementNode;
  index: number;

  constructor(name: string, args: FunctionDefinitionArgument[], body: StatementNode) {
    super();

    this.args = args;
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
