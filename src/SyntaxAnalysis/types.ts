import { SyntaxRule } from "./SyntaxRule";
import { TerminalGroup } from "./TerminalGroup";
import { BaseNode } from "../TreeNodes/BaseNode";
import { Token } from "../LexicalAnalysis/Token";

export type SyntaxSymbol = string | SyntaxRule | TerminalGroup;

export type ActionArgs = {
  grammarStack: SyntaxSymbol[],
  operatorStack: Token[],
  nodeStack: BaseNode[],
  identifierStack: Token[],
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
