import { NumberLiteralNode } from "./NumberLiteralNode.ts";
import { BooleanLiteralNode } from "./BooleanLiteralNode.ts";

import { StatementSingleNode } from "./StatementSingleNode.ts";
import { StatementBlockNode } from "./StatementBlockNode.ts";

import { VarDefinitionNode } from "./VarDefinitionNode.ts";

import { NumberUnaryNegationNode } from "./NumberUnaryNegationNode.ts";
import { BooleanNegationNode } from "./BooleanNegationNode.ts";

import { AddOperationNode } from "./AddOperationNode.ts";
import { SubtractOperationNode } from "./SubtractOperationNode.ts";
import { MultiplyOperationNode } from "./MultiplyOperationNode.ts";
import { IntDivisionOperationNode } from "./IntDivisionOperationNode.ts";
import { PowerOperationNode } from "./PowerOperationNode.ts";

import { BooleanOrNode } from "./BooleanOrNode.ts";
import { BooleanXorNode } from "./BooleanXorNode.ts";
import { BooleanAndNode } from "./BooleanAndNode.ts";

import { BitwiseOrNode } from "./BitwiseOrNode.ts";
import { BitwiseXorNode } from "./BitwiseXorNode.ts";
import { BitwiseAndNode } from "./BitwiseAndNode.ts";

import { VarReferenceNode } from "./VarReferenceNode.ts";
import { AssignmentNode } from "./AssignmentNode.ts";
import { ConditionalOperatorNode } from "./ConditionalOperatorNode.ts";
import { BitwiseNegationNode } from "./BitwiseNegationNode.ts";
import { PreIncrementExpressionNode } from "./PreIncrementExpressionNode.ts";
import { PreDecrementExpressionNode } from "./PreDecrementExpressionNode.ts";
import { IfStatementNode } from "./IfStatementNode.ts";

import { WhileStatementNode } from "./WhileStatementNode.ts";

import { EqualsExpressionNode } from "./EqualsExpressionNode.ts";
import { NotEqualsExpressionNode } from "./NotEqualsExpressionNode.ts";7

import { GreaterThanExpressionNode } from "./GreaterThanExpressionNode.ts";
import { GreaterOrEqualExpressionNode } from "./GreaterOrEqualExpressionNode.ts";
import { LessThanExpressionNode } from "./LessThanExpressionNode.ts";
import { LessOrEqualExpressionNode } from "./LessOrEqualExpressionNode.ts";



export interface IVisitorAST {
  // literals
  visitNumberLiteralNode(node: NumberLiteralNode): any;
  visitBooleanLiteralNode(node: BooleanLiteralNode): any;

  visitStatementSingleNode(node: StatementSingleNode): any;
  visitStatementBlockNode(node: StatementBlockNode): any;

  visitIfStatementNode(node: IfStatementNode): any;

  visitWhileStatementNode(node: WhileStatementNode): any;


  visitVarDefinitionNode(node: VarDefinitionNode): any;
  visitVarReferenceNode(node: VarReferenceNode): any;


  // unary operators
  visitNumberUnaryNegationNode(node: NumberUnaryNegationNode): any;
  visitBooleanNegationNode(node: BooleanNegationNode): any;
  visitBitwiseNegationNode(node: BitwiseNegationNode): any;
  visitPreIncrementExpressionNode(node: PreIncrementExpressionNode): any;
  visitPreDecrementExpressionNode(node: PreDecrementExpressionNode): any;


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

}