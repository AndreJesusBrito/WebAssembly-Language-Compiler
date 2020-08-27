import { SyntaxRule } from "./SyntaxRule.ts";
import { TerminalGroup } from "./TerminalGroup.ts";
import { ActionArgs } from "./types.ts";

import { BaseNode } from "../TreeNodes/BaseNode.ts";
import { AddOperationNode } from "../TreeNodes/AddOperationNode.ts";
import { SubtractOperationNode } from "../TreeNodes/SubtractOperationNode.ts";
import { MultiplyOperationNode } from "../TreeNodes/MultiplyOperationNode.ts";
import { IntDivisionOperationNode } from "../TreeNodes/IntDivisionOperationNode.ts";
import { NumberUnaryNegationNode } from "../TreeNodes/NumberUnaryNegationNode.ts";
import { BooleanNegationNode } from "../TreeNodes/BooleanNegationNode.ts";
import { PowerOperationNode } from "../TreeNodes/PowerOperationNode.ts";

import { BooleanOrNode } from "../TreeNodes/BooleanOrNode.ts";
import { BooleanXorNode } from "../TreeNodes/BooleanXorNode.ts";
import { BooleanAndNode } from "../TreeNodes/BooleanAndNode.ts";

import { BitwiseOrNode } from "../TreeNodes/BitwiseOrNode.ts";
import { BitwiseXorNode } from "../TreeNodes/BitwiseXorNode.ts";
import { BitwiseAndNode } from "../TreeNodes/BitwiseAndNode.ts";

import { EmptyExpression } from "../TreeNodes/EmptyExpression.ts";
import { StatementNode } from "../TreeNodes/StatementNode.ts";
import { StatementSingleNode } from "../TreeNodes/StatementSingleNode.ts";
import { StatementBlockNode } from "../TreeNodes/StatementBlockNode.ts";
import { VarDefinitionNode } from "../TreeNodes/VarDefinitionNode.ts";
import { ExpressionNode } from "../TreeNodes/ExpressionNode.ts";
import { VarReferenceNode } from "../TreeNodes/VarReferenceNode.ts";

import { ReferenceNode } from "../TreeNodes/ReferenceNode.ts";
import { AssignmentNode } from "../TreeNodes/AssignmentNode.ts";
import { ConditionalOperatorNode } from "../TreeNodes/ConditionalOperatorNode.ts";
import { Token, TokenType } from "../LexicalAnalysis/Token.ts";
import { BinaryOperator } from "../TreeNodes/BinaryOperator.ts";
import { BitwiseNegationNode } from "../TreeNodes/BitwiseNegationNode.ts";


export const rules: {
  [key: string]: SyntaxRule
} = {
  program: new SyntaxRule("program"),
  singleStatement: new SyntaxRule("singleStatement"),
  statement: new SyntaxRule("statement"),
  nextStatement: new SyntaxRule("nextStatement"),
  statementBlock: new SyntaxRule("statementBlock"),
  statementBlockPrime: new SyntaxRule("statementBlockPrime"),
  varDefinition: new SyntaxRule("varDefinition"),
  varDefinitionAssign: new SyntaxRule("varDefinitionAssign"),
  expression: new SyntaxRule("exp"),
  assignExpression: new SyntaxRule("assignExp"),
  assignExpressionPrime: new SyntaxRule("assignExpPrime"),
  conditional: new SyntaxRule("Conditional"),
  conditionalPrime: new SyntaxRule("ConditionalPrime"),
  booleanOrExp: new SyntaxRule("booleanOrExp"),
  booleanOrExpPrime: new SyntaxRule("booleanOrExpPr"),
  booleanXorExp: new SyntaxRule("booleanXorExp"),
  booleanXorExpPrime: new SyntaxRule("booleanXorExpPrime"),
  booleanAndExp: new SyntaxRule("booleanAndExp"),
  booleanAndExpPrime: new SyntaxRule("booleanAndExpPrime"),
  bitwiseOrExp: new SyntaxRule("bitwiseOrExp"),
  bitwiseOrExpPrime: new SyntaxRule("bitwiseOrExpPr"),
  bitwiseXorExp: new SyntaxRule("bitwiseXorExp"),
  bitwiseXorExpPrime: new SyntaxRule("bitwiseXorExpPrime"),
  bitwiseAndExp: new SyntaxRule("bitwiseAndExp"),
  bitwiseAndExpPrime: new SyntaxRule("bitwiseAndExpPrime"),
  exponencialExp: new SyntaxRule("exponencialExp"),
  exponencialExpPrime: new SyntaxRule("exponencialExpPrime"),
  mulExp: new SyntaxRule("mulExp"),
  mulExpPrime: new SyntaxRule("mulExpPrime"),
  addExp: new SyntaxRule("addExp"),
  addExpPrime: new SyntaxRule("addExpPrime"),
  value: new SyntaxRule("value"),
};

