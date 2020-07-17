import { SyntaxRule } from "./SyntaxRule.ts";
import { TerminalGroup } from "./TerminalGroup.ts";
import { BaseNode } from "../TreeNodes/BaseNode.ts";
import { Token } from "../LexicalAnalysis/Token.ts";

export type SyntaxSymbol = string | SyntaxRule | TerminalGroup;

export type ActionObj = {
  index: (currentIndex: number) => number,
  func: (
    grammarStack: SyntaxSymbol[],
    operatorStack: Token[],
    nodeStack: BaseNode[],
  ) => void,
};

export type RuleDerivation = {
  derivationSymbols: SyntaxSymbol[],
  actions: ActionObj[],
};
