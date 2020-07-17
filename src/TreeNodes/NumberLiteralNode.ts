import { ExpressionNode } from "./ExpressionNode.ts";
import { Token } from "../LexicalAnalysis/Token.ts";
import { IVisitorAST } from "./IVisitorAST.ts";

export class NumberLiteralNode extends ExpressionNode {
  private val: Token;

  constructor(token: Token) {
    super();
    this.val = token;
  }

  public visit(visitor: IVisitorAST) {
    visitor.visitNumberLiteralNode(this);
  }

  public toString(): string {
    return this.val.content;
  }
}