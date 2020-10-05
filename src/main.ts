import { getTokens } from "./LexicalAnalysis/Tokenizer";
import { Token } from "./LexicalAnalysis/Token";
import { parse } from "./SyntaxAnalysis/Parser";
import { BinaryFormatCodeGenerator } from "./CodeGeneration/genCode";
import { SemanticAnalyserPhase2 } from "./SemanticAnalysis/SemanticAnalyserPhase2";
import { SemanticAnalyserPhase3 } from "./SemanticAnalysis/SemanticAnalyserPhase3";

const fs = require("fs");
const yargs = require("yargs");

const argv = yargs
  .command('compile <input path>', 'Compiles input file')
  .option('output', {
    alias: 'o',
    description: 'Choose the output file path. Default is wasm.out in the current directory',
    type: 'string',
  })
  .help()
  .alias('help', 'h')
  .argv;

if (argv._[0] === "compile") {
  compile(argv);
} else {
  throw TypeError("Invalid command");
}

function compile(argv) {
  fs.readFile(argv.inputpath, "utf8", (err, text) => {
    if (err) {
      console.error("Error: Input file not found.");
    } else {
      const tokens: Token[] = getTokens(text);

      const ast = parse(tokens);

      const semanticAnalyzer2 = new SemanticAnalyserPhase2(ast);
      semanticAnalyzer2.analyze();

      const semanticAnalyzer3 = new SemanticAnalyserPhase3(ast);
      semanticAnalyzer3.analyze();

      const outputFilename: string = /* parsedArgs.o || */ "out.wasm";

      const generator = new BinaryFormatCodeGenerator(ast);
      const code: Uint8Array = generator.generate();

      // await Deno.writeFile(outputFilename, code);
      fs.writeFile("out.wasm", Buffer.from(code), (err, ) => {
        if (err) {
          throw err;
        }
      });
    }
  });
}
