import { IVisitorAST } from "./IVisitorAST";
import { BaseNode } from "./BaseNode";
import { Token } from "../LexicalAnalysis/Token";
import { IVarDefinition } from "./IVarDefinition";

export class FunctionDefinitionArgument extends BaseNode implements IVarDefinition {
  variableName: string;
  datatype: string;

  index: number;

  readCount: number = 0;
  writeCount: number = 0;

  get initialized(): boolean {
    return true;
  }

  constructor(name: Token, type: Token) {
    super();
    this.variableName = name.content;
    this.datatype = type.content;
  }


  public visit(visitor: IVisitorAST): any {
    // return visitor.visitFunctionDefinitionArgumentList(this);
  }

  public toString(): string {
    return "()";
  }
}
