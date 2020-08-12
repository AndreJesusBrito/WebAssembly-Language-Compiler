// import { SyntaxSymbol, RuleDerivation, ActionObj } from "./types.ts";

export class SyntaxRule {
  private derivations: Map<string, any>;

  constructor(name: string) {
    this.derivations = new Map();
  }


  public getDerivation(terminal: string): any {
    // if (false) {
      // return {
      //   derivationSymbols: [2].reverse(),
      //   actions: derivation.actions,
      // };
    // } else {
      throw Error("WIERD STUFF");
    // }
  }
}

const rule = new SyntaxRule("none");
rule.getDerivation("");
