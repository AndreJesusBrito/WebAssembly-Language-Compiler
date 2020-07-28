import { StatementNode } from "./StatementNode.ts"
import { IVisitorAST } from "./IVisitorAST.ts";
import { ExpressionNode } from "./ExpressionNode.ts";

export class VarDeclarationNode extends StatementNode {
  public assignment: ExpressionNode | null;

  public variableName: string;
  public initialized: boolean = false;
  public index: number = -1;

  constructor(assignment: ExpressionNode | null, variableName: string) {
    super();
    this.assignment = assignment;

    this.variableName = variableName;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitVarDeclarationNode(this);
  }

  public toString(): string {
    return "declared '" + this.variableName + "'\n" + (this._nextStatement?.toString() || "");
  }
}
