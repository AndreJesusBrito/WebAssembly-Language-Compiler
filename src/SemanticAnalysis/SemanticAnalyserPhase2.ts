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
import { BinaryOperator } from "../TreeNodes/BinaryOperator";

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
import { ReturnStatementNode } from "../TreeNodes/ReturnStatementNode";
import { FunctionCallNode } from "../TreeNodes/FunctionCallNode";
import { IVarDefinition } from "../TreeNodes/IVarDefinition";


export class SemanticAnalyserPhase2 implements IVisitorAST {
  protected ast: ProgramNode;

  protected frameStack: Map<String, IVarDefinition>[] = [new Map()];

  constructor(ast: ProgramNode) {
    this.ast = ast;
  }
  


  visitProgramNode(node: ProgramNode) {
    for (const [funcName,func] of node.functions) {
      func.visit(this);
    }
  }

  visitFunctionDefinitionNode(node: FunctionDefinitionNode) {
    this.frameStack.push(new Map());

      // declare function arguments
      for (const arg of node.args) {
        this.declareVariable(arg);
      }

      this.visitStatements(node.body);
    this.frameStack.pop();
  }

  visitFunctionCallNode(node: FunctionCallNode) {
    const func = this.ast.functions.get(node.funcName);

    if (!func) {
      throw Error("Function '" + node.funcName + "' its not defined.");
    }

    // check arguments count
    if (node.args.length != func.args.length) {
      throw TypeError("Called function with " + node.args.length + " arguments but expected " + func.args.length);
    }

    // visit arguments and check them type
    for (let i = 0; i < node.args.length; i++) {
      node.args[i].visit(this);

      if (node.args[i].resultType !== func.args[i].datatype) {
        throw TypeError("Error: '" + func.args[i].variableName +
        "' argument type is '" + func.args[i].datatype + "' but '" + node.args[i].resultType + "' was passed");
      }
    }

    node.funcRef = func;
  }

  visitEmptyStatement(node: EmptyStatement) {}
  visitEmptyExpression(node: EmptyExpression) {}
  visitTrapStatementNode(node: TrapStatementNode) {
    if (node.condition && node.condition.resultType !== "bool") {
      throw new Error("trap unexpected boolean expression");
    }
  }

  visitReturnStatementNode(node: ReturnStatementNode) {
    // TODO: check if return matches return type from function
    if (node.expression) {
      node.expression.visit(this);
    }
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

  visitStandardForStatementNode(node: StandardForStatementNode) {
    this.frameStack.push(new Map());

    if (node.definitionSection) {
      node.definitionSection.visit(this);
    }

    if (!(node.conditionSection instanceof EmptyExpression)) {
      node.conditionSection.visit(this);
      if (node.conditionSection.resultType !== "bool") {
        throw Error("The for statement's Condition section must result in a boolean. Got '" + node.conditionSection.resultType + "' instead.")
      }
    }

    if (!(node.nextStepSection instanceof EmptyExpression)) {
      node.nextStepSection.visit(this);
    }

    this.visitStatements(node.innerStatement);

    this.frameStack.pop();
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


  protected declareVariable(node: IVarDefinition): void {
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
    this.frameStack.push(new Map());
    this.ast.visit(this);
  }

}
