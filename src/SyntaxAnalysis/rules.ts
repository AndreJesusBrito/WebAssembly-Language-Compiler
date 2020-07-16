import { SyntaxRule } from "./SyntaxRule.ts";
import { TerminalGroup } from "./TerminalGroup.ts";

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

rules.program.setDerivation([rules.exp], [], "(", ...group.sumOp, "number");
// rules.program.setDerivation([], "eot");

rules.expression.setDerivation([rules.addExp], [], "(", ...group.sumOp, "number");


rules.addExp.setDerivation([rules.mulExp, rules.addExpPrime], [], "(", ...group.sumOp, "number");

rules.addExpPrime.setDerivation([group.sumOp, rules.mulExp, rules.addExpPrime], [], ...group.sumOp);
rules.addExpPrime.setDerivation([], [], ")", "eot");


rules.mulExp.setDerivation([rules.exponencialExp, rules.mulExpPrime], [], "(", ...group.sumOp, "number");

rules.mulExpPrime.setDerivation([group.mulOp, rules.exponencialExp, rules.mulExpPrime], [], ...group.mulOp);
rules.mulExpPrime.setDerivation([], [], ")", ...group.sumOp, "eot");


rules.exponencialExp.setDerivation([rules.value, rules.exponencialExpPrime], [], "(", ...group.sumOp, "number");

rules.exponencialExpPrime.setDerivation(["**", rules.value, rules.exponencialExp], [], "**");
rules.exponencialExpPrime.setDerivation([], [], ")", ...group.mulOp, ...group.sumOp, "eot");


rules.value.setDerivation(["(", rules.expression, ")"], [], "(");
rules.value.setDerivation([group.sumOp, rules.value], [], ...group.sumOp);
rules.value.setDerivation(["number"], [], "number");
