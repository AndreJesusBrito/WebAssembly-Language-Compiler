import { Token, TokenType } from "./Token";


const matchers = new Map<TokenType, RegExp>();
{
  matchers.set(TokenType.NUMBER_LITERAL, /^(0b[01]+|0o[0-7]+|0x[\da-fA-F]+|(\d+\.|\.\d+|\d+)\d*(E(\+|-)?\d+)?)/);

  matchers.set(TokenType.PRIMITIVE_TYPE, /^(i32|i64|u32|u64|f32|f64|bool)/);
  matchers.set(TokenType.KEYWORD, /^(if|else|while|for)/);
  matchers.set(TokenType.BOOLEAN_LITERAL, /^(true|false)/);
  matchers.set(TokenType.IDENTIFIER, /^(\w+)/); //TODO add all chars

  matchers.set(TokenType.OPERATOR, /^(\+\+|--|==|!=|>=|<=|>|<|&&|\|\||\^\^|~|&|\||\^|\?|:|\+=|-=|\*\*=|\*=|\/=|\\=|%=|\+|-|\*\*|\*|\/|\\|%|=|!)/);

  matchers.set(TokenType.LEFT_PARENT, /^\(/);
  matchers.set(TokenType.RIGHT_PARENT, /^\)/);

  matchers.set(TokenType.LEFT_CURLY_BRAQUET, /^{/);
  matchers.set(TokenType.RIGHT_CURLY_BRAQUET, /^}/);

  matchers.set(TokenType.SEMICOLON, /^;/);
}

function escapeComment(env: EnvStruct): boolean {
  // const comment = env.input.match(/^((\/\*[^]+(?=\*\/))|(\/\/[^\r\n]+))/);

  if (env.input.charAt(env.currentPos) === "/") {

    //------------------------------
    // line comment
    if (env.input.charAt(env.currentPos + 1) === "/") {
      let i: number = 2;
      let currentChar: string = env.input.charAt(env.currentPos + i);

      // comment until line break or end of input
      while (!currentChar.match(/\n|\r/) && currentChar.length > 0) {
        i++;
        currentChar = env.input.charAt(env.currentPos + i);
      }

      // TODO check this later for all line breaks
      env.currentLine++;
      env.currentcolumn = 0;

      env.currentPos += i;
      return true;
    }

    //------------------------------
    // block comment
    else if (env.input.charAt(env.currentPos+1) === "*") {
      let i: number = 2;
      let currentChar: string = env.input.charAt(env.currentPos + i);

      // TODO correct the line and column pos
      // until '/' is followed by an '*'
      do {

        // ignore all chars before a '*'
        while (currentChar !== '*') {
          i++;
          currentChar = env.input.charAt(env.currentPos + i);

          if (currentChar.match(/\r\n|\r|\n/)) {
            env.currentLine++;
            env.currentcolumn = 0;
          }
        }

        // reads '*' / next char
        i++;
        currentChar = env.input.charAt(env.currentPos + i);

      } while (currentChar !== '/');

      env.currentPos += i + 1;

      return true;
    }
  }

  return false;
}

function escapeWhiteSpace(env: EnvStruct): boolean {
  let whiteSpace = env.input.match(/^\s+/);
  if (whiteSpace) {
    env.currentPos += whiteSpace[0].length;

    // add lines breaks on whitespace escape
    const linesBreaks = whiteSpace[0].match(/\r\n|\r|\n/g);
    if (linesBreaks) {
      env.currentLine += linesBreaks.length;

      // new line so currentcolumn resets
      env.currentcolumn = 1;
    }

    // set line char position at final whitespace after last line break
    const currentLineWhiteSpace = whiteSpace[0].match(/.+$/);
    if (currentLineWhiteSpace) {
      env.currentcolumn += currentLineWhiteSpace[0].length;
    }

    return true;
  }

  return false;
}

function matchToken(env: EnvStruct): boolean {
  for (const [tokenType, re] of matchers) {
    const match = env.input.match(re);
    if (match) {
      const token = new Token(
        match[0],
        tokenType,
        env.currentLine,
        env.currentcolumn,
      );
      env.tokensFound.push(token);
      env.currentPos += match[0].length;
      env.currentcolumn += match[0].length;

      // token already matched
      return true;
    }
  }
  return false;
}

interface EnvStruct {
  input: string,

  tokensFound: Token[],
  currentPos: number,
  currentLine: number,
  currentcolumn: number,
}

export function getTokens(input: string): Token[] {
  const env: EnvStruct = {
    input: input,

    tokensFound: [],
    currentPos: 0,
    currentLine: 1,
    currentcolumn: 1,
  };


  while (env.input.length - env.currentPos > 0) {
    env.input = env.input.substring(env.currentPos);
    env.currentPos = 0;

    // ignore whitespace
    if (escapeWhiteSpace(env)) continue;

    // ignore comments
    if (escapeComment(env)) continue;

    // match tokens
    const matched = matchToken(env);

    if (!matched) {
      throw Error(`Invalid token at ${env.currentLine}:${env.currentcolumn}`);
    }

  }

  env.tokensFound.push(Token.EOT);
  return env.tokensFound;
}
