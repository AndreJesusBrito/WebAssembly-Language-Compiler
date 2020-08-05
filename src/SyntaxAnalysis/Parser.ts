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
    // console.log("---" + nodeStack.map(n => n.constructor.name).join("  ") + "---\n");


    // console.log(grammarStack.map(r => {
    //   if (r instanceof SyntaxRule) {
    //     return r.name;
    //   }
    //   return r;
    // }).join(" "),
    // "\n" + tokens.slice(currentPos).map(t => t.content).join("  ")
    // );


    // run actions
    const actions = actionScheduler.get(grammarStack.length - 1);
    if (actions) {
      while (actions.length > 0) {
        actions.pop()?.func({
          grammarStack: grammarStack,
          operatorStack: operatorStack,
          nodeStack: nodeStack,
          currentTokenPos: currentPos,
          tokens: tokens,
        });
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
        // console.log("action added for " + currentSymbol.name + " at index = " + index);
        // console.log(grammarStack );

        if (index === -1) {
          action.func({
            grammarStack: grammarStack,
            operatorStack: operatorStack,
            nodeStack: nodeStack,
            currentTokenPos: currentPos,
            tokens: tokens,
          });
        } else {
          // get previous scheduled actions at index
          let actionsAtIndex = actionScheduler.get(index);
  
          // create a new one array if no actions
          // have been added yet
          if (!actionsAtIndex) {
            actionsAtIndex = [];
            actionScheduler.set(index, actionsAtIndex);
          }
  
          // adds the new action
          actionsAtIndex.push(action);
        }
      }

      grammarStack.push(...ruleRes.derivationSymbols);
    }
    else if (currentSymbol === getTokenSymbol(currentToken) || currentSymbol instanceof TerminalGroup) {
      // parsing successfull, returns ast
      if (currentToken.type === TokenType.EOT) {
        return nodeStack.pop() || new EmptyProgramNode();
      }


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
        && currentSymbol.contains(getTokenSymbol(currentToken)),
        "pop token"
      );

    } else {
      console.log("in loop");
      return new EmptyProgramNode(); // Unexpected token
    }
  }

  console.log("out of loop");
  return new EmptyProgramNode();
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
