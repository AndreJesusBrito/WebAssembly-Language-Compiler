import { IVisitorAST } from "../TreeNodes/IVisitorAST";

import { ProgramNode } from "../TreeNodes/ProgramNode";
import { FunctionDefinitionNode } from "../TreeNodes/FunctionDeclarationNode";

import { NumberLiteralNode } from "../TreeNodes/NumberLiteralNode";
import { BooleanLiteralNode } from "../TreeNodes/BooleanLiteralNode";
import { NumberUnaryNegationNode } from "../TreeNodes/NumberUnaryNegationNode";
import { BooleanNegationNode } from "../TreeNodes/BooleanNegationNode";
import { BitwiseNegationNode } from "../TreeNodes/BitwiseNegationNode";
import { AddOperationNode } from "../TreeNodes/AddOperationNode";
import { SubtractOperationNode } from "../TreeNodes/SubtractOperationNode";
import { MultiplyOperationNode } from "../TreeNodes/MultiplyOperationNode";
import { IntDivisionOperationNode } from "../TreeNodes/IntDivisionOperationNode";
import { PowerOperationNode } from "../TreeNodes/PowerOperationNode";
import { BaseNode } from "../TreeNodes/BaseNode";
import { StatementSingleNode } from "../TreeNodes/StatementSingleNode";
import { StatementBlockNode } from "../TreeNodes/StatementBlockNode";
import { VarDefinitionNode } from "../TreeNodes/VarDefinitionNode";
import { StatementNode } from "../TreeNodes/StatementNode";
import { VarReferenceNode } from "../TreeNodes/VarReferenceNode";
import { AssignmentNode } from "../TreeNodes/AssignmentNode";
import { BooleanOrNode } from "../TreeNodes/BooleanOrNode";
import { BooleanXorNode } from "../TreeNodes/BooleanXorNode";
import { BooleanAndNode } from "../TreeNodes/BooleanAndNode";
import { BitwiseOrNode } from "../TreeNodes/BitwiseOrNode";
import { BitwiseXorNode } from "../TreeNodes/BitwiseXorNode";
import { BitwiseAndNode } from "../TreeNodes/BitwiseAndNode";
import { ConditionalOperatorNode } from "../TreeNodes/ConditionalOperatorNode";
import { IfStatementNode } from "../TreeNodes/IfStatementNode";
import { WhileStatementNode } from "../TreeNodes/WhileStatementNode";
import { StandardForStatementNode } from "../TreeNodes/StandardForStatementNode";
import { EqualsExpressionNode } from "../TreeNodes/EqualsExpressionNode";
import { NotEqualsExpressionNode } from "../TreeNodes/NotEqualsExpressionNode";
import { GreaterThanExpressionNode } from "../TreeNodes/GreaterThanExpressionNode";
import { GreaterOrEqualExpressionNode } from "../TreeNodes/GreaterOrEqualExpressionNode";
import { LessThanExpressionNode } from "../TreeNodes/LessThanExpressionNode";
import { LessOrEqualExpressionNode } from "../TreeNodes/LessOrEqualExpressionNode";
import { PreIncrementExpressionNode } from "../TreeNodes/PreIncrementExpressionNode";
import { PreDecrementExpressionNode } from "../TreeNodes/PreDecrementExpressionNode";
import { PosIncrementExpressionNode } from "../TreeNodes/PosIncrementExpressionNode";
import { PosDecrementExpressionNode } from "../TreeNodes/PosDecrementExpressionNode";
import { EmptyExpression } from "../TreeNodes/EmptyExpression";
import { EmptyStatement } from "../TreeNodes/EmptyStatement";
import { TrapStatementNode } from "../TreeNodes/TrapStatementNode";
import { FunctionCallNode } from "../TreeNodes/FunctionCallNode";


export class SemanticAnalyserPhase3 implements IVisitorAST {
  protected ast: BaseNode;

  constructor(ast: BaseNode) {
    this.ast = ast;
  }

  visitProgramNode(node: ProgramNode) {
    for (const [funcName,func] of node.functions) {
      func.visit(this);
    }
  }

  visitFunctionDefinitionNode(node: FunctionDefinitionNode) {
    this.visitStatements(node.body);
  }
  visitFunctionCallNode(node: FunctionCallNode) {}

  visitEmptyStatement(node: EmptyStatement): any {}
  visitEmptyExpression(node: EmptyExpression): any {}

  visitTrapStatementNode(node: TrapStatementNode): any {}

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

  visitIfStatementNode(node: IfStatementNode) {
    node.condition.visit(this);

    if (node.firstStatement) {
      this.visitStatements(node.firstStatement);
    }
    if (node.elseStatement) {
      this.visitStatements(node.elseStatement);
    }
  }


  visitWhileStatementNode(node: WhileStatementNode) {
    node.condition.visit(this);
    this.visitStatements(node.innerStatement);
  }

  visitStandardForStatementNode(node: StandardForStatementNode) {
    if (node.definitionSection) {
      node.definitionSection.visit(this);
    }

    if (!(node.conditionSection instanceof EmptyExpression)) {
      node.conditionSection.visit(this);
    }

    if (!(node.nextStepSection instanceof EmptyExpression)) {
      node.nextStepSection.visit(this);
    }

    this.visitStatements(node.innerStatement);
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

  visitBitwiseOrNode(node: BitwiseOrNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }
  visitBitwiseXorNode(node: BitwiseXorNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }
  visitBitwiseAndNode(node: BitwiseAndNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }


  visitAssignmentNode(node: AssignmentNode): void {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }

  visitConditionalOperatorNode(node: ConditionalOperatorNode) {
    node.condition.visit(this);
    node.firstExpression.visit(this);
    node.elseExpression.visit(this);
  }


  visitEqualsExpressionNode(node: EqualsExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }

  visitNotEqualsExpressionNode(node: NotEqualsExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }


  visitGreaterThanExpressionNode(node: GreaterThanExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }
  visitGreaterOrEqualExpressionNode(node: GreaterOrEqualExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }
  visitLessThanExpressionNode(node: LessThanExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }
  visitLessOrEqualExpressionNode(node: LessOrEqualExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }
  
  visitPreIncrementExpressionNode(node: PreIncrementExpressionNode) {
    node.operand.visit(this);
  }
  visitPreDecrementExpressionNode(node: PreDecrementExpressionNode) {
    node.operand.visit(this);
  }

  visitPosIncrementExpressionNode(node: PosIncrementExpressionNode) {
    node.operand.visit(this);
  }
  visitPosDecrementExpressionNode(node: PosDecrementExpressionNode) {
    node.operand.visit(this);
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
    this.ast.visit(this);
  }

}
