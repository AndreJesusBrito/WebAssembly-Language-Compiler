import { SyntaxRule } from "./SyntaxRule";
import { TerminalGroup } from "./TerminalGroup";
import { ActionArgs } from "./types";

import { BaseNode } from "../TreeNodes/BaseNode";
import { AddOperationNode } from "../TreeNodes/AddOperationNode";
import { SubtractOperationNode } from "../TreeNodes/SubtractOperationNode";
import { MultiplyOperationNode } from "../TreeNodes/MultiplyOperationNode";
import { IntDivisionOperationNode } from "../TreeNodes/IntDivisionOperationNode";
import { NumberUnaryNegationNode } from "../TreeNodes/NumberUnaryNegationNode";
import { BooleanNegationNode } from "../TreeNodes/BooleanNegationNode";
import { PowerOperationNode } from "../TreeNodes/PowerOperationNode";

import { BooleanOrNode } from "../TreeNodes/BooleanOrNode";
import { BooleanXorNode } from "../TreeNodes/BooleanXorNode";
import { BooleanAndNode } from "../TreeNodes/BooleanAndNode";

import { BitwiseOrNode } from "../TreeNodes/BitwiseOrNode";
import { BitwiseXorNode } from "../TreeNodes/BitwiseXorNode";
import { BitwiseAndNode } from "../TreeNodes/BitwiseAndNode";

import { EmptyExpression } from "../TreeNodes/EmptyExpression";
import { StatementNode } from "../TreeNodes/StatementNode";
import { StatementSingleNode } from "../TreeNodes/StatementSingleNode";
import { StatementBlockNode } from "../TreeNodes/StatementBlockNode";
import { VarDefinitionNode } from "../TreeNodes/VarDefinitionNode";
import { ExpressionNode } from "../TreeNodes/ExpressionNode";
import { VarReferenceNode } from "../TreeNodes/VarReferenceNode";

import { ReferenceNode } from "../TreeNodes/ReferenceNode";
import { AssignmentNode } from "../TreeNodes/AssignmentNode";
import { ConditionalOperatorNode } from "../TreeNodes/ConditionalOperatorNode";
import { Token, TokenType } from "../LexicalAnalysis/Token";
import { BinaryOperator } from "../TreeNodes/BinaryOperator";
import { BitwiseNegationNode } from "../TreeNodes/BitwiseNegationNode";
import { PreIncrementExpressionNode } from "../TreeNodes/PreIncrementExpressionNode";
import { PreDecrementExpressionNode } from "../TreeNodes/PreDecrementExpressionNode";
import { PosIncrementExpressionNode } from "../TreeNodes/PosIncrementExpressionNode";
import { PosDecrementExpressionNode } from "../TreeNodes/PosDecrementExpressionNode";
import { IfStatementNode } from "../TreeNodes/IfStatementNode";
import { WhileStatementNode } from "../TreeNodes/WhileStatementNode";
import { StandardForStatementNode } from "../TreeNodes/StandardForStatementNode";

import { EqualsExpressionNode } from "../TreeNodes/EqualsExpressionNode";
import { NotEqualsExpressionNode } from "../TreeNodes/NotEqualsExpressionNode";

import { GreaterThanExpressionNode } from "../TreeNodes/GreaterThanExpressionNode";
import { GreaterOrEqualExpressionNode } from "../TreeNodes/GreaterOrEqualExpressionNode";
import { LessThanExpressionNode } from "../TreeNodes/LessThanExpressionNode";
import { LessOrEqualExpressionNode } from "../TreeNodes/LessOrEqualExpressionNode";
import { EmptyStatement } from "../TreeNodes/EmptyStatement";
import { TrapStatementNode } from "../TreeNodes/TrapStatementNode";
import { FunctionDefinitionNode } from "../TreeNodes/FunctionDeclarationNode";
import { FunctionCallNode } from "../TreeNodes/FunctionCallNode";
import { ProgramNode } from "../TreeNodes/ProgramNode";

