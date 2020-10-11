import { IVisitorAST } from "./IVisitorAST";
import { ReferenceNode } from "./ReferenceNode";
import { FunctionDefinitionNode } from "./FunctionDeclarationNode";


export class FunctionCallNode extends ReferenceNode {
  funcName: string;
  funcRef: FunctionDefinitionNode;

  constructor(funcName: string) {
    super();
    this.funcName = funcName;
  }


  public get resultType(): string {
    // TODO get resultType from function return
    return "i32";
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitFunctionCallNode(this);
  }

  public toString(): string {
    return this.funcName + "()";
  }
}
