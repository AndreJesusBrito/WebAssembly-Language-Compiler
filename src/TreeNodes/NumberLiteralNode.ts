import { ExpressionNode } from "./ExpressionNode.ts";
import { Token } from "../LexicalAnalysis/Token.ts";

export class NumberLiteralNode extends ExpressionNode {
  private val: Token;

  constructor(token: Token) {
    super();
    this.val = token;
  }

  public toString(): string {
    return this.val.content;
  }
}