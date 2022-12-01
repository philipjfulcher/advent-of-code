import { Edge, Node, Element, DefaultDataSchema } from './interfaces';
import { intersection } from '@advent-of-code/util-arrays';

export class Graph<Data = DefaultDataSchema> {
  private elements = new Map<string, Element<Data>>();
  private connectedEdges = new Map<string, string[]>();
  private connectedNodes = new Map<string, string[]>();

  constructor(data: Element<Data>[]) {
    data.forEach((datum) => {
      this.elements.set(datum.id, datum);

      if (datum.type === 'edge') {
        this.connectedNodes.set(datum.id, [datum.source, datum.target]);

        if (this.connectedEdges.has(datum.source)) {
          this.connectedEdges.get(datum.source)?.push(datum.id);
        } else {
          this.connectedEdges.set(datum.source, [datum.id]);
        }

        if (this.connectedEdges.has(datum.target)) {
          this.connectedEdges.get(datum.target)?.push(datum.id);
        } else {
          this.connectedEdges.set(datum.target, [datum.id]);
        }
      }
    });
  }

  node(id: string) {
    const node = this.elements.get(id);
    if (node) {
      return {
        ...node,
      } as Node<Data>;
    } else {
      return null;
    }
  }

  edge(id: string) {
    const edge = this.elements.get(id);
    if (edge) {
      return {
        ...edge,
      } as Edge<Data>;
    } else {
      return null;
    }
  }

  shortestPath(sourceNodeId: string, targetNodeId: string) {
    return this.pathWithConstraint(
      sourceNodeId,
      targetNodeId,
      (node1, node2, edge, path) => {
        const cond =
          node2?.id !== sourceNodeId && !path.includes(node2?.id ?? '');
        return cond;
      }
    );
  }

  pathWithConstraint(
    sourceNodeId: string,
    targetNodeId: string,
    pathConstraint: (
      node1: Node<Data> | null,
      node2: Node<Data> | null,
      edge: Edge<Data> | null,
      path: string[]
    ) => boolean = () => true,
    findAllPaths = false
  ): string[] | string[][] | null {
    const queue: { nodeId: string; path: string[] }[] = [
      { nodeId: sourceNodeId, path: [sourceNodeId] },
    ];

    let shortestPath = null;
    const paths: string[][] = [];

    while (queue.length > 0 && !shortestPath) {
      // console.log(`queue length: ${queue.length}`);

      const nodeToTest = queue.shift();
      // console.log(`Checking ${nodeToTest?.nodeId}`);
      if (nodeToTest) {
        const edges = this.connectedEdges.get(nodeToTest.nodeId);
        // ?.filter((edge) => this.edge(edge)?.source === nodeToTest.nodeId);

        // console.log(`${nodeToTest.nodeId} has edges ${edges}`);
        const targets = edges
          ?.map((edgeId) => this.edge(edgeId))
          .map((edge) => {
            if (edge) {
              return edge.source === nodeToTest.nodeId
                ? edge.target
                : edge.source;
            } else {
              return '';
            }
          });

        if (
          targets?.includes(targetNodeId) &&
          pathConstraint(
            this.node(nodeToTest.nodeId),
            this.node(targetNodeId),
            {
              id: '---',
              type: 'edge',
              source: nodeToTest.nodeId,
              target: targetNodeId,
              data: {},
            } as any,
            nodeToTest.path
          )
        ) {
          if (findAllPaths) {
            paths.push([...nodeToTest.path, targetNodeId]);

            const remainingTargets = targets.filter(
              (target) => target !== targetNodeId
            );

            remainingTargets.forEach((target) => {
              if (
                target &&
                pathConstraint(
                  this.node(nodeToTest.nodeId),
                  this.node(target),
                  {
                    id: '---',
                    type: 'edge',
                    source: nodeToTest.nodeId,
                    target: target,
                    data: {},
                  } as any,
                  nodeToTest.path
                )
              ) {
                queue.push({
                  nodeId: target,
                  path: [...nodeToTest.path, target],
                });
              }
            });
          } else {
            shortestPath = [...nodeToTest.path, targetNodeId];
          }
        } else {
          targets?.forEach((target) => {
            if (
              target !== undefined &&
              pathConstraint(
                this.node(nodeToTest.nodeId),
                this.node(target),
                {
                  id: '---',
                  type: 'edge',
                  source: nodeToTest.nodeId,
                  target: target,
                  data: {},
                } as any,
                nodeToTest.path
              )
            ) {
              queue.push({
                nodeId: target,
                path: [...nodeToTest.path, target],
              });
            }
          });
        }
      }
    }

    return findAllPaths ? paths : shortestPath;
  }
}
