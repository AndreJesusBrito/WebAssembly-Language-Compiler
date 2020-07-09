
type SyntaxSymbol = string | SyntaxRule;

export class SyntaxRule {
  private derivations: Map<string, SyntaxSymbol[]>;
  private _name: string;

  constructor(name: string) {
    this._name = name;
    this.derivations = new Map();
  }


  public get name() : string {
    return this._name;
  }


  public getDerivation(terminal: string): SyntaxSymbol[] {
    const derivation = this.derivations.get(terminal);
    if (derivation instanceof Array) {
      return [...derivation].reverse();
    } else {
      throw SyntaxError("Unexpected token '" + terminal + "' at rule " + this._name);
    }
  }

  public setDerivation(rule: SyntaxSymbol[], ...terminals: string[]): void {
    for (const terminal of terminals) {
      if (this.derivations.get(terminal) instanceof Array) {
        throw Error("'" + terminal + "' repeated terminal for rule " + this._name);
      }

      this.derivations.set(terminal, rule);
    }
  }

  public toString(): string {
    let str = "SyntaxRule " + this._name + " {  ";
    for (const [terminal, rule] of this.derivations) {
      str += "'" + terminal + "' => [";

      str += rule.map(symbol => {
        return (symbol instanceof SyntaxRule) ? symbol._name : symbol
      }).join("  ") + "]     ";
    }

    return str + "  }";
  }
}
