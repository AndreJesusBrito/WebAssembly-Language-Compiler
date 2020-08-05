import { parse as parseArgs } from "https://deno.land/std/flags/mod.ts";
import { getTokens } from "./LexicalAnalysis/Tokenizer.ts";
import { Token } from "./LexicalAnalysis/Token.ts";
import { parse, getTokenSymbol } from "./SyntaxAnalysis/Parser.ts";
import { BinaryFormatCodeGenerator } from "./CodeGeneration/genCode.ts";
import { SemanticAnalyserPhase2 } from "./SemanticAnalysis/SemanticAnalyserPhase2.ts";

const { args } = Deno;
const parsedArgs = parseArgs(args);

if (!parsedArgs._[0]) {
  console.log("Error: No input file");
  Deno.exit(1);
}

const decoder = new TextDecoder('utf-8');
const file = await Deno.open(parsedArgs._[0].toString());


const bytes = await Deno.readAll(file);
const text = decoder.decode(bytes);


const tokens: Token[] = getTokens(text);

const ast = parse(tokens);

const semanticAnalyzer = new SemanticAnalyserPhase2(ast);
semanticAnalyzer.analyze();

const outputFilename: string = parsedArgs.o || "out.wasm";

console.log(tokens);
const generator = new BinaryFormatCodeGenerator(ast);

const code: Uint8Array = generator.generate();

await Deno.writeFile(outputFilename, code);
