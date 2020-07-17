import { SyntaxRule } from "./SyntaxRule.ts";
import { TerminalGroup } from "./TerminalGroup.ts";
import { Token } from "../LexicalAnalysis/Token.ts";
import { TokenType } from "../LexicalAnalysis/Token.ts";
import { SyntaxSymbol, RuleDerivation, ActionObj } from "./types.ts";

import { BaseNode } from "../TreeNodes/BaseNode.ts";
import { NumberLiteralNode } from "../TreeNodes/NumberLiteralNode.ts";
import { EmptyProgramNode } from "../TreeNodes/EmptyProgramNode.ts";

import { rules } from "./rules.ts";


export function parse(tokens: Token[]): BaseNode {
  const actionScheduler = new Map<number, ActionObj[]>();
  const grammarStack: SyntaxSymbol[] = ["eot", rules.program];
  const operatorStack: Token[] = [];
  const nodeStack: BaseNode[] = [];

  let currentPos = 0;

  while (grammarStack.length > 0 && currentPos < tokens.length) {
    console.log(grammarStack.map(r => {
      if (r instanceof SyntaxRule) {
        return r.name;
      }
      return r;
    }).join(" "));


    // run actions
    const actions = actionScheduler.get(grammarStack.length - 1);
    if (actions) {
      while (actions.length > 0) {
        actions.pop()?.func(grammarStack, operatorStack, nodeStack);
      }
    }


    let currentSymbol: SyntaxSymbol = grammarStack[grammarStack.length-1];
    let currentToken: Token = tokens[currentPos];

    if (currentSymbol instanceof SyntaxRule) {
      const temp = getTokenSymbol(currentToken)
      const ruleRes: RuleDerivation = currentSymbol.getDerivation(temp);
      // console.log(currentSymbol.name, ruleRes.actions);
      grammarStack.pop();

      // schedule actions
      for (const action of ruleRes.actions) {

        // index to schedule (implicit -1 by previous pop)
        const index = action.index(grammarStack.length);

        let renameTomorow = actionScheduler.get(index) || [];

        renameTomorow.push(action);

        actionScheduler.set(index, renameTomorow);
      }

      grammarStack.push(...ruleRes.derivationSymbols);
    }
    else if (currentSymbol === getTokenSymbol(currentToken) || currentSymbol instanceof TerminalGroup) {
      // parsing successfull, returns ast
      if (currentToken.type === TokenType.EOT)
        return nodeStack.pop() || new EmptyProgramNode();


      switch (currentToken.type) {
        case TokenType.OPERATOR:
          operatorStack.push(currentToken);
          break;

        case TokenType.NUMBER_LITERAL:
          nodeStack.push(new NumberLiteralNode(currentToken));
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
