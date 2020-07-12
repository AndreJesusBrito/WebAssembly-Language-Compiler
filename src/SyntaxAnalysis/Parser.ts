import { SyntaxRule } from "./SyntaxRule.ts";
import { TerminalGroup } from "./TerminalGroup.ts";
import { Token } from "../LexicalAnalysis/Token.ts";
import { TokenType } from "../LexicalAnalysis/Token.ts";


type SyntaxSymbol = string | SyntaxRule | TerminalGroup;


const rules: {
  [key: string]: SyntaxRule
} = {
  program: new SyntaxRule("program"),
  exp: new SyntaxRule("exp"),
  exponencialExp: new SyntaxRule("exponencialExp"),
  exponencialExpPrime: new SyntaxRule("exponencialExpPrime"),
  mulExp: new SyntaxRule("mulExp"),
  mulExpPrime: new SyntaxRule("mulExpPrime"),
  addExp: new SyntaxRule("addExp"),
  addExpPrime: new SyntaxRule("addExpPrime"),
  value: new SyntaxRule("value"),
};

const group: {
  [key: string]: TerminalGroup
} = {
  sumOp: new TerminalGroup(["+", "-"]),
  mulOp: new TerminalGroup(["*", "/", "\\", "%"]),
};

rules.program.setDerivation([rules.exp], "(", ...group.sumOp, "id");
// rules.program.setDerivation([], "eot");

rules.exp.setDerivation([rules.addExp], "(", ...group.sumOp, "id");


rules.addExp.setDerivation([rules.mulExp, rules.addExpPrime], "(", ...group.sumOp, "id");

rules.addExpPrime.setDerivation([group.sumOp, rules.mulExp, rules.addExpPrime], ...group.sumOp);
rules.addExpPrime.setDerivation([], ")", "eot");


rules.mulExp.setDerivation([rules.exponencialExp, rules.mulExpPrime], "(", ...group.sumOp, "id");

rules.mulExpPrime.setDerivation([group.mulOp, rules.exponencialExp, rules.mulExpPrime], ...group.mulOp);
rules.mulExpPrime.setDerivation([], ")", ...group.sumOp, "eot");


rules.exponencialExp.setDerivation([rules.value, rules.exponencialExpPrime], "(", ...group.sumOp, "id");

rules.exponencialExpPrime.setDerivation(["**", rules.value, rules.exponencialExp], "**");
rules.exponencialExpPrime.setDerivation([], ")", ...group.mulOp, ...group.sumOp, "eot");


rules.value.setDerivation(["(", rules.exp, ")"], "(");
rules.value.setDerivation([group.sumOp, rules.value], ...group.sumOp);
rules.value.setDerivation(["id"], "id");





export function parse(tokens: Token[]): boolean {
  const stack: SyntaxSymbol[] = ["eot", rules.program];

  let currentPos = 0;

  while (stack.length > 0 && currentPos < tokens.length) {
    let currentSymbol: SyntaxSymbol = stack[stack.length-1];
    let currentToken: Token = tokens[currentPos];

    if (currentSymbol instanceof SyntaxRule) {
      const ruleRes: SyntaxSymbol[] = currentSymbol.getDerivation(getTokenSymbol(currentToken));
      stack.pop();

      // if (ruleRes == null)
      //   return false;

      stack.push(...ruleRes);
    }
    else if (currentSymbol === getTokenSymbol(currentToken) || currentSymbol instanceof TerminalGroup) {
      if (currentToken.type === TokenType.EOT)
        return true;

      currentPos++;
      stack.pop()

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
  }

  return token.content;
}
