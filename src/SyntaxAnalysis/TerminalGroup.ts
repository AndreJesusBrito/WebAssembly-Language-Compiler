import { SyntaxRule } from "./SyntaxRule.ts";

export class TerminalGroup {
  private terminals: Set<string>;

  constructor(terminals: string[]) {
    this.terminals = new Set(terminals);
    console.assert(this.terminals.size === terminals.length);
  }

  [Symbol.iterator]() {
    return this.terminals[Symbol.iterator]();
  }

  public contains(terminal: any) {
    return this.terminals.has(terminal);
  }

}
