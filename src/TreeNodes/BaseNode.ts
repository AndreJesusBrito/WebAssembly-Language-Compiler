import { IVisitorAST } from "./IVisitorAST";

export abstract class BaseNode {
  public abstract visit(visitor: IVisitorAST): any;
}
