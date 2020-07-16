import { SyntaxRule } from "./SyntaxRule.ts";
import { TerminalGroup } from "./TerminalGroup.ts";
import { Token } from "../LexicalAnalysis/Token.ts";
import { TokenType } from "../LexicalAnalysis/Token.ts";
import { SyntaxSymbol, RuleDerivation } from "./types.ts";


import { rules } from "./rules.ts";



export function parse(tokens: Token[]): boolean {
  const grammarStack: SyntaxSymbol[] = ["eot", rules.program];
  const operatorStack: Token[] = [];

  let currentPos = 0;

  while (grammarStack.length > 0 && currentPos < tokens.length) {
    let currentSymbol: SyntaxSymbol = grammarStack[grammarStack.length-1];
    let currentToken: Token = tokens[currentPos];

    if (currentSymbol instanceof SyntaxRule) {
      const ruleRes: RuleDerivation = currentSymbol.getDerivation(getTokenSymbol(currentToken));
      grammarStack.pop();

      // if (ruleRes == null)
      //   return false;

      grammarStack.push(...ruleRes.derivationSymbols);
    }
    else if (currentSymbol === getTokenSymbol(currentToken) || currentSymbol instanceof TerminalGroup) {
      // parsing successfull, returns ast
      if (currentToken.type === TokenType.EOT)
        return true;


      switch (currentToken.type) {
        case TokenType.OPERATOR:
          operatorStack.push(currentToken);
          break;

      }

      currentPos++;
      grammarStack.pop();

      console.assert(
        getTokenSymbol(currentToken) === currentSymbol
        || currentSymbol instanceof TerminalGroup
        && currentSymbol.contains(getTokenSymbol(currentToken))
      );

    } else {
      console.log("in loop");
      return false; // Unexpected token
    }
  }

  console.log("out of loop");
  return false;
}

export function getTokenSymbol(token: Token): string {
  switch (token.type) {
    case TokenType.EOT:
      return "eot";

    case TokenType.IDENTIFIER:
      return "id";

    case TokenType.NUMBER_LITERAL:
      return "number";
  }

  return token.content;
}
