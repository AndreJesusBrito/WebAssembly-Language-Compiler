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
import { VarReferenceNode } from "../TreeNodes/VarReferenceNode.ts";


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

    if (node.innerStatement) {
      this.visitStatements(node.innerStatement);
    }

    this.frameStack.pop();
  }

  visitVarDefinitionNode(node: VarDefinitionNode): any {
    if (node.assignment) {
      node.initialized = true;
    }

    this.declareVariable(node);

    // check if is a global variable
    // a declaration is always done at the top frame
    // if is 1 then is a global
    node.isGlobal = (this.frameStack.length === 1);
  }

  visitVarReferenceNode(node: VarReferenceNode): void {
    const variableFrameIndex = this.getVariableFrameIndex(node.variableName);

    if (variableFrameIndex === -1) {
      throw Error("Variable '" + node.variableName + "' is not defined")
    }

    node.definitionNode = this.frameStack[variableFrameIndex].get(node.variableName) || null;
  }

  // unary operators
  visitNumberUnaryNegationNode(node: NumberUnaryNegationNode): any {
    node.operand.visit(this);
  }

  // binary operators
  visitAddOperationNode(node: AddOperationNode): any {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }
  visitSubtractOperationNode(node: SubtractOperationNode): any {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }
  visitMultiplyOperationNode(node: MultiplyOperationNode): any {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }
  visitIntDivisionOperationNode(node: IntDivisionOperationNode): any {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }

  visitPowerOperationNode(node: PowerOperationNode): void {
    throw Error("** not implemented");
  }

  protected declareVariable(node: VarDefinitionNode): void {
    const varName: string = node.variableName;

    if (this.frameStack[this.frameStack.length - 1].get(varName)) {
      throw new Error("Variable '" + varName + "' is already defined.");
    }
    this.frameStack[this.frameStack.length - 1].set(varName, node);
  }

  protected getVariableFrameIndex(variableName: string): number {
    let frameIndex = this.frameStack.length - 1;

    while (frameIndex >= 0 && !this.frameStack[frameIndex].get(variableName)) {
      frameIndex--;
    }

    return frameIndex;
  }

  protected visitStatements(firstStatement: StatementNode): void {
    let currentStatement: StatementNode | null = firstStatement;
    do {
      currentStatement.visit(this);

      currentStatement = currentStatement.nextStatement;
    } while (currentStatement);
  }

  public analyze(): void {

    // TEMP while working only with one function (no globals)
    this.frameStack.push(new Map());

    // @ts-ignore TEMP only passing statements for now.
    this.visitStatements(this.ast);
  }

}
