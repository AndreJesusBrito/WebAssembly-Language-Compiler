import { IVisitorAST } from "./IVisitorAST";
import { ExpressionNode } from "./ExpressionNode";
import { IVarDefinition } from "./IVarDefinition";
import { ReferenceNode } from "./ReferenceNode";
import { FunctionDefinitionNode } from "./FunctionDeclarationNode";

export class VarReferenceNode extends ReferenceNode {
  public variableName: string;
  public definitionNode: IVarDefinition | null = null;

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
