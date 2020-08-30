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
import { BinaryOperator } from "../TreeNodes/BinaryOperator.ts";

import { BooleanOrNode } from "../TreeNodes/BooleanOrNode.ts";
import { BooleanXorNode } from "../TreeNodes/BooleanXorNode.ts";
import { BooleanAndNode } from "../TreeNodes/BooleanAndNode.ts";

import { BitwiseOrNode } from "../TreeNodes/BitwiseOrNode.ts";
import { BitwiseXorNode } from "../TreeNodes/BitwiseXorNode.ts";
import { BitwiseAndNode } from "../TreeNodes/BitwiseAndNode.ts";
import { ConditionalOperatorNode } from "../TreeNodes/ConditionalOperatorNode.ts";
import { IfStatementNode } from "../TreeNodes/IfStatementNode.ts";
import { WhileStatementNode } from "../TreeNodes/WhileStatementNode.ts";
import { EqualsExpressionNode } from "../TreeNodes/EqualsExpressionNode.ts";
import { NotEqualsExpressionNode } from "../TreeNodes/NotEqualsExpressionNode.ts";
import { GreaterThanExpressionNode } from "../TreeNodes/GreaterThanExpressionNode.ts";
import { GreaterOrEqualExpressionNode } from "../TreeNodes/GreaterOrEqualExpressionNode.ts";
import { LessThanExpressionNode } from "../TreeNodes/LessThanExpressionNode.ts";
import { LessOrEqualExpressionNode } from "../TreeNodes/LessOrEqualExpressionNode.ts";


export class SemanticAnalyserPhase2 implements IVisitorAST {
  protected ast: BaseNode;

  protected frameStack: Map<String, VarDefinitionNode>[] = [new Map()];

  constructor(ast: BaseNode) {
    this.ast = ast;
  }

  visitNumberLiteralNode(node: NumberLiteralNode): any {}

  visitBooleanLiteralNode(node: BooleanLiteralNode): any {}

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

  visitIfStatementNode(node: IfStatementNode) {
    node.condition.visit(this);
    if (node.condition.resultType !== "bool") {
      throw Error("The If statement's condition must result in a boolean. Got '" + node.condition.resultType + "' instead.")
    }

    if (node.firstStatement) {
      this.visitStatements(node.firstStatement);
    }
    if (node.elseStatement) {
      this.visitStatements(node.elseStatement);
    }
  }

  visitWhileStatementNode(node: WhileStatementNode): any {
    node.condition.visit(this);
    if (node.condition.resultType !== "bool") {
      throw Error("The while statement's condition must result in a boolean. Got '" + node.condition.resultType + "' instead.")
    }

    this.visitStatements(node.innerStatement);
  }

  visitVarDefinitionNode(node: VarDefinitionNode): any {
    if (node.assignment) {
      node.writeCount++;
      node.assignment.visit(this);

      // check if assign result is compatible with the variable
      if (node.datatype !== node.assignment.resultType) {
        throw new Error("Value of type '" +  node.assignment.resultType  +  "' cannot be assigned to variable of type '" + node.datatype + "'");
      }
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
      throw Error("Variable '" + node.variableName + "' is not defined");
    }

    const definitionNode = this.frameStack[variableFrameIndex].get(node.variableName);

    if (definitionNode) {
      // a new reference to the variable
      definitionNode.readCount++;

      node.definitionNode = definitionNode;
    } else {
      node.definitionNode = null;
    }
  }

  // unary operators
  visitNumberUnaryNegationNode(node: NumberUnaryNegationNode): any {
    node.operand.visit(this);
  }

  visitBooleanNegationNode(node: BooleanNegationNode) {
    node.operand.visit(this);

    if (node.operand.resultType !== "bool") {
      throw new Error("unexpected boolean expression here");
    }
  }

  visitBitwiseNegationNode(node: BitwiseNegationNode) {
    node.operand.visit(this);

    if (node.operand.resultType !== "i32") {
      throw new Error("unexpected integer expression here");
    }
  }


