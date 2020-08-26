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
import { BaseNode } from "../TreeNodes/BaseNode.ts";

import { StatementNode } from "../TreeNodes/StatementNode.ts";
import { StatementBlockNode } from "../TreeNodes/StatementBlockNode.ts";
import { StatementSingleNode } from "../TreeNodes/StatementSingleNode.ts";

import { NumberLiteralNode } from "../TreeNodes/NumberLiteralNode.ts";
import { BooleanLiteralNode } from "../TreeNodes/BooleanLiteralNode.ts";

import { NumberUnaryNegationNode } from "../TreeNodes/NumberUnaryNegationNode.ts";
import { BooleanNegationNode } from "../TreeNodes/BooleanNegationNode.ts";
import { BitwiseNegationNode } from "../TreeNodes/BitwiseNegationNode.ts";

import { AddOperationNode } from "../TreeNodes/AddOperationNode.ts";
import { SubtractOperationNode } from "../TreeNodes/SubtractOperationNode.ts";
import { MultiplyOperationNode } from "../TreeNodes/MultiplyOperationNode.ts";
import { IntDivisionOperationNode } from "../TreeNodes/IntDivisionOperationNode.ts";
import { PowerOperationNode } from "../TreeNodes/PowerOperationNode.ts";
import { VarDefinitionNode } from "../TreeNodes/VarDefinitionNode.ts";
import { VarReferenceNode } from "../TreeNodes/VarReferenceNode.ts";
import { AssignmentNode } from "../TreeNodes/AssignmentNode.ts";
import { BooleanOrNode } from "../TreeNodes/BooleanOrNode.ts";
import { BooleanXorNode } from "../TreeNodes/BooleanXorNode.ts";
import { BooleanAndNode } from "../TreeNodes/BooleanAndNode.ts";
import { BitwiseOrNode } from "../TreeNodes/BitwiseOrNode.ts";
import { BitwiseXorNode } from "../TreeNodes/BitwiseXorNode.ts";
import { BitwiseAndNode } from "../TreeNodes/BitwiseAndNode.ts";
import { ConditionalOperatorNode } from "../TreeNodes/ConditionalOperatorNode.ts";



export class BinaryFormatCodeGenerator implements IVisitorAST {
  protected ast: BaseNode;

  protected magicModuleHeader: number[] = [0x00, 0x61, 0x73, 0x6d];
  protected moduleVersion: number[] = [0x01, 0x00, 0x00, 0x00];

  // TEMP while working with one function only
  protected localsCount: number = 0;
  protected varDefinitions: VarDefinitionNode[] = [];

  constructor (ast: BaseNode) {
    this.ast = ast;
  }

  visitVarDefinitionNode(node: VarDefinitionNode): number[] {
    const code: number[] = [];

    node.index = this.localsCount++;

    if (node.assignment) {
      code.push(
        ...node.assignment.visit(this),
        Opcode.local_set,
        ...encodeU32(node.index),
      );
    }

    return code;
  }

  visitVarReferenceNode(node: VarReferenceNode): number[] {
    if (!node.definitionNode) throw Error("something went wrong in variable " + node.variableName);

    return [
      Opcode.local_get,
      ...encodeU32(node.definitionNode.index),
    ];
  }


  visitStatementSingleNode(node: StatementSingleNode): number[] {
    return node.innerExpression.visit(this);
  }

  visitStatementBlockNode(node: StatementBlockNode): number[] {
    const innerStmt = node.innerStatement;
    
    if (innerStmt) {
      return this.genStatements(innerStmt);
    }
    return [];
  }

  visitNumberLiteralNode(node: NumberLiteralNode): number[] {
    return [
      Opcode.i32_const,
      ...encodeI32(node.literalValue),
    ];
  }

  visitBooleanLiteralNode(node: BooleanLiteralNode) {
    return [
      Opcode.i32_const,
      node.value ? 1 : 0
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

  visitBooleanNegationNode(node: BooleanNegationNode): number[] {
    return [
      Opcode.i32_const, 1,
      ...node.operand.visit(this),
      Opcode.i32_sub,
    ];
  }
  visitBitwiseNegationNode(node: BitwiseNegationNode): number[] {
    return [
      ...node.operand.visit(this),
      Opcode.i32_const, ...encodeI32(-1),
      Opcode.i32_xor,
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


  visitBooleanOrNode(node: BooleanOrNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_or,
    ];
  }
  visitBooleanXorNode(node: BooleanXorNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_xor,
    ];
  }
  visitBooleanAndNode(node: BooleanAndNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_and,
    ];
  }


  visitBitwiseOrNode(node: BitwiseOrNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_or,
    ];
  }
  visitBitwiseXorNode(node: BitwiseXorNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_xor,
    ];
  }
  visitBitwiseAndNode(node: BitwiseAndNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_and,
    ];
  }

  visitAssignmentNode(node: AssignmentNode): number[] {
    // @ts-ignore TEMP while working with locals only
    const localIndex: number = node.operand1.definitionNode.index;

    return [
      ...node.operand2.visit(this),
      Opcode.local_set,
      ...encodeU32(localIndex),

      Opcode.local_get, ...encodeU32(localIndex),
    ];
  }

  visitConditionalOperatorNode(node: ConditionalOperatorNode): number[] {
    return [
      ...node.condition.visit(this),

      Opcode.if,
      // TEMP TODO support all types
      ValueType.i32,
        ...node.firstExpression.visit(this),

      Opcode.else,
        ...node.elseExpression.visit(this),

      Opcode.end,
    ];
  }


  private genStatements(firstStatement: StatementNode): number[] {
    const code: number[] = [];

    let currentStatement: StatementNode | null = firstStatement;
    do {
      code.push(...currentStatement.visit(this));

      // TEMP while not removing redudant expressions
      if (currentStatement.nextStatement && currentStatement instanceof StatementSingleNode) {
        code.push(Opcode.drop);
      }

      currentStatement = currentStatement.nextStatement;
    } while (currentStatement);

    return code;
  }

  public generate(): Uint8Array {

    const code: number[] = [

      // @ts-ignore TEMP, only parsing statements directly
      this.genStatements(this.ast),

      Opcode.end
    ];

    const locals = encodeVector([
      [this.localsCount, ValueType.i32]
    ]);


    return Uint8Array.from([
      ...this.magicModuleHeader,
      ...this.moduleVersion,

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


      ...encodeSection(SectionTypeCode.code,
        encodeVector([
          encodeContainer([
            // no locals for now
            ...locals,

            // code expression
            ...code
          ])
        ])
      ),

    ]);
  }
}
