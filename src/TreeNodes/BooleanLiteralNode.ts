import { ExpressionNode } from "./ExpressionNode.ts";
import { Token, TokenType } from "../LexicalAnalysis/Token.ts";
import { IVisitorAST } from "./IVisitorAST.ts";

export class BooleanLiteralNode extends ExpressionNode {
  public token: Token;
  public value: boolean;

  constructor(token: Token) {
    console.assert(token.type === TokenType.BOOLEAN_LITERAL, "BooleanLiteralNode constructor");
    super();
    this.token = token;

    this.value = token.content === "true";
  }


  public get resultType(): string {
    return "bool";
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitBooleanLiteralNode(this);
  }

  public toString(): string {
    return this.value.toString();
  }
}