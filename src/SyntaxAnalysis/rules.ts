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


export const rules: {
  [key: string]: SyntaxRule
} = {
  program: new SyntaxRule("program"),
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

function createBinOperatorNode(grammarStack: SyntaxSymbol[], operatorStack: Token[], nodeStack: BaseNode[]): void {
  const op2 = nodeStack.pop() || false;
  const op1 = nodeStack.pop() || false;

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
  const number = nodeStack.pop() || false;
  nodeStack.push(new NumberUnaryNegationNode(number));
}

rules.program.setDerivation([rules.expression], [], "(", ...group.sumOp, "number");
// rules.program.setDerivation([], "eot");

rules.expression.setDerivation([rules.addExp], [], "(", ...group.sumOp, "number");


rules.addExp.setDerivation([rules.mulExp, rules.addExpPrime], [], "(", ...group.sumOp, "number");

rules.addExpPrime.setDerivation(
  [group.sumOp, rules.mulExp, rules.addExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.sumOp,
);
rules.addExpPrime.setDerivation([], [], ")", "eot");


rules.mulExp.setDerivation([rules.exponencialExp, rules.mulExpPrime], [], "(", ...group.sumOp, "number");

rules.mulExpPrime.setDerivation(
  [group.mulOp, rules.exponencialExp, rules.mulExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.mulOp,
);
rules.mulExpPrime.setDerivation([], [], ")", ...group.sumOp, "eot");


rules.exponencialExp.setDerivation([rules.value, rules.exponencialExpPrime], [], "(", ...group.sumOp, "number");

rules.exponencialExpPrime.setDerivation(
  ["**", rules.value, rules.exponencialExpPrime],
  [{ index: fnPreviousIndex, func: createBinOperatorNode }],
  "**",
);
rules.exponencialExpPrime.setDerivation([], [], ")", ...group.mulOp, ...group.sumOp, "eot");


rules.value.setDerivation(["(", rules.expression, ")"], [], "(");
rules.value.setDerivation(["+", rules.value], [], "+");
rules.value.setDerivation(
  ["-", rules.value],
  [{ index: fnPreviousIndex, func: createNumberUnaryNegationNode }],
  "-"
);
rules.value.setDerivation(["number"], [], "number");
