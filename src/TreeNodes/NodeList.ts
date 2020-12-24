import { BaseNode } from "./BaseNode";

export class NodeList<T extends BaseNode> extends BaseNode {
  nodes: T[] = [];
  public visit() {};
}
