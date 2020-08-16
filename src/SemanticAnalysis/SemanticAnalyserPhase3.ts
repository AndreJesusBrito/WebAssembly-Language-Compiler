import { IVisitorAST } from "../TreeNodes/IVisitorAST.ts";
import { NumberLiteralNode } from "../TreeNodes/NumberLiteralNode.ts";
import { BooleanLiteralNode } from "../TreeNodes/BooleanLiteralNode.ts";
import { NumberUnaryNegationNode } from "../TreeNodes/NumberUnaryNegationNode.ts";
import { BooleanNegationNode } from "../TreeNodes/BooleanNegationNode.ts";
import { BitwiseNegationNode } from "../TreeNodes/BitwiseNegationNode.ts";
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
import { AssignmentNode } from "../TreeNodes/AssignmentNode.ts";
import { BooleanOrNode } from "../TreeNodes/BooleanOrNode.ts";
import { BooleanXorNode } from "../TreeNodes/BooleanXorNode.ts";
import { BooleanAndNode } from "../TreeNodes/BooleanAndNode.ts";


export class SemanticAnalyserPhase3 implements IVisitorAST {
  protected ast: BaseNode;

  constructor(ast: BaseNode) {
    this.ast = ast;
  }

  visitNumberLiteralNode(node: NumberLiteralNode): any {}

  visitBooleanLiteralNode(node: BooleanLiteralNode):any {}

  visitStatementSingleNode(node: StatementSingleNode): any {
    node.innerExpression.visit(this);
  }

  visitStatementBlockNode(node: StatementBlockNode): void {
    if (node.innerStatement) {
      this.visitStatements(node.innerStatement);
    }
  }

  visitVarDefinitionNode(node: VarDefinitionNode): any {
    if (node.assignment) {
      node.assignment.visit(this);
    }

    this.declareVariable(node);
  }

  visitVarReferenceNode(node: VarReferenceNode): void {
    if (node.returnsValue && !node.definitionNode?.initialized) {
      console.warn("Variable '" + node.variableName + "' used but not initialized");
    }
  }

  // unary operators
  visitNumberUnaryNegationNode(node: NumberUnaryNegationNode): any {
    node.operand.visit(this);
  }
  visitBooleanNegationNode(node: BooleanNegationNode) {
    node.operand.visit(this);
  }
  visitBitwiseNegationNode(node: BitwiseNegationNode) {
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
    node.operand1.visit(this);
    node.operand2.visit(this);
  }


  visitBooleanOrNode(node: BooleanOrNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }
  visitBooleanXorNode(node: BooleanXorNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }
  visitBooleanAndNode(node: BooleanAndNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }


  visitAssignmentNode(node: AssignmentNode): void {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }

  protected declareVariable(node: VarDefinitionNode): void {
    if (node.readCount === 0) {
      console.warn("Variable '" + node.variableName + "' is declared but never used");
    }
  }

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
