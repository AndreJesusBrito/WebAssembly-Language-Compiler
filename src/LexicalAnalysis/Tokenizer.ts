import { Token, TokenType } from "./Token.ts";


const matchers = new Map<TokenType, RegExp>();
{
  matchers.set(TokenType.IDENTIFIER, /^\w+/); //TODO add all chars
  matchers.set(TokenType.OPERATOR, /^\+|-|\*\*|\*|\/|\\/);

  matchers.set(TokenType.LEFT_PARENT, /^\(/);
  matchers.set(TokenType.RIGHT_PARENT, /^\)/);
}

export function getTokens(input: string): Token[] {
  // tokens to return
  const tokensFound: Token[] = [];
  let currentPos: number = 0;

  let currentLine: number = 1;
  let currentLineChar: number = 1;


  while (input.length - currentPos > 0) {
    input = input.substring(currentPos);
    currentPos = 0;

    // ignore whitespace
    let whiteSpace = input.match(/^\s+/);
    if (whiteSpace) {
      currentPos += whiteSpace[0].length;

      // add lines breaks on whitespace escape
      const linesBreaks = whiteSpace[0].match(/\r\n|\r|\n/g);
      if (linesBreaks) {
        currentLine += linesBreaks.length;

        // new line so currentLineChar resets
        currentLineChar = 1;
      }

      // set line char position at final whitespace after last line break
      const currentLineWhiteSpace = whiteSpace[0].match(/.+$/);
      if (currentLineWhiteSpace) {
        currentLineChar += currentLineWhiteSpace[0].length;
      }

      continue;
    }

    // match tokens
    let matched: boolean = false;
    for (const [tokenType, re] of matchers) {
      const match = input.match(re);
      if (match) {
        const token = new Token(
          match[0],
          tokenType,
          currentLine,
          currentLineChar,
        );
        tokensFound.push(token);
        currentPos += match[0].length;
        currentLineChar += match[0].length;

        // token already matched
        matched = true;
        break;
      }
    }

    if (!matched) {
      throw Error(`Invalid token at ${currentLine}:${currentLineChar}`);
    }

  }

  return tokensFound;
}
