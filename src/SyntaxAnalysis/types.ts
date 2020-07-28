import { SyntaxRule } from "./SyntaxRule.ts";
import { TerminalGroup } from "./TerminalGroup.ts";
import { BaseNode } from "../TreeNodes/BaseNode.ts";
import { Token } from "../LexicalAnalysis/Token.ts";

export type SyntaxSymbol = string | SyntaxRule | TerminalGroup;

export type ActionArgs = {
  grammarStack: SyntaxSymbol[],
  operatorStack: Token[],
  nodeStack: BaseNode[],
  currentTokenPos: number,
  tokens: Token[],
}

export type ActionObj = {
  index: (currentIndex: number) => number,
  func: (
    args: ActionArgs
    ) => void,
};

export type RuleDerivation = {
  derivationSymbols: SyntaxSymbol[],
  actions: ActionObj[],
};
