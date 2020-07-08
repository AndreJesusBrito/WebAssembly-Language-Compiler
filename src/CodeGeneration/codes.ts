
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


  i32_const = 0x41,


}
