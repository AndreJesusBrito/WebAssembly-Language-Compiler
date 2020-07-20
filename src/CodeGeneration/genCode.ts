import {SectionTypeCode, ValueType, Opcode, ExportTypeCode} from "./codes.ts";
import {
  encodeU32,
  encodeI32,
  encodeName,
  encodeVector,
  encodeContainer,
  encodeSection,
  encodeFuncType,
} from "./encoders.ts";

const magicModuleHeader = [0x00, 0x61, 0x73, 0x6d];
const moduleVersion = [0x01, 0x00, 0x00, 0x00];





  }



export function genCode(): Uint8Array {
  return Uint8Array.from([
    ...magicModuleHeader,
    ...moduleVersion,

    ...encodeSection(SectionTypeCode.type,
      encodeVector([
        encodeFuncType([ValueType.i32, ValueType.i32], [ValueType.i32]),
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
          ...encodeVector([
            // [2, ValueType.i32]
          ]),

          // code expression
          ...[
            Opcode.local_get,
            ...encodeU32(0),

            Opcode.local_get,
            ...encodeU32(1),

            Opcode.i32_add,

            Opcode.end
          ]
        ])
      ])
    ),

    ...encodeSection(SectionTypeCode.export,
      encodeVector([
        [
          ...encodeName("add"),
          ExportTypeCode.func,
          // ...encodeU32(0),
          0
        ]
      ])
    ),

  ]);
}