export const group: {
  [key: string]: TerminalGroup
} = {
  assignOp: new TerminalGroup(["=", "+=", "-=", "*=", "**=", "/=", "\\=", "%="]),
  sumOp: new TerminalGroup(["+", "-"]),
  mulOp: new TerminalGroup(["*", "/", "\\", "%"]),
  primitiveType: new TerminalGroup(["i32", "i64", "u32", "u64", "f32", "f64", "bool"]),
  valuePrefixes: new TerminalGroup(["+", "-", "!", "~"]),
};

// left to right associativity
function fnCurrentIndex(currentIndex: number): number {
  return currentIndex;
}

// right to left associativity
function fnPreviousIndex(currentIndex: number): number {
  return currentIndex - 1;
}

function fnRunNow(currentIndex: number): number {
  return -1;
}






function createVarDefinitionNode(args: ActionArgs) {
  const {nodeStack, tokens, currentTokenPos} = args;

  const varType = tokens[currentTokenPos-2];
  const varName = tokens[currentTokenPos-1];

  nodeStack.push(new VarDefinitionNode(varName.content, varType.content));
}

function assignToVarDefinitionNode(args: ActionArgs) {
  const {nodeStack} = args;

  const assignExpression: BaseNode | undefined = nodeStack.pop();

  const varDefinitionNode: BaseNode = nodeStack[nodeStack.length-1];
  if (varDefinitionNode instanceof VarDefinitionNode && assignExpression instanceof ExpressionNode) {
    varDefinitionNode.assignment = assignExpression;
  } else {
    throw Error("something went wrong here");
  }
}

function createAssignmentNode(args: ActionArgs) {
  const { nodeStack, operatorStack } = args;


  let expression = nodeStack.pop() || new EmptyExpression();

  const identifier = nodeStack.pop() || new EmptyExpression();

  if (!(identifier instanceof ReferenceNode)) {
    throw Error("Syntax Error: Invalid left-hand side in assignment");
  }

  const operator = operatorStack.pop();

  // assign operation shortcuts
  if (operator && operator.content.length > 1) {
    const binOpToken = new Token(
      operator.content.slice(0,-1),
      TokenType.OPERATOR,
      operator.linePos,
      operator.lineCharPos
    );

    // TODO change this later
    const identifierToken = new Token(identifier.toString(), TokenType.IDENTIFIER, 0,0);


    operatorStack.push(binOpToken);

    // add operand 1
    createVarReferenceNode(identifierToken, args);
    // add operand 2
    nodeStack.push(expression);

    createBinOperatorNode(args);

    const binOp = nodeStack.pop();
    if (binOp instanceof BinaryOperator) {
      expression = binOp;
    } else {
      throw new Error("something went wrong at assign bin operator");
    }
  }

  if (!(expression instanceof ExpressionNode)) throw new Error("expecting a expression node here");

  nodeStack.push(new AssignmentNode(identifier, expression));
}

function createConditionalOperatorNode(args: ActionArgs) {
  const { nodeStack, operatorStack } = args;

  // pop ':'
  console.assert(
    operatorStack.pop()?.content === ':'
  );
  // pop '?'
  console.assert(
    operatorStack.pop()?.content === '?'
  );

  const elseExpression = nodeStack.pop();
  const firstExpression = nodeStack.pop();
  const condition = nodeStack.pop();

  if (!(elseExpression instanceof ExpressionNode)) {
    throw Error("on conditional operator, elseExpression is not an Expression")
  }
  if (!(firstExpression instanceof ExpressionNode)) {
    throw Error("on conditional operator, firstExpression is not an Expression")
  }
  if (!(condition instanceof ExpressionNode)) {
    throw Error("on conditional operator, condition is not an Expression")
  }

  nodeStack.push(new ConditionalOperatorNode(condition, firstExpression, elseExpression));
}


