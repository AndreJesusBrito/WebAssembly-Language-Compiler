import { SyntaxRule } from "./SyntaxRule.ts";
import { Token } from "../LexicalAnalysis/Token.ts";
import { TokenType } from "../LexicalAnalysis/Token.ts";


type SyntaxSymbol = string | SyntaxRule;


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

rules.program.setDerivation([rules.exp], "(", "sumOp", "id");
// rules.program.setDerivation([], "eot");

rules.exp.setDerivation([rules.addExp], "(", "sumOp", "id");


rules.addExp.setDerivation([rules.mulExp, rules.addExpPrime], "(", "sumOp", "id");

rules.addExpPrime.setDerivation(["sumOp", rules.mulExp, rules.addExpPrime], "sumOp");
rules.addExpPrime.setDerivation([], ")", "eot");


rules.mulExp.setDerivation([rules.exponencialExp, rules.mulExpPrime], "(", "sumOp", "id");

rules.mulExpPrime.setDerivation(["mulOp", rules.exponencialExp, rules.mulExpPrime], "mulOp");
rules.mulExpPrime.setDerivation([], ")", "sumOp", "eot");


rules.exponencialExp.setDerivation([rules.value, rules.exponencialExpPrime], "(", "sumOp", "id");

rules.exponencialExpPrime.setDerivation(["**", rules.value, rules.exponencialExp], "**");
rules.exponencialExpPrime.setDerivation([], ")", "mulOp", "sumOp", "eot");


rules.value.setDerivation(["(", rules.exp, ")"], "(");
rules.value.setDerivation(["sumOp", rules.value], "sumOp");
rules.value.setDerivation(["id"], "id");





export function parse(tokens: Token[]): boolean {
  const stack: SyntaxSymbol[] = ["eot", rules.program];

  let currentPos = 0;

  while (stack.length > 0 && currentPos < tokens.length) {
    // console.log(stack.map(e => {
    //   return (e instanceof SyntaxRule) ? e.name : e;
    // }));
    // console.log(tokens.slice(currentPos), "\n\n\n");


    let x: SyntaxSymbol = stack[stack.length-1];
    let a: string = getTokenSymbol(tokens[currentPos]);

    if (x instanceof SyntaxRule) {
      const ruleRes: SyntaxSymbol[] = x.getDerivation(a);
      stack.pop();

      // if (ruleRes == null)
      //   return false;

      stack.push(...ruleRes);
    } else if (x === a) {
      if (a == "eot")
        return true;

      currentPos++;
      console.assert(a === stack.pop());
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

    case TokenType.OPERATOR:
      switch (token.content) {
        case "+":
        case "-":
          return "sumOp";

        case "*":
        case "/":
        case "%":
        case "\\":
          return "mulOp";
      }
  }

  return token.content;
}
