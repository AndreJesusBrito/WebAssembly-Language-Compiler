import { StatementNode } from "./StatementNode.ts"
import { IVisitorAST } from "./IVisitorAST.ts";
import { ExpressionNode } from "./ExpressionNode.ts";

export class VarDefinitionNode extends StatementNode {
  public assignment: ExpressionNode | null = null;

  public variableName: string;
  public index: number = -1;
  public isGlobal: boolean = false;

  public readCount: number = 0;
  public writeCount: number = 0;

  constructor(variableName: string) {
    super();

    this.variableName = variableName;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitVarDefinitionNode(this);
  }

  public get initialized(): boolean {
    return this.writeCount > 0;
  }

  public toString(): string {
    return "declared " + (this.isGlobal ? "global" : "local")  + " '" + this.variableName + "'" + (this.assignment ? " = " + this.assignment.toString() : "") + "\n" + (this._nextStatement?.toString() || "");
  }
}
