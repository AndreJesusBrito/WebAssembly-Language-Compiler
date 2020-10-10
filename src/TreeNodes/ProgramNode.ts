import { BaseNode } from "./BaseNode";
import { FunctionDefinitionNode } from "./FunctionDeclarationNode";
import { IVisitorAST } from "./IVisitorAST";

export class ProgramNode extends BaseNode {

  functions: Map<string, FunctionDefinitionNode>;

  constructor(elements: BaseNode[]) {
    super();

    this.functions = new Map();

    for (const element of elements) {
      if (element instanceof FunctionDefinitionNode) {

        // check duplicates
        if (this.functions.get(element.name)) {
          throw Error("function with " + element.name + " was already declared")
        }

        this.functions.set(element.name, element);
      }
    }

  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitProgramNode(this);
  }
}