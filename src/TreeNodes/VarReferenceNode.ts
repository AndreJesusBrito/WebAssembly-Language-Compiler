import { IVisitorAST } from "./IVisitorAST";
import { ExpressionNode } from "./ExpressionNode";
import { VarDefinitionNode } from "./VarDefinitionNode";
import { ReferenceNode } from "./ReferenceNode";

export class VarReferenceNode extends ReferenceNode {
  public variableName: string;
  public definitionNode: VarDefinitionNode | null = null;

  constructor(variableName: string) {
    super();
    this.variableName = variableName;
  }


  public get resultType(): string {
    return this.definitionNode?.datatype || "";
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitVarReferenceNode(this);
  }

  public toString(): string {
    return this.variableName;
  }
}
