import { SyntaxRule } from "./SyntaxRule.ts";
import { TerminalGroup } from "./TerminalGroup.ts";
import { SyntaxSymbol } from "./types.ts";
import { Token } from "../LexicalAnalysis/Token.ts";

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

function createStatementSingleNode(grammarStack: SyntaxSymbol[], operatorStack: Token[], nodeStack: BaseNode[]): void {
  const expression = nodeStack.pop() || new EmptyExpression();
  nodeStack.push(new StatementSingleNode(expression));
}

function createStatementBlockNode(grammarStack: SyntaxSymbol[], operatorStack: Token[], nodeStack: BaseNode[]): void {
  const statement: BaseNode = nodeStack[nodeStack.length-1] || null;

  if (statement instanceof StatementNode) {
    nodeStack.pop();
    nodeStack.push(new StatementBlockNode(statement));
  }
}

function joinStatements(grammarStack: SyntaxSymbol[], operatorStack: Token[], nodeStack: BaseNode[]): void {
  const nextStmt = nodeStack.pop();
  const previousStmt = nodeStack[nodeStack.length-1];

  if (previousStmt instanceof StatementNode) {
    // @ts-ignore might be a ts bug
    previousStmt.nextStatement = nextStmt;
  } else if (nextStmt !== undefined) {
    nodeStack.push(nextStmt);
  }
}

function createBinOperatorNode(grammarStack: SyntaxSymbol[], operatorStack: Token[], nodeStack: BaseNode[]): void {
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

function createNumberUnaryNegationNode(grammarStack: SyntaxSymbol[], operatorStack: Token[], nodeStack: BaseNode[]) {
  console.assert(operatorStack.pop()?.content === '-', "createNumberUnaryNegationNode check");
  const number = nodeStack.pop() || new EmptyExpression();
  nodeStack.push(new NumberUnaryNegationNode(number));
}

rules.program.setDerivation([rules.statement], [], "{", ";", "(", ...group.sumOp, "number");
// rules.program.setDerivation([], "eot");

rules.statement.setDerivation(
  ["{", rules.statement, "}", rules.statementPrime],
  [{index: fnCurrentIndex, func: createStatementBlockNode}],
  "{"
);
rules.statement.setDerivation([";", rules.statementPrime], [], ";");
rules.statement.setDerivation(
  [rules.expression, ";", rules.statementPrime],
  [{index: fnCurrentIndex, func: createStatementSingleNode}],
  "(", ...group.sumOp, "number"
);

rules.statementPrime.setDerivation(
  [rules.statement],
  [{index: fnPreviousIndex, func: joinStatements}],
  "{",  ";", "(", ...group.sumOp, "number"
);
rules.statementPrime.setDerivation([], [], "}", "eot");


rules.expression.setDerivation([rules.addExp], [], "(", ...group.sumOp, "number");


rules.addExp.setDerivation([rules.mulExp, rules.addExpPrime], [], "(", ...group.sumOp, "number");

rules.addExpPrime.setDerivation(
  [group.sumOp, rules.mulExp, rules.addExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.sumOp,
);
rules.addExpPrime.setDerivation([], [], ")", ";", "}", "eot");


rules.mulExp.setDerivation([rules.exponencialExp, rules.mulExpPrime], [], "(", ...group.sumOp, "number");

rules.mulExpPrime.setDerivation(
  [group.mulOp, rules.exponencialExp, rules.mulExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.mulOp,
);
rules.mulExpPrime.setDerivation([], [], ")", ...group.sumOp, ";", "}", "eot");


rules.exponencialExp.setDerivation([rules.value, rules.exponencialExpPrime], [], "(", ...group.sumOp, "number");

rules.exponencialExpPrime.setDerivation(
  ["**", rules.value, rules.exponencialExpPrime],
  [{ index: fnPreviousIndex, func: createBinOperatorNode }],
  "**",
);
rules.exponencialExpPrime.setDerivation([], [], ")", ...group.mulOp, ...group.sumOp, ";", "}", "eot");


rules.value.setDerivation(["(", rules.expression, ")"], [], "(");
rules.value.setDerivation(["+", rules.value], [], "+");
rules.value.setDerivation(
  ["-", rules.value],
  [{ index: fnPreviousIndex, func: createNumberUnaryNegationNode }],
  "-"
);
rules.value.setDerivation(["number"], [], "number");
