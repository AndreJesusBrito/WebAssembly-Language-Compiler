import { StatementNode } from "./StatementNode.ts"
import { IVisitorAST } from "./IVisitorAST.ts";
import { ExpressionNode } from "./ExpressionNode.ts";

export class VarDefinitionNode extends StatementNode {
  public assignment: ExpressionNode | null = null;

  public variableName: string;
  public initialized: boolean = false;
  public index: number = -1;

  constructor(variableName: string) {
    super();

    this.variableName = variableName;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitVarDefinitionNode(this);
  }

  public toString(): string {
    return "declared '" + this.variableName + "'" + (this.assignment ? " = " + this.assignment.toString() : "") + "\n" + (this._nextStatement?.toString() || "");
  }
}
