const {TextEncoder} = require("util");

export function encodeVector(elements: any[]): number[] {
  // const buffer = new ArrayBuffer(4 + elements.length);

  return [
    ...encodeU32(elements.length),
    ...elements.flat()
  ];
}

// just a puts the bytes length in front
export function encodeContainer(data: any[]): number[] {
  const flatData = [...data.flat()];
  return [
    ...encodeU32(flatData.length),
    ...flatData,
  ];
}


export function encodeSection(sectionId: number, data: any[]): number[] {
  return [
    sectionId,
    ...encodeContainer(data)
  ]
}

export function encodeFuncType(paramsVec: any[], resultVec: any[]): number[] {
  return [
    0x60,
    ...encodeVector(paramsVec),
    ...encodeVector(resultVec),
  ];
}

export function encodeI32(n: number) {
  const result = signedLEB128(n);
  console.assert(result.length <= Math.ceil(32 / 7), "encoding i32");
  return result;
}
export function encodeU32(n: number) {
  const result = unsignedLEB128(n);
  console.assert(result.length <= Math.ceil(32 / 7), "encoding u32");
  return result;
}

export function signedLEB128(n: number): number[] {
  let buffer = [];
  let done = false;
  const negative = n < 0;

  n = Math.abs(n);

  while (!done) {
    let byte = n & 0x7F;
    n >>>= 7;

    done = n <= 0;

    if (!done) {
      // add extend bit
      byte |= 0x80;
    }

    buffer.push(byte);
  }

  // set the sign bit.
  // add one more byte to output if the sign
  // bit conflicts with the magnitude bit.
  const lastByte = buffer[buffer.length - 1];
  if ((lastByte) >= 0x40) {
    // add extension bit
    buffer[buffer.length - 1] |= 0x80;

    buffer.push(0);
  }

  if (negative) {
    // 1's complement
    buffer = buffer.map(function(byte): number {
      return (byte & 0x80) + (~byte & 0x7F);
    });

    // 2's complement (add 1)
    let i: number = 0;
    let carry: boolean = true;
    while (carry) {
      const bytePlusOne: number = (buffer[i] & 0x7F) + 1;

      buffer[i] = (buffer[i] & 0x80) + (bytePlusOne & 0x7F);

      // if it carrys
      if (bytePlusOne > 0x7F) {
        i++;
        carry = true;
      }
      else {
        carry = false;
      }
    }

  }

  return buffer;
};

export function unsignedLEB128(n: number): number[] {
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
export function encodeName(str: string): number[] {
  return [
    ...encodeU32(str.length),

    // not sure if works for cjk chars.
    // the problem could be from the name for exports
    // and not from encoding (TODO: check later)
    ...((new TextEncoder()).encode(str))
  ];
}