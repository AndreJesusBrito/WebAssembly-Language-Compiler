import { IVisitorAST } from "../TreeNodes/IVisitorAST.ts";
import { NumberLiteralNode } from "../TreeNodes/NumberLiteralNode.ts";
import { NumberUnaryNegationNode } from "../TreeNodes/NumberUnaryNegationNode.ts";
import { AddOperationNode } from "../TreeNodes/AddOperationNode.ts";
import { SubtractOperationNode } from "../TreeNodes/SubtractOperationNode.ts";
import { MultiplyOperationNode } from "../TreeNodes/MultiplyOperationNode.ts";
import { IntDivisionOperationNode } from "../TreeNodes/IntDivisionOperationNode.ts";
import { PowerOperationNode } from "../TreeNodes/PowerOperationNode.ts";
import { BaseNode } from "../TreeNodes/BaseNode.ts";
import { StatementSingleNode } from "../TreeNodes/StatementSingleNode.ts";
import { StatementBlockNode } from "../TreeNodes/StatementBlockNode.ts";
import { VarDefinitionNode } from "../TreeNodes/VarDefinitionNode.ts";
import { StatementNode } from "../TreeNodes/StatementNode.ts";


export class SemanticAnalyser implements IVisitorAST {
  protected ast: BaseNode;

  protected frameStack: Map<String, VarDefinitionNode>[] = [new Map()];

  constructor(ast: BaseNode) {
    this.ast = ast;
  }

  visitNumberLiteralNode(node: NumberLiteralNode): any {}

  visitStatementSingleNode(node: StatementSingleNode): any {
    node.innerExpression.visit(this);
  }

  visitStatementBlockNode(node: StatementBlockNode): void {
    this.frameStack.push(new Map());
    node.innerStatement?.visit(this);
    this.frameStack.pop();
  }

  visitVarDefinitionNode(node: VarDefinitionNode): any {
    if (node.assignment) {
      node.initialized = true;
    }
    this.declareVariable(node);
  }

  // unary operators
  visitNumberUnaryNegationNode(node: NumberUnaryNegationNode): any {}

  // binary operators
  visitAddOperationNode(node: AddOperationNode): any {}
  visitSubtractOperationNode(node: SubtractOperationNode): any {}
  visitMultiplyOperationNode(node: MultiplyOperationNode): any {}
  visitIntDivisionOperationNode(node: IntDivisionOperationNode): any {}

  visitPowerOperationNode(node: PowerOperationNode): void {
    throw Error("** not implemented");
  }

  protected declareVariable(node: VarDefinitionNode) {
    const varName: string = node.variableName;

    if (this.frameStack[this.frameStack.length - 1].get(varName)) {
      throw new Error("Variable '" + varName + "' is already defined.");
    }
    this.frameStack[this.frameStack.length - 1].set(varName, node);
  }
  // protected getVariable(variableName: string) {
  //   const varName: string = node.variableName;

  //   if (this.frameStack[this.frameStack.length - 1].get(varName)) {
  //     throw new Error("Variable '" + varName + "' is already defined.");
  //   }
  //   this.frameStack[this.frameStack.length - 1].set(varName, node);
  // }

  protected visitStatements(firstStatement: StatementNode): void {
    let currentStatement: StatementNode | null = firstStatement;
    do {
      currentStatement.visit(this);

      currentStatement = currentStatement.nextStatement;
    } while (currentStatement);
  }

  public analyze(): void {
    // @ts-ignore TEMP only passing statements for now.
    this.visitStatements(this.ast);
  }

}