function createVarReferenceNodeFromCurrentToken(args: ActionArgs) {
  const token = args.tokens[args.currentTokenPos];
  createVarReferenceNode(token, args);
}

function createVarReferenceNodeFromPreviousToken(args: ActionArgs) {
  const token = args.tokens[args.currentTokenPos - 1];
  createVarReferenceNode(token, args);
}

function createVarReferenceNode(token: Token | null, args: ActionArgs) {
  if (token) {
    const varName = token.content;
    args.nodeStack.push(new VarReferenceNode(varName));
  }
}


function createStatementSingleNode(args: ActionArgs): void {
  const {nodeStack} = args;

  const expression = nodeStack.pop() || new EmptyExpression();

  if (!(expression instanceof ExpressionNode)) throw new Error("expecting a expression node here");

  nodeStack.push(new StatementSingleNode(expression));
}

function createStatementBlockNode(args: ActionArgs): void {
  const {nodeStack} = args;

  const statement: BaseNode = nodeStack[nodeStack.length-1] || null;

  if (statement instanceof StatementNode) {
    nodeStack.pop();
    nodeStack.push(new StatementBlockNode(statement));
  }
}

function joinStatements(args: ActionArgs): void {
  const { nodeStack } = args

  const nextStmt = nodeStack.pop();
  const previousStmt = nodeStack[nodeStack.length-1];

  if (previousStmt instanceof StatementNode) {
    // @ts-ignore TODO check if is a ts bug
    previousStmt.nextStatement = nextStmt;
  } else if (nextStmt !== undefined) {
    nodeStack.push(nextStmt);
  }
}

function createBinOperatorNode(args: ActionArgs): void {
  const {operatorStack, nodeStack} = args;

  const op2 = nodeStack.pop() || new EmptyExpression();
  const op1 = nodeStack.pop() || new EmptyExpression();

  if (!(op1 instanceof ExpressionNode)
    || !(op2 instanceof ExpressionNode)
  ) throw new Error("expecting a expression node here");


  switch (operatorStack.pop()?.content) {
    case '+':
      nodeStack.push(new AddOperationNode(op1, op2));
      break;

    case '-':
      nodeStack.push(new SubtractOperationNode(op1, op2));
      break;

    case '*':
      nodeStack.push(new MultiplyOperationNode(op1, op2));
      break;

    case '/': // TEMP only working with i32 for now
    case '\\':
      nodeStack.push(new IntDivisionOperationNode(op1, op2));
      break;

    case '**':
      nodeStack.push(new PowerOperationNode(op1, op2));
      break;

    case '||':
      nodeStack.push(new BooleanOrNode(op1, op2));
      break;

    case '^^':
      nodeStack.push(new BooleanXorNode(op1, op2));
      break;

    case '&&':
      nodeStack.push(new BooleanAndNode(op1, op2));
      break;


    case '|':
      nodeStack.push(new BitwiseOrNode(op1, op2));
      break;

    case '^':
      nodeStack.push(new BitwiseXorNode(op1, op2));
      break;

    case '&':
      nodeStack.push(new BitwiseAndNode(op1, op2));
      break;

  }
}

function createNumberUnaryNegationNode(args: ActionArgs) {
  const { operatorStack, nodeStack } = args

  console.assert(operatorStack.pop()?.content === '-', "createNumberUnaryNegationNode check");
  const number = nodeStack.pop() || new EmptyExpression();

  if (!(number instanceof ExpressionNode)) throw new Error("expecting a expression node here");

  nodeStack.push(new NumberUnaryNegationNode(number));
}

function createBooleanNegationNode(args: ActionArgs) {
  const { operatorStack, nodeStack } = args;

  console.assert(operatorStack.pop()?.content === '!', "createBooleanNegationNode check");
  const booleanNode = nodeStack.pop() || new EmptyExpression();

  if (!(booleanNode instanceof ExpressionNode)) throw new Error("expecting a expression node here");

  nodeStack.push(new BooleanNegationNode(booleanNode));
}

