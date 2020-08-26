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
import { BitwiseNegationNode } from "./BitwiseNegationNode.ts";



export interface IVisitorAST {
  // literals
  visitNumberLiteralNode(node: NumberLiteralNode): any;
  visitBooleanLiteralNode(node: BooleanLiteralNode): any;

  visitStatementSingleNode(node: StatementSingleNode): any;
  visitStatementBlockNode(node: StatementBlockNode): any;

  visitVarDefinitionNode(node: VarDefinitionNode): any;
  visitVarReferenceNode(node: VarReferenceNode): any;


  // unary operators
  visitNumberUnaryNegationNode(node: NumberUnaryNegationNode): any;
  visitBooleanNegationNode(node: BooleanNegationNode): any;
  visitBitwiseNegationNode(node: BitwiseNegationNode): any;


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

}