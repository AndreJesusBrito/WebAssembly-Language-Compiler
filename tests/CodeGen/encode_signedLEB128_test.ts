import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { encodeI32 } from "../../src/CodeGeneration/encoders.ts";


Deno.test({
  name: "0 encode",
  fn: () => {
    assertEquals(encodeI32(0), [0]);
  }
});

Deno.test({
  name: "1 encode",
  fn: () => {
    assertEquals(encodeI32(1), [1]);
  }
});

Deno.test({
  name: "13 encode",
  fn: () => {
    assertEquals(encodeI32(13), [13]);
  }
});

Deno.test({
  name: "42 encode",
  fn: () => {
    assertEquals(encodeI32(42), [42]);
  }
});

Deno.test({
  name: "63 encode",
  fn: () => {
    assertEquals(encodeI32(63), [63]);
  }
});

Deno.test({
  name: "64 encode",
  fn: () => {
    assertEquals(encodeI32(64), [0xC0, 0]);
  }
});

Deno.test({
  name: "65 encode",
  fn: () => {
    assertEquals(encodeI32(65), [0xC1, 0x00]);
  }
});

Deno.test({
  name: "128 encode",
  fn: () => {
    assertEquals(encodeI32(128), [0x80, 0x1]);
  }
});

Deno.test({
  name: "129 encode",
  fn: () => {
    assertEquals(encodeI32(129), [0x81, 0x1]);
  }
});

Deno.test({
  name: "130 encode",
  fn: () => {
    assertEquals(encodeI32(130), [0x82, 0x1]);
  }
});

Deno.test({
  name: "200 encode",
  fn: () => {
    assertEquals(encodeI32(200), [200, 1]);
  }
});

Deno.test({
  name: "301 encode",
  fn: () => {
    assertEquals(encodeI32(301), [0xAD, 0x2]);
  }
});

Deno.test({
  name: "1024 encode",
  fn: () => {
    assertEquals(encodeI32(1024), [0x80, 0x8]);
  }
});

Deno.test({
  name: "1234 encode",
  fn: () => {
    assertEquals(encodeI32(1234), [0xD2, 9]);
  }
});





Deno.test({
  name: "-1 encode",
  fn: () => {
    assertEquals(encodeI32(-1), [0x7F]);
  }
});

Deno.test({
  name: "-2 encode",
  fn: () => {
    assertEquals(encodeI32(-2), [0x7E]);
  }
});

Deno.test({
  name: "-3 encode",
  fn: () => {
    assertEquals(encodeI32(-3), [0x7D]);
  }
});

Deno.test({
  name: "-4 encode",
  fn: () => {
    assertEquals(encodeI32(-4), [0x7C]);
  }
});

Deno.test({
  name: "-5 encode",
  fn: () => {
    assertEquals(encodeI32(-5), [0x7B]);
  }
});

Deno.test({
  name: "-6 encode",
  fn: () => {
    assertEquals(encodeI32(-6), [0x7A]);
  }
});

Deno.test({
  name: "-7 encode",
  fn: () => {
    assertEquals(encodeI32(-7), [0x79]);
  }
});

Deno.test({
  name: "-8 encode",
  fn: () => {
    assertEquals(encodeI32(-8), [0x78]);
  }
});

Deno.test({
  name: "-9 encode",
  fn: () => {
    assertEquals(encodeI32(-9), [0x77]);
  }
});

Deno.test({
  name: "-13 encode",
  fn: () => {
    assertEquals(encodeI32(-13), [0x73]);
  }
});

Deno.test({
  name: "-42 encode",
  fn: () => {
    assertEquals(encodeI32(-42), [0x56]);
  }
});

Deno.test({
  name: "-65 encode",
  fn: () => {
    assertEquals(encodeI32(-65), [0xBF, 0x7F]);
  }
});

Deno.test({
  name: "-128 encode",
  fn: () => {
    assertEquals(encodeI32(-128), [0x80, 0x7F]);
  }
});

Deno.test({
  name: "-129 encode",
  fn: () => {
    assertEquals(encodeI32(-129), [0xFF, 0x7E]);
  }
});

Deno.test({
  name: "-130 encode",
  fn: () => {
    assertEquals(encodeI32(-130), [0xFE, 0x7E]);
  }
});

Deno.test({
  name: "-200 encode",
  fn: () => {
    assertEquals(encodeI32(-200), [0xB8, 0x7E]);
  }
});

Deno.test({
  name: "-404 encode",
  fn: () => {
    assertEquals(encodeI32(-404), [0xEC, 0x7C]);
  }
});


Deno.test({
  name: "-123456 encode",
  fn: () => {
    assertEquals(encodeI32(-123456), [0xC0, 0xBB, 0x78]);
  }
});