function createBitwiseNegationNode(args: ActionArgs) {
  const { operatorStack, nodeStack } = args;

  console.assert(operatorStack.pop()?.content === '~', "createBitwiseNegationNode check");
  const booleanNode = nodeStack.pop() || new EmptyExpression();

  if (!(booleanNode instanceof ExpressionNode)) throw new Error("expecting a expression node here");

  nodeStack.push(new BitwiseNegationNode(booleanNode));
}





rules.program.setDerivation([rules.statement], [], ";", "{", ...group.primitiveType, "id", "(", ...group.valuePrefixes, "number", "true", "false",);
// rules.program.setDerivation([], "eot");

rules.singleStatement.setDerivation(
  [rules.statementBlock],
  [{index: fnCurrentIndex, func: createStatementBlockNode}],
  "{",
);
rules.singleStatement.setDerivation([";"], [], ";");
rules.singleStatement.setDerivation(
  [rules.expression, ";"],
  [{index: fnCurrentIndex, func: createStatementSingleNode}],
  "id", ...group.valuePrefixes, "(", "number", "true", "false"
);
rules.singleStatement.setDerivation(
  [rules.varDefinition, ";"],
  [],
  ...group.primitiveType
);

rules.statementBlock.setDerivation(["{", rules.statementBlockPrime], [], "{");
rules.statementBlockPrime.setDerivation([rules.statement, "}"], [], ";", "{", ...group.primitiveType, "id", "(", ...group.valuePrefixes, "number", "true", "false");
rules.statementBlockPrime.setDerivation(["}"], [], "}");


rules.statement.setDerivation(
  [rules.singleStatement, rules.nextStatement], [],
  "{", "id", ...group.valuePrefixes, "(", "number", "true", "false", ...group.primitiveType
);

rules.nextStatement.setDerivation(
  [rules.statement],
  [{index: fnPreviousIndex, func: joinStatements}],
  ";", "{", ...group.primitiveType, "id", ...group.valuePrefixes, "(", "number", "true", "false"
);
rules.nextStatement.setDerivation([], [], "}", "eot");


rules.varDefinition.setDerivation(
  [group.primitiveType, "id", rules.varDefinitionAssign],
  [{ index: fnCurrentIndex, func: createVarDefinitionNode }],
  ...group.primitiveType
);

rules.varDefinitionAssign.setDerivation(
  ["=", rules.expression],
  [{index: fnPreviousIndex, func: assignToVarDefinitionNode}],
  "="
);
rules.varDefinitionAssign.setDerivation(
  [],
  [],
  ";"
);


rules.expression.setDerivation([rules.assignExpression], [], "id", ...group.valuePrefixes, "(", "number", "true", "false");


