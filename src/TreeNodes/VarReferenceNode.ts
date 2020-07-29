import { IVisitorAST } from "./IVisitorAST.ts";
import { ExpressionNode } from "./ExpressionNode.ts";
import { VarDefinitionNode } from "./VarDefinitionNode.ts";

export class VarReferenceNode extends ExpressionNode {
  public variableName: string;
  public definitionNode: VarDefinitionNode | null = null;

  constructor(variableName: string) {
    super();
    this.variableName = variableName;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitVarReferenceNode(this);
  }

  public toString(): string {
    return this.variableName;
  }
}
