import { IVisitorAST } from "./IVisitorAST.ts";

export abstract class BaseNode {
  public abstract visit(visitor: IVisitorAST): any;
}
