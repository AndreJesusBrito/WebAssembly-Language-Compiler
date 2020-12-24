export interface IVarDefinition {
  variableName: string;
  datatype: string;

  index: number;

  readCount: number;
  writeCount: number;

  initialized: boolean;
}
