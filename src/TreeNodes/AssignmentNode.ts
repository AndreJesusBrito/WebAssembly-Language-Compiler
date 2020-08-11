import { IVisitorAST } from "./IVisitorAST.ts";
import { ExpressionNode } from "./ExpressionNode.ts";
import { ReferenceNode } from "./ReferenceNode.ts";
import { BinaryOperator } from "./BinaryOperator.ts";

export class AssignmentNode extends BinaryOperator {

  constructor(identifier: ReferenceNode, expression: ExpressionNode) {
    super(identifier, expression);

    // the identifier in assign doesn't get the value
    // is only used to referece the memory space
    identifier.returnsValue = false;
  }


  public get resultType(): string {
    return this.operand1.resultType;
  }

  public visit(visitor: IVisitorAST): any {
    return visitor.visitAssignmentNode(this);
  }

  public getOperatorString(): string {
    return " = ";
  }
}
