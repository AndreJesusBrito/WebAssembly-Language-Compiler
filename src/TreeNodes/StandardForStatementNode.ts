import { StatementNode } from "./StatementNode"
import { IVisitorAST } from "./IVisitorAST";
import { ExpressionNode } from "./ExpressionNode";
import { LoopBaseNode } from "./LoopBaseNode";
import { VarDefinitionNode } from "./VarDefinitionNode";

export class StandardForStatementNode extends LoopBaseNode {
  public definitionSection: VarDefinitionNode | null;
  public conditionSection: ExpressionNode;
  public nextStepSection: ExpressionNode;
  public innerStatement: StatementNode;

  constructor(definitionSection: VarDefinitionNode | null, conditionSection: ExpressionNode, nextStepSection: ExpressionNode, innerStatement: StatementNode) {
    super();

    this.definitionSection = definitionSection;
    this.conditionSection = conditionSection;
    this.nextStepSection = nextStepSection;

    this.innerStatement = innerStatement;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitStandardForStatementNode(this);
  }

  public toString(): string {
    return "for (" + (this.definitionSection?.toString() || "") + ";" + this.conditionSection.toString()
           + ";" + this.nextStepSection.toString() + ") {"
      + this.innerStatement.toString()
    + "}";
  }
}
