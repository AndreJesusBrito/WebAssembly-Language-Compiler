import { NumberLiteralNode } from "./NumberLiteralNode";
import { BooleanLiteralNode } from "./BooleanLiteralNode";

import { StatementSingleNode } from "./StatementSingleNode";
import { StatementBlockNode } from "./StatementBlockNode";

import { VarDefinitionNode } from "./VarDefinitionNode";

import { NumberUnaryNegationNode } from "./NumberUnaryNegationNode";
import { BooleanNegationNode } from "./BooleanNegationNode";

import { AddOperationNode } from "./AddOperationNode";
import { SubtractOperationNode } from "./SubtractOperationNode";
import { MultiplyOperationNode } from "./MultiplyOperationNode";
import { IntDivisionOperationNode } from "./IntDivisionOperationNode";
import { PowerOperationNode } from "./PowerOperationNode";

import { BooleanOrNode } from "./BooleanOrNode";
import { BooleanXorNode } from "./BooleanXorNode";
import { BooleanAndNode } from "./BooleanAndNode";

import { BitwiseOrNode } from "./BitwiseOrNode";
import { BitwiseXorNode } from "./BitwiseXorNode";
import { BitwiseAndNode } from "./BitwiseAndNode";

import { VarReferenceNode } from "./VarReferenceNode";
import { AssignmentNode } from "./AssignmentNode";
import { ConditionalOperatorNode } from "./ConditionalOperatorNode";
import { BitwiseNegationNode } from "./BitwiseNegationNode";
import { PreIncrementExpressionNode } from "./PreIncrementExpressionNode";
import { PreDecrementExpressionNode } from "./PreDecrementExpressionNode";
import { PosIncrementExpressionNode } from "./PosIncrementExpressionNode";
import { PosDecrementExpressionNode } from "./PosDecrementExpressionNode";
import { IfStatementNode } from "./IfStatementNode";

import { WhileStatementNode } from "./WhileStatementNode";
import { StandardForStatementNode } from "./StandardForStatementNode";

import { EqualsExpressionNode } from "./EqualsExpressionNode";
import { NotEqualsExpressionNode } from "./NotEqualsExpressionNode";7

import { GreaterThanExpressionNode } from "./GreaterThanExpressionNode";
import { GreaterOrEqualExpressionNode } from "./GreaterOrEqualExpressionNode";
import { LessThanExpressionNode } from "./LessThanExpressionNode";
import { LessOrEqualExpressionNode } from "./LessOrEqualExpressionNode";

import { EmptyExpression } from "./EmptyExpression";
import { EmptyStatement } from "./EmptyStatement";



export interface IVisitorAST {
  // literals
  visitNumberLiteralNode(node: NumberLiteralNode): any;
  visitBooleanLiteralNode(node: BooleanLiteralNode): any;

  visitStatementSingleNode(node: StatementSingleNode): any;
  visitStatementBlockNode(node: StatementBlockNode): any;

  visitIfStatementNode(node: IfStatementNode): any;

  visitWhileStatementNode(node: WhileStatementNode): any;
  visitStandardForStatementNode(node: StandardForStatementNode): any;


  visitVarDefinitionNode(node: VarDefinitionNode): any;
  visitVarReferenceNode(node: VarReferenceNode): any;


  // unary operators
  visitNumberUnaryNegationNode(node: NumberUnaryNegationNode): any;
  visitBooleanNegationNode(node: BooleanNegationNode): any;
  visitBitwiseNegationNode(node: BitwiseNegationNode): any;

  visitPreIncrementExpressionNode(node: PreIncrementExpressionNode): any;
  visitPreDecrementExpressionNode(node: PreDecrementExpressionNode): any;

  visitPosIncrementExpressionNode(node: PosIncrementExpressionNode): any;
  visitPosDecrementExpressionNode(node: PosDecrementExpressionNode): any;


  // binary operators
  visitAddOperationNode(node: AddOperationNode): any;
  visitSubtractOperationNode(node: SubtractOperationNode): any;
  visitMultiplyOperationNode(node: MultiplyOperationNode): any;
  visitIntDivisionOperationNode(node: IntDivisionOperationNode): any;
  visitPowerOperationNode(node: PowerOperationNode): any;

  visitBooleanOrNode(node: BooleanOrNode): any;
  visitBooleanXorNode(node: BooleanXorNode): any;
  visitBooleanAndNode(node: BooleanAndNode): any;

  visitBitwiseOrNode(node: BitwiseOrNode): any;
  visitBitwiseXorNode(node: BitwiseXorNode): any;
  visitBitwiseAndNode(node: BitwiseAndNode): any;

  visitAssignmentNode(node: AssignmentNode): any;



  visitConditionalOperatorNode(node: ConditionalOperatorNode): any;


  visitEqualsExpressionNode(node: EqualsExpressionNode): any;
  visitNotEqualsExpressionNode(node: NotEqualsExpressionNode): any;

  visitGreaterThanExpressionNode(node: GreaterThanExpressionNode): any;
  visitGreaterOrEqualExpressionNode(node: GreaterOrEqualExpressionNode): any;
  visitLessThanExpressionNode(node: LessThanExpressionNode): any;
  visitLessOrEqualExpressionNode(node: LessOrEqualExpressionNode): any;


  visitEmptyStatement(node: EmptyStatement): any;
  visitEmptyExpression(node: EmptyExpression): any;
}