import { parse } from "https://deno.land/std/flags/mod.ts";
import { getTokens } from "./LexicalAnalysis/Tokenizer.ts";

const { args } = Deno;
const parsedArgs = parse(args);

if (!parsedArgs._[0]) {
  console.log("Error: No input file");
  Deno.exit(1);
}

const decoder = new TextDecoder('utf-8');
const file = await Deno.open(parsedArgs._[0].toString());

// const magicModuleHeader = [0x00, 0x61, 0x73, 0x6d];
// const moduleVersion = [0x01, 0x00, 0x00, 0x00];


const bytes = await Deno.readAll(file);
const text = decoder.decode(bytes);


const tokens = getTokens(text);



console.log(tokens);

// let outputFilename: string = parsedArgs.o || "out.wasm";

// await Deno.writeFile(outputFilename, new Uint8Array([
//   ...magicModuleHeader,
//   ...moduleVersion,
//   // ...bytes,
// ]));