rules.assignExpression.setDerivation([rules.conditional, rules.assignExpressionPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false");

rules.assignExpressionPrime.setDerivation(
  [group.assignOp, rules.conditional, rules.assignExpressionPrime],
  [{ index: fnPreviousIndex, func: createAssignmentNode }],
  ...group.assignOp
);
rules.assignExpressionPrime.setDerivation([], [], ";", ")", "?", ":");



rules.conditional.setDerivation(
  [rules.booleanOrExp, rules.conditionalPrime], [],
  "id", ...group.valuePrefixes, "(", "number", "true", "false"
);
rules.conditionalPrime.setDerivation(
  ["?", rules.conditional, ":", rules.conditional],
  [{ index: fnPreviousIndex, func: createConditionalOperatorNode }],
  "?"
);
rules.conditionalPrime.setDerivation([], [], ";", ...group.assignOp, "||", ")", ":");





rules.booleanOrExp.setDerivation([rules.booleanXorExp, rules.booleanOrExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false")
rules.booleanOrExpPrime.setDerivation(
  ["||", rules.booleanXorExp, rules.booleanOrExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  "||"
);
rules.booleanOrExpPrime.setDerivation([], [], ";", ...group.assignOp, ")", "?", ":");

rules.booleanXorExp.setDerivation([rules.booleanAndExp, rules.booleanXorExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false")
rules.booleanXorExpPrime.setDerivation(
  ["^^", rules.booleanAndExp, rules.booleanXorExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  "^^"
);
rules.booleanXorExpPrime.setDerivation([], [], ";", ...group.assignOp, "||", ")", "?", ":");

rules.booleanAndExp.setDerivation([rules.addExp, rules.booleanAndExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false")
rules.booleanAndExpPrime.setDerivation(
  ["&&", rules.bitwiseOrExp, rules.booleanAndExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  "&&"
);
rules.booleanAndExpPrime.setDerivation([], [], ";", ...group.assignOp, "||", "^^", ")", "?", ":");




rules.bitwiseOrExp.setDerivation([rules.bitwiseXorExp, rules.bitwiseOrExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false")
rules.bitwiseOrExpPrime.setDerivation(
  ["|", rules.bitwiseXorExp, rules.bitwiseOrExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  "|"
);
rules.bitwiseOrExpPrime.setDerivation([], [], ";", ...group.assignOp, "||", "^^", "&&", ")", "?", ":");

rules.bitwiseXorExp.setDerivation([rules.bitwiseAndExp, rules.bitwiseXorExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false")
rules.bitwiseXorExpPrime.setDerivation(
  ["^", rules.bitwiseAndExp, rules.bitwiseXorExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  "^"
);
rules.bitwiseXorExpPrime.setDerivation([], [], ";", ...group.assignOp, "||", "^^", "&&", "|", ")", "?", ":");

rules.bitwiseAndExp.setDerivation([rules.addExp, rules.bitwiseAndExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false")
rules.bitwiseAndExpPrime.setDerivation(
  ["&", rules.addExp, rules.bitwiseAndExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  "&"
);
rules.bitwiseAndExpPrime.setDerivation([], [], ";", ...group.assignOp, "||", "^^", "&&", "|", "^", ")", "?", ":");





rules.addExp.setDerivation([rules.mulExp, rules.addExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false");

rules.addExpPrime.setDerivation(
  [group.sumOp, rules.mulExp, rules.addExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.sumOp,
);
rules.addExpPrime.setDerivation([], [], ";", ...group.assignOp, "||", "^^", "&&", "|", "^", "&", ")", "?", ":");


rules.mulExp.setDerivation([rules.exponencialExp, rules.mulExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false");

rules.mulExpPrime.setDerivation(
  [group.mulOp, rules.exponencialExp, rules.mulExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.mulOp,
);
rules.mulExpPrime.setDerivation([], [], ";", ...group.assignOp, "||", "^^", "&&", "|", "^", "&", ...group.sumOp, ")", "?", ":");


rules.exponencialExp.setDerivation([rules.value, rules.exponencialExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false");

rules.exponencialExpPrime.setDerivation(
  ["**", rules.value, rules.exponencialExpPrime],
  [{ index: fnPreviousIndex, func: createBinOperatorNode }],
  "**",
);
rules.exponencialExpPrime.setDerivation([], [], ";", ...group.assignOp, "||", "^^", "&&", "|", "^", "&", ...group.sumOp, ...group.mulOp, ")", "?", ":");


rules.value.setDerivation(["(", rules.expression, ")"], [], "(");
rules.value.setDerivation(["+", rules.value], [], "+");
rules.value.setDerivation(
  ["-", rules.value],
  [{ index: fnPreviousIndex, func: createNumberUnaryNegationNode }],
  "-"
);
rules.value.setDerivation(
  ["!", rules.value],
  [{ index: fnPreviousIndex, func: createBooleanNegationNode }],
  "!"
);
rules.value.setDerivation(
  ["~", rules.value],
  [{ index: fnPreviousIndex, func: createBitwiseNegationNode }],
  "~"
);
rules.value.setDerivation(["number"], [], "number");
rules.value.setDerivation(["true"], [], "true");
rules.value.setDerivation(["false"], [], "false");
rules.value.setDerivation(
  ["id"],
  [{ index: fnCurrentIndex, func: createVarReferenceNodeFromCurrentToken}],
  "id"
);
