import { ExpressionNode } from "./ExpressionNode.ts";
import { Token, TokenType } from "../LexicalAnalysis/Token.ts";
import { IVisitorAST } from "./IVisitorAST.ts";

export class NumberLiteralNode extends ExpressionNode {
  private token: Token;
  private value: number;

  constructor(token: Token) {
    console.assert(token.type === TokenType.NUMBER_LITERAL, "NumberLiteralNode constructor");
    super();
    this.token = token;

    this.value = this.parseInt();
  }


  public get resultType(): string {
    // TEMP TODO implement for all number types
    return "i32";
  }

  private parseInt(): number {
    const str = this.token.content;
    if (str.length > 1 && str[0] === '0' && str[1].match(/\d/)) {
      throw SyntaxError("Invalid Token: numbers starting with 0 are forbidden. Use 0o prefix for octal instead.")
    }
    return Number(this.token.content);
  }

  public get literalValue() : number {
    return this.value;
  }

  public visit(visitor: IVisitorAST) {
    return visitor.visitNumberLiteralNode(this);
  }

  public toString(): string {
    return this.value.toString();
  }
}