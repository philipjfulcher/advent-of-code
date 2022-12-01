import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Edge, Graph, Node } from '@advent-of-code/util-graphs';

interface CaveData {
  size: 'big' | 'small' | 'edge';
}

export async function calculateAnswer(fileName: string) {
  const promise = new Promise((resolve) => {
    console.log(`Reading from ${join(__dirname, fileName)}`);

    const rl = createInterface({
      input: createReadStream(join(__dirname, fileName)),
    });

    const lines: string[] = [];

    rl.on('line', (line) => {
      lines.push(line);
    });

    rl.on('close', () => {
      const nodeIds = new Set<string>();
      const edges: Edge<CaveData>[] = [];

      lines.forEach((line) => {
        const split = line.split('-');
        nodeIds.add(split[0]);
        nodeIds.add(split[1]);
        edges.push({
          id: line,
          type: 'edge',
          source: split[0],
          target: split[1],
          data: {
            size: 'edge',
          },
        });
      });

      const nodes: Node<CaveData>[] = Array.from(nodeIds).map((nodeId) => {
        if (nodeId === nodeId.toUpperCase()) {
          return {
            id: nodeId,
            type: 'node',
            data: {
              size: 'big',
            },
          };
        } else {
          return {
            id: nodeId,
            type: 'node',
            data: {
              size: 'small',
            },
          };
        }
      });

      const graph = new Graph<CaveData>([...nodes, ...edges]);

      const paths = graph.pathWithConstraint(
        'start',
        'end',
        (node1, node2, edge, path) => {
          let cond;
          if (node2.data.size === 'big') {
            cond = true;
          } else {
            if (node2.id === 'start' || node1.id === 'end') {
              cond = false;
            } else if (!path.includes(node2.id)) {
              cond = true;
            } else {
              const smallCaveCounts = new Set<string>();

              const smallCaveVisitedTwice =
                path
                  .filter((cave) => cave === cave.toLowerCase())
                  .findIndex((cave) => {
                    if (smallCaveCounts.has(cave)) {
                      return true;
                    } else {
                      smallCaveCounts.add(cave);
                      return false;
                    }
                  }) > -1;

              cond = !smallCaveVisitedTwice;
            }
            // see if a small cave has been visited twice yet
          }

          // console.log({ node1, node2, edge, path, cond });

          return cond;
        },
        true
      );

      const answer = paths.length;

      console.log(`The answer is ${answer}`);

      resolve(answer);
    });
  });

  return promise;
}
