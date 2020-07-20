import {SectionTypeCode, ValueType, Opcode, ExportTypeCode} from "./codes.ts";
import {
  encodeU32,
  encodeI32,
  encodeName,
  encodeVector,
  encodeContainer,
  encodeSection,
  encodeFuncType,
} from "./encoders.ts";

import { IVisitorAST } from "../TreeNodes/IVisitorAST.ts";
import { NumberLiteralNode } from "../TreeNodes/NumberLiteralNode.ts";
import { NumberUnaryNegationNode } from "../TreeNodes/NumberUnaryNegationNode.ts";
import { AddOperationNode } from "../TreeNodes/AddOperationNode.ts";
import { SubtractOperationNode } from "../TreeNodes/SubtractOperationNode.ts";
import { MultiplyOperationNode } from "../TreeNodes/MultiplyOperationNode.ts";
import { IntDivisionOperationNode } from "../TreeNodes/IntDivisionOperationNode.ts";
import { PowerOperationNode } from "../TreeNodes/PowerOperationNode.ts";
import { BaseNode } from "../TreeNodes/BaseNode.ts";



const magicModuleHeader = [0x00, 0x61, 0x73, 0x6d];
const moduleVersion = [0x01, 0x00, 0x00, 0x00];

export class BinaryFormatCodeGenerator implements IVisitorAST {
  private ast: BaseNode;

  constructor (ast: BaseNode) {
    this.ast = ast;
  }

  visitNumberLiteralNode(node: NumberLiteralNode): number[] {
    return [
      Opcode.i32_const,
      ...encodeI32(node.literalValue),
    ];
  }


  // unary operators
  visitNumberUnaryNegationNode(node: NumberUnaryNegationNode): any {
    return [
      Opcode.i32_const, 0,
      ...node.operand.visit(this),
      Opcode.i32_sub,
    ];
  }

  // binary operators
  visitAddOperationNode(node: AddOperationNode): any {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_add,
    ];
  }
  visitSubtractOperationNode(node: SubtractOperationNode): any {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_sub,
    ];
  }
  visitMultiplyOperationNode(node: MultiplyOperationNode): any {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_mul,
    ];
  }
  visitIntDivisionOperationNode(node: IntDivisionOperationNode): any {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_div_s,
    ];
  }
  visitPowerOperationNode(node: PowerOperationNode): any {
    throw Error("** not implemented");
  }

  public generate(): Uint8Array {
    return Uint8Array.from([
      ...magicModuleHeader,
      ...moduleVersion,

      ...encodeSection(SectionTypeCode.type,
        encodeVector([
          encodeFuncType([], [ValueType.i32]),
          // encodeFuncType([ValueType.i32, ValueType.i32], [ValueType.i32]),
        ])
      ),


      ...encodeSection(SectionTypeCode.function, [
        encodeVector([
          encodeU32(0)
        ])
      ]),


      ...encodeSection(SectionTypeCode.code,
        encodeVector([
          encodeContainer([
            // no locals for now
            ...encodeVector([
              // [2, ValueType.i32]
            ]),

            // code expression
            ...[
              ...this.ast.visit(this),

              Opcode.end
            ]
          ])
        ])
      ),

      ...encodeSection(SectionTypeCode.export,
        encodeVector([
          [
            ...encodeName("result"),
            ExportTypeCode.func,
            // ...encodeU32(0),
            0
          ]
        ])
      ),

    ]);
  }
}
