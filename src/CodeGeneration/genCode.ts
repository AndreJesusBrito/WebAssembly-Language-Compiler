import {SectionTypeCode, ValueType, Opcode, ExportTypeCode} from "./codes";
import {
  encodeU32,
  encodeI32,
  encodeName,
  encodeVector,
  encodeContainer,
  encodeSection,
  encodeFuncType,
} from "./encoders";

import { IVisitorAST } from "../TreeNodes/IVisitorAST";
import { BaseNode } from "../TreeNodes/BaseNode";

import { ProgramNode } from "../TreeNodes/ProgramNode";
import { FunctionDefinitionNode } from "../TreeNodes/FunctionDeclarationNode";

import { StatementNode } from "../TreeNodes/StatementNode";
import { StatementBlockNode } from "../TreeNodes/StatementBlockNode";
import { StatementSingleNode } from "../TreeNodes/StatementSingleNode";

import { NumberLiteralNode } from "../TreeNodes/NumberLiteralNode";
import { BooleanLiteralNode } from "../TreeNodes/BooleanLiteralNode";

import { NumberUnaryNegationNode } from "../TreeNodes/NumberUnaryNegationNode";
import { BooleanNegationNode } from "../TreeNodes/BooleanNegationNode";
import { BitwiseNegationNode } from "../TreeNodes/BitwiseNegationNode";

import { AddOperationNode } from "../TreeNodes/AddOperationNode";
import { SubtractOperationNode } from "../TreeNodes/SubtractOperationNode";
import { MultiplyOperationNode } from "../TreeNodes/MultiplyOperationNode";
import { IntDivisionOperationNode } from "../TreeNodes/IntDivisionOperationNode";
import { PowerOperationNode } from "../TreeNodes/PowerOperationNode";
import { VarDefinitionNode } from "../TreeNodes/VarDefinitionNode";
import { VarReferenceNode } from "../TreeNodes/VarReferenceNode";
import { AssignmentNode } from "../TreeNodes/AssignmentNode";
import { BooleanOrNode } from "../TreeNodes/BooleanOrNode";
import { BooleanXorNode } from "../TreeNodes/BooleanXorNode";
import { BooleanAndNode } from "../TreeNodes/BooleanAndNode";
import { BitwiseOrNode } from "../TreeNodes/BitwiseOrNode";
import { BitwiseXorNode } from "../TreeNodes/BitwiseXorNode";
import { BitwiseAndNode } from "../TreeNodes/BitwiseAndNode";
import { ConditionalOperatorNode } from "../TreeNodes/ConditionalOperatorNode";
import { IfStatementNode } from "../TreeNodes/IfStatementNode";
import { WhileStatementNode } from "../TreeNodes/WhileStatementNode";
import { StandardForStatementNode } from "../TreeNodes/StandardForStatementNode";
import { EqualsExpressionNode } from "../TreeNodes/EqualsExpressionNode";
import { NotEqualsExpressionNode } from "../TreeNodes/NotEqualsExpressionNode";
import { GreaterThanExpressionNode } from "../TreeNodes/GreaterThanExpressionNode";
import { GreaterOrEqualExpressionNode } from "../TreeNodes/GreaterOrEqualExpressionNode";
import { LessThanExpressionNode } from "../TreeNodes/LessThanExpressionNode";
import { LessOrEqualExpressionNode } from "../TreeNodes/LessOrEqualExpressionNode";
import { PreIncrementExpressionNode } from "../TreeNodes/PreIncrementExpressionNode";
import { PreDecrementExpressionNode } from "../TreeNodes/PreDecrementExpressionNode";
import { ReferenceNode } from "../TreeNodes/ReferenceNode";
import { PosIncrementExpressionNode } from "../TreeNodes/PosIncrementExpressionNode";
import { PosDecrementExpressionNode } from "../TreeNodes/PosDecrementExpressionNode";
import { EmptyExpression } from "../TreeNodes/EmptyExpression";
import { EmptyStatement } from "../TreeNodes/EmptyStatement";
import { TrapStatementNode } from "../TreeNodes/TrapStatementNode";
import { ReturnStatementNode } from "../TreeNodes/ReturnStatementNode";
import { open } from "fs/promises";
import { FunctionCallNode } from "../TreeNodes/FunctionCallNode";



export class BinaryFormatCodeGenerator implements IVisitorAST {
  protected ast: ProgramNode;

