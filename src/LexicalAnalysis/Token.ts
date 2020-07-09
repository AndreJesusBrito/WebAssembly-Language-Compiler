
export enum TokenType {
  IDENTIFIER,

  LEFT_PARENT,
  RIGHT_PARENT,
  OPERATOR,

  keyword,
  numberLiteral,
  stringLiteral,
  booleanLiteral,

  EOT,
}

export class Token {
  private _content: string;
  private _type: TokenType;
  private _linePos: number;
  private _lineCharPos: number;

  public static EOT: Token = new Token("", TokenType.EOT, 0,0);

  constructor(content: string, type: TokenType, linePos: number, lineCharPos: number) {
    this._content = content;
    this._type = type;
    this._linePos = linePos;
    this._lineCharPos = lineCharPos;
  }

  public get content() {
    return this._content;
  }

  public get type() {
    return this._type;
  }

  public get linePos() {
    return this._linePos;
  }

  public get lineCharPos() {
    return this._lineCharPos;
  }
}