export const rules: {
  [key: string]: SyntaxRule
} = {
  program: new SyntaxRule("program"),
  highOrderDefinition: new SyntaxRule("highOrderDefinition"),
  functionDefinition: new SyntaxRule("functionDefinition"),
  singleStatement: new SyntaxRule("singleStatement"),
  statement: new SyntaxRule("statement"),
  nextStatement: new SyntaxRule("nextStatement"),
  statementBlock: new SyntaxRule("statementBlock"),
  trapStatement: new SyntaxRule("trapStatement"),
  trapStatementPrime: new SyntaxRule("trapStatementPrime"),
  statementBlockPrime: new SyntaxRule("statementBlockPrime"),
  conditionSection: new SyntaxRule("conditionSection"),
  equalsExpression: new SyntaxRule("equalsExpression"),
  equalsExpressionPrime: new SyntaxRule("equalsExpressionPrime"),
  comparisonExp: new SyntaxRule("comparisonExp"),
  comparisonExpPrime: new SyntaxRule("comparisonExpPrime"),
  ifStatement: new SyntaxRule("ifStatement"),
  ifStatementPrime: new SyntaxRule("ifStatementPrime"),
  forStatement: new SyntaxRule("forStatement"),
  forControl: new SyntaxRule("forControl"),
  forDefinitionSection: new SyntaxRule("forDefinitionSection"),
  forConditionSection: new SyntaxRule("forConditionSection"),
  forNextStepSection: new SyntaxRule("forNextStepSection"),
  whileStatement: new SyntaxRule("whileStatement"),
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
  valuePrefix: new SyntaxRule("valuePrefix"),
  valueSuffix: new SyntaxRule("valueSuffix"),
  highOrderOperations: new SyntaxRule("highOrderOperations"),
  highOrderOperationsLeft: new SyntaxRule("highOrderOperationsLeft"),
  highOrderOperationsRight: new SyntaxRule("highOrderOperationsRight"),
  functionCall: new SyntaxRule("functionCall"),
  value: new SyntaxRule("value"),
};

