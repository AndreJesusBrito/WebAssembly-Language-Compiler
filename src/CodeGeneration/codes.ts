
export enum ValueType {
  i32 = 0x7F,
  i64 = 0x7E,
  f32 = 0x7D,
  f64 = 0x7C,
}

export enum SectionTypeCode {
  custom   = 0,
  type     = 1,
  import   = 2,
  function = 3,
  table    = 4,
  memory   = 5,
  global   = 6,
  export   = 7,
  start    = 8,
  element  = 9,
  code     = 10,
  data     = 11,
}

export enum ExportTypeCode {
  func   = 0x00,
  table  = 0x01,
  mem    = 0x02,
  global = 0x03,
}

export enum Opcode {

  end = 0x0B,


  // variable instructions
  local_get = 0x20,
  local_set = 0x21,
  local_tee = 0x22,
  global_get = 0x23,
  global_set = 0x24,

  // consts
  i32_const = 0x41,
  i64_const = 0x42,
  f32_const = 0x43,
  f64_const = 0x44,

  // i32 comparison operators
  i32_eqz = 0x45,
  i32_eq = 0x46,
  i32_ne = 0x47,
  i32_lt_s = 0x48,
  i32_lt_u = 0x49,
  i32_gt_s = 0x4A,
  i32_gt_u = 0x4B,
  i32_le_s = 0x4C,
  i32_le_u = 0x4D,
  i32_ge_s = 0x4E,
  i32_ge_u = 0x4F,


  i32_clz = 0x67,
  i32_ctz = 0x68,
  i32_popcnt = 0x69,

  // i32 arithmetic operators
  i32_add = 0x6A,
  i32_sub = 0x6B,
  i32_mul = 0x6C,
  i32_div_s = 0x6D,
  i32_div_u = 0x6E,
  i32_rem_s = 0x6F,
  i32_rem_u = 0x70,

  // i32 logic operators
  i32_and = 0x71,
  i32_or = 0x72,
  i32_xor = 0x73,
  i32_shl = 0x74,
  i32_shr_s = 0x75,
  i32_shr_u = 0x76,
  i32_rotl = 0x77,
  i32_rotr = 0x78,
}