  protected magicModuleHeader: number[] = [0x00, 0x61, 0x73, 0x6d];
  protected moduleVersion: number[] = [0x01, 0x00, 0x00, 0x00];

  // TEMP while working with one function only
  protected localsCount: number = 0;
  protected varDefinitions: VarDefinitionNode[] = [];

  constructor (ast: ProgramNode) {
    this.ast = ast;
  }


  visitProgramNode(node: ProgramNode) {
    
  }
  visitFunctionDefinitionNode(node: FunctionDefinitionNode) {}

  visitFunctionCallNode(node: FunctionCallNode): number[] {
    return [
      ...node.args.map(arg => arg.visit(this)),
      Opcode.call,
      ...encodeU32(node.funcRef.index)
    ];
  }

  visitEmptyStatement(node: EmptyStatement) {
    return [
      // good for debug
      Opcode.nop
    ];
  }
  visitEmptyExpression(node: EmptyExpression): number[] {
    return [
      // good for debug
      Opcode.nop
    ];
  }

  visitTrapStatementNode(node: TrapStatementNode) {
    if (node.condition) {
      return [
        Opcode.i32_const, 1,
        ...node.condition.visit(this),
        Opcode.i32_sub,
        Opcode.if, 0x40,
          Opcode.unreachable,
        Opcode.end,
      ]
    }
    return [Opcode.unreachable];
  }

  visitReturnStatementNode(node: ReturnStatementNode) {
    const result = [];
    if (node.expression) {
      result.push(...node.expression.visit(this));
    }

    // TODO otimization: remove return when not required
    result.push(Opcode.return);
    return result;
  }

  visitIfStatementNode(node: IfStatementNode): number[] {
    const elsePart: number[] = [];

    if (node.elseStatement) {
      elsePart.push(
        Opcode.else,
        ...this.genStatements(node.elseStatement),
      );
    }

    return [
      ...node.condition.visit(this),

      Opcode.if, 0x40,

      ...this.genStatements(node.firstStatement),

      ...elsePart,

      Opcode.end,
    ];
  }

  visitWhileStatementNode(node: WhileStatementNode): number[] {
    return [
      Opcode.loop, 0x40,
        // while condition
        ...node.condition.visit(this),
        Opcode.if, 0x40,

          // while block
          ...this.genStatements(node.innerStatement),
          Opcode.br, 1,

        Opcode.end,

      Opcode.end,
    ];
  }

  visitStandardForStatementNode(node: StandardForStatementNode): number[] {
    const definitionSection = node?.definitionSection?.visit(this) || [];

    let conditionSection;
    if (node.conditionSection instanceof EmptyExpression) {
      conditionSection = [
        Opcode.i32_const, 1
      ]
    } else {
      conditionSection = node.conditionSection.visit(this);
    }

    const nextStepSection = node.nextStepSection.visit(this);

    const innerStatement = this.genStatements(node.innerStatement);

    return [
      ...definitionSection,

      Opcode.loop, 0x40,

        ...conditionSection,
        Opcode.if, 0x40,
          ...innerStatement,
          ...nextStepSection,
        Opcode.br, 1,

        Opcode.end,

      Opcode.end,
    ];;
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

  visitEqualsExpressionNode(node: EqualsExpressionNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_eq
    ];
  }

