import { IVisitorAST } from "./IVisitorAST.ts";
import { ExpressionNode } from "./ExpressionNode.ts";
import { ReferenceNode } from "./ReferenceNode.ts";
import { BinaryOperator } from "./BinaryOperator.ts";

export class AssignmentNode extends BinaryOperator {

  constructor(identifier: ReferenceNode, expression: ExpressionNode) {
    super(identifier, expression);
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitAssignmentNode(this);
  }

  public getOperatorString(): string {
    return " = ";
  }
}
