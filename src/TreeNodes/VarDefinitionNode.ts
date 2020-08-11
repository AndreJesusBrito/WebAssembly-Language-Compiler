import { StatementNode } from "./StatementNode.ts"
import { IVisitorAST } from "./IVisitorAST.ts";
import { ExpressionNode } from "./ExpressionNode.ts";

export class VarDefinitionNode extends StatementNode {
  public assignment: ExpressionNode | null = null;

  public variableName: string;
  public datatype: string;

  public index: number = -1;
  public isGlobal: boolean = false;

  public readCount: number = 0;
  public writeCount: number = 0;

  constructor(variableName: string, datatype: string) {
    super();

    this.variableName = variableName;
    this.datatype = datatype;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitVarDefinitionNode(this);
  }

  public get initialized(): boolean {
    return this.writeCount > 0;
  }

  public toString(): string {
    return (this.isGlobal ? "global" : "local")  + " " + this.datatype + " '" + this.variableName + "'" + (this.assignment ? " = " + this.assignment.toString() : "") + "\n" + (this._nextStatement?.toString() || "");
  }
}
