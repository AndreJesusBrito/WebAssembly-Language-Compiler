import { IVisitorAST } from "./IVisitorAST.ts";
import { ExpressionNode } from "./ExpressionNode.ts";
import { VarDefinitionNode } from "./VarDefinitionNode.ts";
import { ReferenceNode } from "./ReferenceNode.ts";

export class VarReferenceNode extends ReferenceNode {
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