export const group: {
  [key: string]: TerminalGroup
} = {
  assignOp: new TerminalGroup(["=", "+=", "-=", "*=", "**=", "/=", "\\=", "%="]),
  sumOp: new TerminalGroup(["+", "-"]),
  mulOp: new TerminalGroup(["*", "/", "\\", "%"]),
  equalsOp: new TerminalGroup(["==", "!="]),
  comparisonOp: new TerminalGroup([">=", "<=", ">", "<"]),
  primitiveType: new TerminalGroup(["i32", "i64", "u32", "u64", "f32", "f64", "bool"]),
  valuePrefixes: new TerminalGroup(["+", "-", "!", "~", "--", "++"]),
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






function createProgram(args: ActionArgs) {
  const {nodeStack} = args;

  // the remaining elements in the nodeStack
  // are the high order definitions.
  const elements = [];
  while (nodeStack.length > 0) {
    elements.push(nodeStack.pop());
  }

  nodeStack.push(new ProgramNode(elements));

}

function createEmptyExpression(args: ActionArgs) {
  args.nodeStack.push(new EmptyExpression());
}
function createEmptyStatement(args: ActionArgs) {
  args.nodeStack.push(new EmptyStatement());
}

function createUnconditionalTrap(args: ActionArgs) {
  args.nodeStack.push(new TrapStatementNode(null));
}
function createConditionalTrap(args: ActionArgs) {
  const {nodeStack} = args;

  const condition = nodeStack.pop();
  if (!(condition instanceof ExpressionNode)) {
    throw Error("Trap must receive an ExpressionNode");
  }

  nodeStack.push(new TrapStatementNode(condition));
}

function createVarDefinitionNode(args: ActionArgs) {
  const {nodeStack, identifierStack} = args;

  const varName = identifierStack.pop();
  const varType = identifierStack.pop();

  nodeStack.push(new VarDefinitionNode(varName.content, varType.content));
}

function createIfNode(args: ActionArgs) {
  const {nodeStack} = args;

  const firstExpression = nodeStack.pop();
  if (!(firstExpression instanceof StatementNode)) {
    throw Error("IfNode expect a statement");
  }

  const condition = nodeStack.pop();
  if (!(condition instanceof ExpressionNode)) {
    throw Error("IfNode expects the condition to be an Expression")
  }

  nodeStack.push(new IfStatementNode(condition, firstExpression, null));
}

function createIfElseNode(args: ActionArgs) {
  const { nodeStack } = args;

  const elseExpression = nodeStack.pop();
  if (!(elseExpression instanceof StatementNode)) {
    throw Error("IfNode expected an else statement");
  }

  const firstExpression = nodeStack.pop();
  if (!(firstExpression instanceof StatementNode)) {
    throw Error("IfNode expected an statement");
  }

  const condition = nodeStack.pop();
  if (!(condition instanceof ExpressionNode)) {
    throw Error("IfNode expects the condition to be an Expression")
  }

  nodeStack.push(new IfStatementNode(condition, firstExpression, elseExpression));
}


function createWhileNode(args: ActionArgs) {
  const { nodeStack } = args;

  const innerStatement = nodeStack.pop();
  if (!(innerStatement instanceof StatementNode)) {
    throw Error("WhileNode expected an statement");
  }

  const condition = nodeStack.pop();
  if (!(condition instanceof ExpressionNode)) {
    throw Error("WhileNode expects the condition to be an Expression");
  }

  nodeStack.push(new WhileStatementNode(condition, innerStatement));
}


function createForNode(args: ActionArgs) {
  const { nodeStack } = args;

  const innerStatement = nodeStack.pop();
  if (!(innerStatement instanceof StatementNode)) {
    throw Error("ForNode expected an statement");
  }


  if (false) {
    // TODO: for future "for" formats.
  }
  else {
    let nextStepSection = nodeStack.pop();
    if (!(nextStepSection instanceof ExpressionNode)) {
      throw Error("ForNode expects the nextStepSection to be an Expression");
    }

    let conditionSection = nodeStack.pop();
    if (!(conditionSection instanceof ExpressionNode)) {
      throw Error("ForNode expects the conditionSection to be an Expression");
    }

    let definitionSection: any = nodeStack.pop();
    if (definitionSection instanceof EmptyExpression) {
      definitionSection = null;
    } else if (!(definitionSection instanceof VarDefinitionNode)) {
      throw Error("ForNode expects the definitionSection to be an Expression");
    }



    nodeStack.push(new StandardForStatementNode(definitionSection, conditionSection, nextStepSection, innerStatement));
  }

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

  let expression = nodeStack.pop();
  if (!expression) {
    throw Error("something went wrong at createAssignmentNode, expression");
  }

  const identifier = nodeStack.pop();
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
  const token = args.identifierStack.pop();
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

  const expression = nodeStack.pop();
  if (!(expression instanceof ExpressionNode)) throw new Error("expecting a expression node here");

  nodeStack.push(new StatementSingleNode(expression));
}

function createFunctionDefinition(args: ActionArgs) {
  const {nodeStack, identifierStack} = args;

  // pops function body code
  // @ts-ignore typescript bug https://github.com/microsoft/TypeScript/issues/29197
  const body: StatementNode = nodeStack.pop();
  const name: string = identifierStack.pop()?.content;

  if (!(body instanceof StatementNode))
    throw new Error("expected function body to be a statement");

  if (name === null)
    throw new Error("missing function definition name");

  nodeStack.push(new FunctionDefinitionNode(name, body));
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

  const op2 = nodeStack.pop();
  const op1 = nodeStack.pop();

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


    case '==':
      nodeStack.push(new EqualsExpressionNode(op1, op2));
      break;

    case '!=':
      nodeStack.push(new NotEqualsExpressionNode(op1, op2));
      break;


    case '>=':
      nodeStack.push(new GreaterOrEqualExpressionNode(op1, op2));
      break;

    case '>':
      nodeStack.push(new GreaterThanExpressionNode(op1, op2));
      break;

    case '<=':
      nodeStack.push(new LessOrEqualExpressionNode(op1, op2));
      break;

    case '<':
      nodeStack.push(new LessThanExpressionNode(op1, op2));
      break;


  }
}

function createNumberUnaryNegationNode(args: ActionArgs) {
  const { operatorStack, nodeStack } = args

  console.assert(operatorStack.pop()?.content === '-', "createNumberUnaryNegationNode check");
  const number = nodeStack.pop();

  if (!(number instanceof ExpressionNode)) throw new Error("expecting a expression node here");

  nodeStack.push(new NumberUnaryNegationNode(number));
}

function createBooleanNegationNode(args: ActionArgs) {
  const { operatorStack, nodeStack } = args;

  console.assert(operatorStack.pop()?.content === '!', "createBooleanNegationNode check");
  const booleanNode = nodeStack.pop();

  if (!(booleanNode instanceof ExpressionNode)) throw new Error("expecting a expression node here");

  nodeStack.push(new BooleanNegationNode(booleanNode));
}