  // binary operators
  visitAddOperationNode(node: AddOperationNode): any {
    this.checkArithmeticBinOperator(node);
  }
  visitSubtractOperationNode(node: SubtractOperationNode): any {
    this.checkArithmeticBinOperator(node);
  }
  visitMultiplyOperationNode(node: MultiplyOperationNode): any {
    this.checkArithmeticBinOperator(node);
  }
  visitIntDivisionOperationNode(node: IntDivisionOperationNode): any {
    this.checkArithmeticBinOperator(node);
  }

  visitPowerOperationNode(node: PowerOperationNode): void {
    throw Error("** not implemented");
  }


  visitBooleanOrNode(node: BooleanOrNode) {
    this.checkBooleanBinOperator(node);
  }

  visitBooleanXorNode(node: BooleanXorNode) {
    this.checkBooleanBinOperator(node);
  }
  
  visitBooleanAndNode(node: BooleanAndNode) {
    this.checkBooleanBinOperator(node);
  }



  visitBitwiseOrNode(node: BitwiseOrNode) {
    this.checkArithmeticBinOperator(node);
  }

  visitBitwiseXorNode(node: BitwiseXorNode) {
    this.checkArithmeticBinOperator(node);
  }
  
  visitBitwiseAndNode(node: BitwiseAndNode) {
    this.checkArithmeticBinOperator(node);
  }


  visitAssignmentNode(node: AssignmentNode): void {
    node.operand1.visit(this);
    node.operand2.visit(this);
  }

  visitConditionalOperatorNode(node: ConditionalOperatorNode) {
    node.condition.visit(this);

    if (node.condition.resultType !== "bool") {
      throw Error("Conditional Operator's condition must result in a boolean. Got '" + node.condition.resultType + "' instead.");
    }

    node.firstExpression.visit(this);
    node.elseExpression.visit(this);

    // TODO check type compatibility more accurately
    if (node.firstExpression.resultType !== node.elseExpression.resultType) {
      throw Error("Conditional operator's options must result in compatible types. The types '"
                 + node.firstExpression.resultType + "' and '" + node.elseExpression.resultType + "' are not compatible.");
    }
  }

  visitEqualsExpressionNode(node: EqualsExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
    if (node.operand1.resultType !== node.operand2.resultType) {
      throw Error("Incompatible types");
    }
  }

  visitNotEqualsExpressionNode(node: NotEqualsExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
    if (node.operand1.resultType !== node.operand2.resultType) {
      throw Error("Incompatible types");
    }
  }


  visitGreaterThanExpressionNode(node: GreaterThanExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
    if (node.operand1.resultType !== "i32" || node.operand2.resultType !== "i32") {
      throw Error("Incompatible types");
    }
  }
  visitGreaterOrEqualExpressionNode(node: GreaterOrEqualExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
    if (node.operand1.resultType !== "i32" || node.operand2.resultType !== "i32") {
      throw Error("Incompatible types");
    }
  }
  visitLessThanExpressionNode(node: LessThanExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
    if (node.operand1.resultType !== "i32" || node.operand2.resultType !== "i32") {
      throw Error("Incompatible types");
    }
  }
  visitLessOrEqualExpressionNode(node: LessOrEqualExpressionNode) {
    node.operand1.visit(this);
    node.operand2.visit(this);
    if (node.operand1.resultType !== "i32" || node.operand2.resultType !== "i32") {
      throw Error("Incompatible types");
    }
  }


  protected checkArithmeticBinOperator(node: BinaryOperator): void {
    node.operand1.visit(this);
    node.operand2.visit(this);

    // TEMP TODO support other number types
    if (node.operand1.resultType !== "i32" || node.operand2.resultType !== "i32") {
      throw new Error("Operands of type '" + node.operand1.resultType + "' and '" + node.operand2.resultType + "' are not defined for operator {TODO: ADD OPERATOR HERE}");
    }
  }

  protected checkBooleanBinOperator(node: BinaryOperator): void {
    node.operand1.visit(this);
    node.operand2.visit(this);

    // TEMP TODO support other number types
    if (node.operand1.resultType !== "bool" || node.operand2.resultType !== "bool") {
      throw new Error("Operands of type '" + node.operand1.resultType + "' and '" + node.operand2.resultType + "' are not defined for operator {TODO: ADD OPERATOR HERE}");
    }
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
