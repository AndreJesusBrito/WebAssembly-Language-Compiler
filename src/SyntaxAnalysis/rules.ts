import { SyntaxRule } from "./SyntaxRule.ts";
import { TerminalGroup } from "./TerminalGroup.ts";
import { ActionArgs } from "./types.ts";

import { BaseNode } from "../TreeNodes/BaseNode.ts";
import { AddOperationNode } from "../TreeNodes/AddOperationNode.ts";
import { SubtractOperationNode } from "../TreeNodes/SubtractOperationNode.ts";
import { MultiplyOperationNode } from "../TreeNodes/MultiplyOperationNode.ts";
import { IntDivisionOperationNode } from "../TreeNodes/IntDivisionOperationNode.ts";
import { NumberUnaryNegationNode } from "../TreeNodes/NumberUnaryNegationNode.ts";
import { PowerOperationNode } from "../TreeNodes/PowerOperationNode.ts";

import { EmptyExpression } from "../TreeNodes/EmptyExpression.ts";
import { StatementNode } from "../TreeNodes/StatementNode.ts";
import { StatementSingleNode } from "../TreeNodes/StatementSingleNode.ts";
import { StatementBlockNode } from "../TreeNodes/StatementBlockNode.ts";

export const rules: {
  [key: string]: SyntaxRule
} = {
  program: new SyntaxRule("program"),
  statement: new SyntaxRule("statement"),
  statementPrime: new SyntaxRule("statementPrime"),
  varDefinition: new SyntaxRule("varDefinition"),
  varDefinitionAssign: new SyntaxRule("varDefinitionAssign"),
  expression: new SyntaxRule("exp"),
  exponencialExp: new SyntaxRule("exponencialExp"),
  exponencialExpPrime: new SyntaxRule("exponencialExpPrime"),
  mulExp: new SyntaxRule("mulExp"),
  mulExpPrime: new SyntaxRule("mulExpPrime"),
  addExp: new SyntaxRule("addExp"),
  addExpPrime: new SyntaxRule("addExpPrime"),
  value: new SyntaxRule("value"),
};

export const group: {
  [key: string]: TerminalGroup
} = {
  sumOp: new TerminalGroup(["+", "-"]),
  mulOp: new TerminalGroup(["*", "/", "\\", "%"]),
};

// left to right associativity
function fnCurrentIndex(currentIndex: number): number {
  return currentIndex;
}

// right to left associativity
function fnPreviousIndex(currentIndex: number): number {
  return currentIndex - 1;
}

function createStatementSingleNode(args: ActionArgs): void {
  const {nodeStack} = args;

  const expression = nodeStack.pop() || new EmptyExpression();
  nodeStack.push(new StatementSingleNode(expression));
}

function createStatementBlockNode(args: ActionArgs): void {
  const {nodeStack} = args

  const statement: BaseNode = nodeStack[nodeStack.length-1] || null;

  if (statement instanceof StatementNode) {
    nodeStack.pop();
    nodeStack.push(new StatementBlockNode(statement));
  }
}

function joinStatements(args: ActionArgs): void {
  const { nodeStack } = args

  const nextStmt = nodeStack.pop();
  const previousStmt = nodeStack[nodeStack.length-1];

  if (previousStmt instanceof StatementNode) {
    // @ts-ignore might be a ts bug
    previousStmt.nextStatement = nextStmt;
  } else if (nextStmt !== undefined) {
    nodeStack.push(nextStmt);
  }
}

function createBinOperatorNode(args: ActionArgs): void {
  const {operatorStack, nodeStack} = args;

  const op2 = nodeStack.pop() || new EmptyExpression();
  const op1 = nodeStack.pop() || new EmptyExpression();

  switch (operatorStack.pop()?.content) {
    case '+':
      nodeStack.push(new AddOperationNode(op1, op2));
      break;

    case '-':
      nodeStack.push(new SubtractOperationNode(op1, op2));
      break;

    case '*':
      nodeStack.push(new MultiplyOperationNode(op1, op2));
      break;

    case '/': // TEMP only working with i32 for now
    case '\\':
      nodeStack.push(new IntDivisionOperationNode(op1, op2));
      break;

    case '**':
      nodeStack.push(new PowerOperationNode(op1, op2));
      break;
  }
}

function createNumberUnaryNegationNode(args: ActionArgs) {
  const { operatorStack, nodeStack } = args

  console.assert(operatorStack.pop()?.content === '-', "createNumberUnaryNegationNode check");
  const number = nodeStack.pop() || new EmptyExpression();
  nodeStack.push(new NumberUnaryNegationNode(number));
}

rules.program.setDerivation([rules.statement], [], ";", "{", "i32", "id", "(", "+", "-", "number");
// rules.program.setDerivation([], "eot");

rules.statement.setDerivation(
  ["{", rules.statementPrime, "}", rules.statementPrime],
  [{index: fnCurrentIndex, func: createStatementBlockNode}],
  "{"
);
rules.statement.setDerivation([";", rules.statementPrime], [], ";");
rules.statement.setDerivation(
  [rules.expression, ";", rules.statementPrime],
  [{index: fnCurrentIndex, func: createStatementSingleNode}],
  "id", "+", "-", "(", "number"
);
rules.statement.setDerivation(
  [rules.varDefinition, ";", rules.statementPrime],
  [{index: fnCurrentIndex, func: createStatementSingleNode}],
  "i32"
);

rules.statementPrime.setDerivation(
  [rules.statement],
  [{index: fnPreviousIndex, func: joinStatements}],
  ";", "{", "i32", "id", "+", "-", "(", "number"
);
rules.statementPrime.setDerivation([], [], "}", "eot");


rules.varDefinition.setDerivation(["i32", "id", rules.varDefinitionAssign], [], "i32");

rules.varDefinitionAssign.setDerivation(["=", rules.expression], [], "=");
rules.varDefinitionAssign.setDerivation([], [], ";");


rules.expression.setDerivation([rules.addExp], [], "id", "+", "-", "(", "number");


rules.addExp.setDerivation([rules.mulExp, rules.addExpPrime], [], "id", "+", "-", "(", "number");

rules.addExpPrime.setDerivation(
  [group.sumOp, rules.mulExp, rules.addExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.sumOp,
);
rules.addExpPrime.setDerivation([], [], ";", ")");


rules.mulExp.setDerivation([rules.exponencialExp, rules.mulExpPrime], [], "id", "+", "-", "(", "number");

rules.mulExpPrime.setDerivation(
  [group.mulOp, rules.exponencialExp, rules.mulExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.mulOp,
);
rules.mulExpPrime.setDerivation([], [], ";", ...group.sumOp, ")");


rules.exponencialExp.setDerivation([rules.value, rules.exponencialExpPrime], [], "id", "+", "-", "(", "number");

rules.exponencialExpPrime.setDerivation(
  ["**", rules.value, rules.exponencialExpPrime],
  [{ index: fnPreviousIndex, func: createBinOperatorNode }],
  "**",
);
rules.exponencialExpPrime.setDerivation([], [], ";", ...group.sumOp, ...group.mulOp, ")");


rules.value.setDerivation(["(", rules.expression, ")"], [], "(");
rules.value.setDerivation(["+", rules.value], [], "+");
rules.value.setDerivation(
  ["-", rules.value],
  [{ index: fnPreviousIndex, func: createNumberUnaryNegationNode }],
  "-"
);
rules.value.setDerivation(["number"], [], "number");