  visitNotEqualsExpressionNode(node: NotEqualsExpressionNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_ne
    ];
  }


  visitGreaterThanExpressionNode(node: GreaterThanExpressionNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_gt_s
    ];
  }
  visitGreaterOrEqualExpressionNode(node: GreaterOrEqualExpressionNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_ge_s
    ];
  }
  visitLessThanExpressionNode(node: LessThanExpressionNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_lt_s
    ];
  }
  visitLessOrEqualExpressionNode(node: LessOrEqualExpressionNode): number[] {
    return [
      ...node.operand1.visit(this),
      ...node.operand2.visit(this),
      Opcode.i32_le_s
    ];
  }

  visitPreIncrementExpressionNode(node: PreIncrementExpressionNode): number[] {
    if (!(node.operand instanceof VarReferenceNode)) {
      throw Error("Not implemented yet");
    }

    const index = node.operand.definitionNode?.index;

    if (!index && index !== 0) {
      throw Error("something went wrong at visitPreIncrementExpressionNode");
    }

    const encodedIndex = encodeU32(index);


    return [
      Opcode.local_get,
      ...encodedIndex,
      Opcode.i32_const, 1,
      Opcode.i32_add,

      Opcode.local_set,
      ...encodedIndex,

      Opcode.local_get,
      ...encodedIndex,
    ];
  }
  visitPreDecrementExpressionNode(node: PreDecrementExpressionNode): number[] {
    if (!(node.operand instanceof VarReferenceNode)) {
      throw Error("Not implemented yet");
    }

    const index = node.operand.definitionNode?.index;

    if (!index && index !== 0) {
      throw Error("something went wrong at visitPreIncrementExpressionNode");
    }

    const encodedIndex = encodeU32(index);


    return [
      Opcode.local_get,
      ...encodedIndex,
      Opcode.i32_const, 1,
      Opcode.i32_sub,

      Opcode.local_set,
      ...encodedIndex,

      Opcode.local_get,
      ...encodedIndex,
    ];
  }

  visitPosIncrementExpressionNode(node: PosIncrementExpressionNode) {
    if (!(node.operand instanceof VarReferenceNode)) {
      throw Error("Not implemented yet");
    }

    const index = node.operand.definitionNode?.index;

    if (!index && index !== 0) {
      throw Error("something went wrong at visitPosIncrementExpressionNode");
    }

    const encodedIndex = encodeU32(index);

    return [
      Opcode.local_get,
      ...encodedIndex,

      Opcode.local_get,
      ...encodedIndex,

      Opcode.i32_const, 1,
      Opcode.i32_add,

      Opcode.local_set,
      ...encodedIndex,
    ];
  }
  visitPosDecrementExpressionNode(node: PosDecrementExpressionNode) {
    if (!(node.operand instanceof VarReferenceNode)) {
      throw Error("Not implemented yet");
    }

    const index = node.operand.definitionNode?.index;

    if (!index && index !== 0) {
      throw Error("something went wrong at visitPosDecrementExpressionNode");
    }

    const encodedIndex = encodeU32(index);


    return [
      Opcode.local_get,
      ...encodedIndex,

      Opcode.local_get,
      ...encodedIndex,

      Opcode.i32_const, 1,
      Opcode.i32_sub,

      Opcode.local_set,
      ...encodedIndex,
    ];
  }


  private genStatements(firstStatement: StatementNode): number[] {
    const code: number[] = [];

    let currentStatement: StatementNode | null = firstStatement;
    do {
      code.push(...currentStatement.visit(this));

      // TEMP while not removing redudant expressions
      if (currentStatement.returnsValue) {
        code.push(Opcode.drop);
      }

      currentStatement = currentStatement.nextStatement;
    } while (currentStatement);

    return code;
  }

  private genFunctions(exports, code) {
    for (const [funcName, func] of this.ast.functions) {

      exports.push([
        ...encodeName(funcName),
        ExportTypeCode.func,
        ...encodeU32(func.index),
      ]);


      // init variable indexes
      func.args.forEach(function(arg, index) {
        arg.index = index;
      });
      this.localsCount = func.args.length;



      const generatedCode = this.genStatements(func.body);

      // TEMP allow support for more types
      const locals = encodeVector([
        [...encodeU32(this.localsCount), ValueType.i32]
      ]);

      // TEMP remove last drop operation to allow function to return
      generatedCode.pop();

      code.push([
        encodeContainer([
          ...locals,

          // code expression
          ...generatedCode,
          Opcode.end
        ]),
      ]);

    }
  }

  public generate(): Uint8Array {

    // TEMP for now all functions are exported implicitly
    const exports = [];

    const code = [];

    const types = [];

    const funcTypeMap = [];

    // TEMP make support for more types
    let i = 0;
    for (const [funcName, func] of this.ast.functions) {
      const argsVector = [];
      for (let j = 0; j < func.args.length; j++) {
        argsVector.push(ValueType.i32);
      }

      types.push(encodeFuncType(argsVector, [ValueType.i32]));
      funcTypeMap.push(...encodeU32(i++));
    }

    this.genFunctions(exports, code);


    return Uint8Array.from([
      ...this.magicModuleHeader,
      ...this.moduleVersion,

      ...encodeSection(SectionTypeCode.type,
        encodeVector(types)
      ),


      ...encodeSection(SectionTypeCode.function, [
        encodeVector(funcTypeMap)
      ]),


      ...encodeSection(SectionTypeCode.export,
        encodeVector(exports)
      ),


      ...encodeSection(SectionTypeCode.code,
        encodeVector(code)
      ),

    ]);
  }
}
