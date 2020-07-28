import { NumberLiteralNode } from "./NumberLiteralNode.ts";

import { StatementSingleNode } from "./StatementSingleNode.ts";
import { StatementBlockNode } from "./StatementBlockNode.ts";

import { NumberUnaryNegationNode } from "./NumberUnaryNegationNode.ts";

import { AddOperationNode } from "./AddOperationNode.ts";
import { SubtractOperationNode } from "./SubtractOperationNode.ts";
import { MultiplyOperationNode } from "./MultiplyOperationNode.ts";
import { IntDivisionOperationNode } from "./IntDivisionOperationNode.ts";
import { PowerOperationNode } from "./PowerOperationNode.ts";



export interface IVisitorAST {
  // literals
  visitNumberLiteralNode(node: NumberLiteralNode): any;

  visitStatementSingleNode(node: StatementSingleNode): any;
  visitStatementBlockNode(node: StatementBlockNode): any;

  // unary operators
  visitNumberUnaryNegationNode(node: NumberUnaryNegationNode): any;

  // binary operators
  visitAddOperationNode(node: AddOperationNode): any;
  visitSubtractOperationNode(node: SubtractOperationNode): any;
  visitMultiplyOperationNode(node: MultiplyOperationNode): any;
  visitIntDivisionOperationNode(node: IntDivisionOperationNode): any;
  visitPowerOperationNode(node: PowerOperationNode): any;

}