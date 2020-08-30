import { StatementNode } from "./StatementNode.ts"

export abstract class LoopBaseNode extends StatementNode {

  public get returnsValue(): boolean {
    return false;
  }

}
