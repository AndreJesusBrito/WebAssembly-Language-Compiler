import { SyntaxRule } from "./SyntaxRule";

export class TerminalGroup {
  private terminals: Set<string>;

  constructor(terminals: string[]) {
    this.terminals = new Set(terminals);
    console.assert(this.terminals.size === terminals.length, "terminal group constructor");
  }

  [Symbol.iterator]() {
    return this.terminals[Symbol.iterator]();
  }

  public contains(terminal: any) {
    return this.terminals.has(terminal);
  }

  toString() {
    return "[" + [...this.terminals].join("|") + "]";
  }

}
