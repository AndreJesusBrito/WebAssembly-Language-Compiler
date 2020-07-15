import { SyntaxRule } from "./SyntaxRule.ts";
import { TerminalGroup } from "./TerminalGroup.ts";

export type SyntaxSymbol = string | SyntaxRule | TerminalGroup;

export type ActionObj = {
  index: number,
  func: () => any,
};

export type RuleDerivation = {
  derivationSymbols: SyntaxSymbol[],
  actions: ActionObj[],
};