function createBitwiseNegationNode(args: ActionArgs) {
  const { operatorStack, nodeStack } = args;

  console.assert(operatorStack.pop()?.content === '~', "createBitwiseNegationNode check");
  const booleanNode = nodeStack.pop();

  if (!(booleanNode instanceof ExpressionNode)) throw new Error("expecting a expression node here");

  nodeStack.push(new BitwiseNegationNode(booleanNode));
}

function createPreIncrementNode(args: ActionArgs) {
  const { operatorStack, nodeStack } = args;

  const reference = nodeStack.pop();

  if (!(reference instanceof ReferenceNode)) {
    throw Error("Syntax Error: Invalid left-hand side expression in prefix operation");
  }

  const operator = operatorStack.pop()?.content;


  if (operator == "++") {
    nodeStack.push(new PreIncrementExpressionNode(reference));
  } else if (operator == "--") {
    nodeStack.push(new PreDecrementExpressionNode(reference));
  } else {
    throw Error("something went wrong at createPreIncrement");
  }

}

function createPosIncrementNode(args: ActionArgs) {
  const { operatorStack, nodeStack } = args;

  const reference = nodeStack.pop();

  if (!(reference instanceof ReferenceNode)) {
    throw Error("Syntax Error: Invalid left-hand side expression in prefix operation");
  }

  const operator = operatorStack.pop()?.content;


  if (operator == "++") {
    nodeStack.push(new PosIncrementExpressionNode(reference));
  } else if (operator == "--") {
    nodeStack.push(new PosDecrementExpressionNode(reference));
  } else {
    throw Error("something went wrong at createPreIncrement");
  }

}

function createFunctionCallNode(args: ActionArgs) {
  const { nodeStack } = args;

  const func = nodeStack.pop();

  if (!(func instanceof VarReferenceNode)) {
    throw Error("Expected a VarReferenceNode in the function call");
  }

  nodeStack.push(new FunctionCallNode(func.variableName));

}





rules.program.setDerivation(
  [rules.highOrderDefinition],
  [{index: fnPreviousIndex, func: createProgram}],
  "func", "if", "while", "for", "trap", ";", "{", ...group.primitiveType, "id", "(", ...group.valuePrefixes, "number", "true", "false"
);
// rules.program.setDerivation([], "eot");

rules.highOrderDefinition.setDerivation([rules.functionDefinition, rules.highOrderDefinition], [], "func");
rules.highOrderDefinition.setDerivation([], [], "eot");

rules.functionDefinition.setDerivation(["func", "id", "{", rules.statement, "}"],
  [{index: fnCurrentIndex, func: createFunctionDefinition}],
  "func"
);

rules.singleStatement.setDerivation(
  [rules.statementBlock],
  [{index: fnCurrentIndex, func: createStatementBlockNode}],
  "{",
);
rules.singleStatement.setDerivation(
  [";"],
  [{ index: fnPreviousIndex, func: createEmptyStatement }],
  ";"
);
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
rules.singleStatement.setDerivation([rules.ifStatement], [], "if");
rules.singleStatement.setDerivation([rules.whileStatement], [], "while");
rules.singleStatement.setDerivation([rules.forStatement], [], "for");
rules.singleStatement.setDerivation([rules.trapStatement], [], "trap");

rules.statementBlock.setDerivation(["{", rules.statementBlockPrime], [], "{");
rules.statementBlockPrime.setDerivation([rules.statement, "}"], [], "if", "while", "for", "trap", ";", "{", ...group.primitiveType, "id", "(", ...group.valuePrefixes, "number", "true", "false");
rules.statementBlockPrime.setDerivation(
  ["}"],
  [{ index: fnPreviousIndex, func: createEmptyStatement }],
  "}"
);


rules.statement.setDerivation(
  [rules.singleStatement, rules.nextStatement], [],
  "if", "while", "for", "trap", ";", "{", "id", ...group.valuePrefixes, "(", "number", "true", "false", ...group.primitiveType
);

