import {SectionTypeCode, ValueType, Opcode, ExportTypeCode} from "./codes.ts";

const magicModuleHeader = [0x00, 0x61, 0x73, 0x6d];
const moduleVersion = [0x01, 0x00, 0x00, 0x00];

function encodeVector(elements: any[]): number[] {
  // const buffer = new ArrayBuffer(4 + elements.length);

  return [
    ...encodeU32(elements.length),
    ...elements.flat()
  ];
}

// just a puts the bytes length in front
function encodeContainer(data: any[]): number[] {
  const flatData = [...data.flat()];
  return [
    ...encodeU32(flatData.length),
    ...flatData,
  ];
}


function encodeSection(sectionId: number, data: any[]): number[] {
  return [
    sectionId,
    ...encodeContainer(data)
  ]
}

function encodeFuncType(paramsVec: any[], resultVec: any[]): number[] {
  return [
    0x60,
    ...encodeVector(paramsVec),
    ...encodeVector(resultVec),
  ];
}

function encodeI32(n: number) {
  const result = signedLEB128(n);
  console.assert(result.length <= Math.ceil(32 / 7));
  return result;
}
function encodeU32(n: number) {
  const result = unsignedLEB128(n);
  console.assert(result.length <= Math.ceil(32 / 7));
  return result;
}

function signedLEB128(n: number): number[] {
  const buffer = [];
  let done = false;

  while (!done) {
    let byte = n & 0x7f;
    n >>>= 7;

    done = (n === 0  && (byte & 0x40) === 0)
        || (n === -1 && (byte & 0x40) !== 0);

    if (!done) {
      byte |= 0x80;
    }

    buffer.push(byte);
  }

  return buffer;
};

function unsignedLEB128(n: number): number[] {
  const buffer = [];

  do {
    let byte = n & 0x7f;
    n >>>= 7;

    if (n !== 0) {
      byte |= 0x80;
    }

    buffer.push(byte);
  } while (n !== 0);

  return buffer;
}

// only ascii for now
function encodeName(str: string): number[] {
  return [
    ...encodeU32(str.length),

    // not sure if works for cjk chars (TODO: check later)
    ...((new TextEncoder()).encode(str))
  ]
}

export function genCode(): Uint8Array {
  return Uint8Array.from([
    ...magicModuleHeader,
    ...moduleVersion,

    ...encodeSection(SectionTypeCode.type,
      encodeVector([
        encodeFuncType([], [ValueType.i32]),
      ])
    ),


    ...encodeSection(SectionTypeCode.function, [
      encodeVector([
        encodeU32(0)
      ])
    ]),



    ...encodeSection(SectionTypeCode.code,
      encodeVector([
        encodeContainer([
          // no locals for now
          ...encodeVector([]),

          // code expression
          ...[
            // push 42 to stack
            Opcode.i32_const,
            ...encodeU32(2048),

            Opcode.end
          ]
        ])
      ])
    ),

    ...encodeSection(SectionTypeCode.export,
      encodeVector([
        [
          ...encodeName("returnLife"),
          ExportTypeCode.func,
          // ...encodeU32(0),
          0
        ]
      ])
    ),

  ]);
}
