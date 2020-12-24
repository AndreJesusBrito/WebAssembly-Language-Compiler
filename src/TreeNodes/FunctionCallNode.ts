import { IVisitorAST } from "./IVisitorAST";
import { ReferenceNode } from "./ReferenceNode";
import { FunctionDefinitionNode } from "./FunctionDeclarationNode";
import { NodeList } from "./NodeList";
import { ExpressionNode } from "./ExpressionNode";


export class FunctionCallNode extends ReferenceNode {
  funcName: string;
  args: ExpressionNode[];
  funcRef: FunctionDefinitionNode;

  constructor(funcName: string, args: NodeList<ExpressionNode>) {
    super();
    this.funcName = funcName;
    this.args = args.nodes;
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
