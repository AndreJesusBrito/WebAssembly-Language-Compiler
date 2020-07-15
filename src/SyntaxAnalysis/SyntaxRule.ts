import { TerminalGroup } from "./TerminalGroup.ts";
import { SyntaxSymbol, RuleDerivation, ActionObj } from "./types.ts";


export class SyntaxRule {
  private derivations: Map<string, RuleDerivation>;
  private _name: string;

  constructor(name: string) {
    this._name = name;
    this.derivations = new Map();
  }


  public get name() : string {
    return this._name;
  }

  public getDerivation(terminal: string): RuleDerivation {
    const derivation = this.derivations.get(terminal);
    if (derivation) {
      return {
        derivationSymbols: [...derivation.derivationSymbols].reverse(),
        actions: [],
      };
    } else {
      throw SyntaxError("Unexpected token '" + terminal + "' at rule " + this._name);
    }
  }

  public setDerivation(rule: SyntaxSymbol[], actions: ActionObj[], ...terminals: string[]): void {
    for (const terminal of terminals) {
      if (this.derivations.get(terminal) instanceof Array) {
        console.warn("'" + terminal + "' repeated terminal for rule " + this._name);
      }

      this.derivations.set(terminal, {
        derivationSymbols: rule,
        actions: [],
      });
    }
  }

  public toString(): string {
    let str = "SyntaxRule " + this._name + " {  ";
    for (const [terminal, rule] of this.derivations) {
      str += "'" + terminal + "' => [";

      str += rule.derivationSymbols.map(symbol => {
        return (symbol instanceof SyntaxRule) ? symbol._name : symbol
      }).join("  ") + "]     ";
    }

    return str + "  }";
  }
}