rules.nextStatement.setDerivation(
  [rules.statement],
  [{index: fnPreviousIndex, func: joinStatements}],
  "if", "while", "for", "trap", ";", "{", ...group.primitiveType, "id", ...group.valuePrefixes, "(", "number", "true", "false"
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




rules.conditionSection.setDerivation(["(", rules.expression, ")"], [], "(");


rules.ifStatement.setDerivation(["if", rules.conditionSection, rules.singleStatement, rules.ifStatementPrime], [], "if");

rules.ifStatementPrime.setDerivation(
  ["else", rules.singleStatement],
  [{ index: fnPreviousIndex, func: createIfElseNode }],
  "else"
);
rules.ifStatementPrime.setDerivation(
  [],
  [{ index: fnPreviousIndex, func: createIfNode }],
  "if", "while", "for", "trap", ";", "{", ...group.primitiveType, "id", "(", ...group.valuePrefixes, "number", "true", "false"
);



rules.whileStatement.setDerivation(
  ["while", rules.conditionSection, rules.singleStatement],
  [{ index: fnPreviousIndex, func: createWhileNode }],
  "while"
);


rules.forStatement.setDerivation(
  ["for", rules.forControl, rules.singleStatement],
  [{ index: fnPreviousIndex, func: createForNode }],
  "for"
);

rules.forControl.setDerivation(
  ["(", rules.forDefinitionSection, ";", rules.forConditionSection , ";", rules.forNextStepSection, ")"],
  [],
  "("
);

rules.forDefinitionSection.setDerivation(
  [rules.varDefinition],
  [],
  ...group.primitiveType,
);
rules.forDefinitionSection.setDerivation(
  [], [{ index: fnRunNow, func: createEmptyExpression }], ";"
);

rules.forConditionSection.setDerivation(
  [rules.expression],
  [],
  "id", ...group.valuePrefixes, "(", "number", "true", "false"
);
rules.forConditionSection.setDerivation(
  [], [{ index: fnRunNow, func: createEmptyExpression }], ";"
);

rules.forNextStepSection.setDerivation(
  [rules.expression],
  [],
  "id", ...group.valuePrefixes, "(", "number", "true", "false"
);
rules.forNextStepSection.setDerivation(
  [], [{ index: fnRunNow, func: createEmptyExpression }], ")"
);


rules.trapStatement.setDerivation(["trap", rules.trapStatementPrime], [], "trap");

rules.trapStatementPrime.setDerivation([";"], [
  { index: fnRunNow, func: createUnconditionalTrap }
], ";");

rules.trapStatementPrime.setDerivation([rules.expression], [
  { index: fnPreviousIndex, func: createConditionalTrap }
], "id", ...group.valuePrefixes, "(", "number", "true", "false");







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

rules.booleanAndExp.setDerivation([rules.bitwiseOrExp, rules.booleanAndExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false")
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

rules.bitwiseAndExp.setDerivation([rules.equalsExpression, rules.bitwiseAndExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false")
rules.bitwiseAndExpPrime.setDerivation(
  ["&", rules.equalsExpression, rules.bitwiseAndExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  "&"
);
rules.bitwiseAndExpPrime.setDerivation([], [], ";", ...group.assignOp, "||", "^^", "&&", "|", "^", ")", "?", ":");




rules.equalsExpression.setDerivation([rules.comparisonExp, rules.equalsExpressionPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false")
rules.equalsExpressionPrime.setDerivation(
  [group.equalsOp, rules.comparisonExp, rules.equalsExpressionPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.equalsOp
);
rules.equalsExpressionPrime.setDerivation([], [], ";", ...group.assignOp, "||", "^^", "&&", "|", "^", "&", ")", "?", ":");


rules.comparisonExp.setDerivation([rules.addExp, rules.comparisonExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false")
rules.comparisonExpPrime.setDerivation(
  [group.comparisonOp, rules.addExp, rules.comparisonExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.comparisonOp
);
rules.comparisonExpPrime.setDerivation([], [], ";", ...group.assignOp, ...group.equalsOp, "||", "^^", "&&", "|", "^", "&", ")", "?", ":");



rules.addExp.setDerivation([rules.mulExp, rules.addExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false");

rules.addExpPrime.setDerivation(
  [group.sumOp, rules.mulExp, rules.addExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.sumOp,
);
rules.addExpPrime.setDerivation([], [], ...group.equalsOp, ...group.comparisonOp, ";", ...group.assignOp, "||", "^^", "&&", "|", "^", "&", ")", "?", ":");


rules.mulExp.setDerivation([rules.exponencialExp, rules.mulExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false");

rules.mulExpPrime.setDerivation(
  [group.mulOp, rules.exponencialExp, rules.mulExpPrime],
  [{ index: fnCurrentIndex, func: createBinOperatorNode }],
  ...group.mulOp,
);
rules.mulExpPrime.setDerivation([], [], ...group.equalsOp, ...group.comparisonOp, ";", ...group.assignOp, "||", "^^", "&&", "|", "^", "&", ...group.sumOp, ")", "?", ":");


rules.exponencialExp.setDerivation([rules.valuePrefix, rules.exponencialExpPrime], [], "id", ...group.valuePrefixes, "(", "number", "true", "false");

rules.exponencialExpPrime.setDerivation(
  ["**", rules.valuePrefix, rules.exponencialExpPrime],
  [{ index: fnPreviousIndex, func: createBinOperatorNode }],
  "**",
);
rules.exponencialExpPrime.setDerivation([], [], ...group.equalsOp, ...group.comparisonOp, ";", ...group.assignOp, "||", "^^", "&&", "|", "^", "&", ...group.sumOp, ...group.mulOp, ")", "?", ":");


rules.valuePrefix.setDerivation(["+", rules.valuePrefix], [], "+");
rules.valuePrefix.setDerivation(
  ["-", rules.valuePrefix],
  [{ index: fnPreviousIndex, func: createNumberUnaryNegationNode }],
  "-"
);
rules.valuePrefix.setDerivation(
  ["!", rules.valuePrefix],
  [{ index: fnPreviousIndex, func: createBooleanNegationNode }],
  "!"
);
rules.valuePrefix.setDerivation(
  ["~", rules.valuePrefix],
  [{ index: fnPreviousIndex, func: createBitwiseNegationNode }],
  "~"
);
rules.valuePrefix.setDerivation(
  ["~", rules.valuePrefix],
  [{ index: fnPreviousIndex, func: createBitwiseNegationNode }],
  "~"
);
rules.valuePrefix.setDerivation(
  ["++", rules.valuePrefix],
  [{ index: fnPreviousIndex, func: createPreIncrementNode }],
  "++"
);
rules.valuePrefix.setDerivation(
  ["--", rules.valuePrefix],
  [{ index: fnPreviousIndex, func: createPreIncrementNode }],
  "--"
);
rules.valuePrefix.setDerivation(
  [rules.highOrderOperations, rules.valueSuffix], [], "(", "number", "true", "false", "id"
);


rules.valueSuffix.setDerivation(
  ["++", rules.valueSuffix],
  [{ index: fnPreviousIndex, func: createPosIncrementNode }],
  "++"
);
rules.valueSuffix.setDerivation(
  ["--", rules.valueSuffix],
  [{ index: fnPreviousIndex, func: createPosIncrementNode }],
  "--"
);
rules.valueSuffix.setDerivation(
  [], [], ...group.equalsOp, ...group.comparisonOp, ";", ...group.assignOp, "||", "^^", "&&", "|", "^", "&", ...group.sumOp, ...group.mulOp, ")", "?", ":"
);


rules.highOrderOperations.setDerivation(
  [rules.highOrderOperationsLeft, rules.value, rules.highOrderOperationsRight ],
  [],
  "(", "number", "true", "false", "id"
);


rules.highOrderOperationsLeft.setDerivation(
  [], [],
  "(", "number", "true", "false", "id"
);


rules.highOrderOperationsRight.setDerivation(
  [], [],
  ...group.equalsOp, ...group.comparisonOp, ";", ...group.assignOp, "||", "^^", "&&", "|", "^", "&", ...group.sumOp, ...group.mulOp, ")", "?", ":"
);
rules.highOrderOperationsRight.setDerivation(
  [rules.functionCall], [], "("
);

rules.functionCall.setDerivation(
  ["(", ")", rules.functionCall],
  [{index: fnCurrentIndex, func: createFunctionCallNode}],
  "("
);
rules.functionCall.setDerivation([], [], ...group.equalsOp, ...group.comparisonOp, ";", ...group.assignOp, "||", "^^", "&&", "|", "^", "&", ...group.sumOp, ...group.mulOp, ")", "?", ":");


rules.value.setDerivation(["(", rules.expression, ")"], [], "(");
rules.value.setDerivation(["number"], [], "number");
rules.value.setDerivation(["true"], [], "true");
rules.value.setDerivation(["false"], [], "false");
rules.value.setDerivation(
  ["id"],
  [{ index: fnPreviousIndex, func: createVarReferenceNodeFromCurrentToken}],
  "id"
);
