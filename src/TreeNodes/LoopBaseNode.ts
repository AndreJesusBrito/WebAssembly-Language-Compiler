import { StatementNode } from "./StatementNode"

export abstract class LoopBaseNode extends StatementNode {

  public get returnsValue(): boolean {
    return false;
  }

}
