import { Element } from './interfaces';
import { Graph } from './graph';

describe('graph', () => {
  it('should set nodes based on data', () => {
    const data: Element[] = [
      { id: 'node1', type: 'node', data: { some: 'data' } },
      { id: 'node2', type: 'node', data: { some: 'otherData' } },
      { id: 'node3', type: 'node', data: { some: 'anotherData' } },
    ];

    const graph = new Graph(data);

    expect(graph.node('node1')?.data.some).toEqual('data');
    expect(graph.node('node2')?.data.some).toEqual('otherData');
    expect(graph.node('node3')?.data.some).toEqual('anotherData');
  });

  it('should set edges based on data', () => {
    const data: Element[] = [
      { id: 'node1', type: 'node', data: { some: 'data' } },
      { id: 'node2', type: 'node', data: { some: 'otherData' } },
      { id: 'node3', type: 'node', data: { some: 'anotherData' } },
      { id: 'edge1', type: 'edge', source: 'node1', target: 'node2', data: {} },
      { id: 'edge2', type: 'edge', source: 'node2', target: 'node3', data: {} },
    ];

    const graph = new Graph(data);

    expect(graph.edge('edge1')?.source).toEqual('node1');
    expect(graph.edge('edge1')?.target).toEqual('node2');
  });

  describe('getDescendents', () => {
    it('should get descendents', () => {
      const data: Element[] = [
        { id: 'node1', type: 'node', data: {} },
        { id: 'node2', type: 'node', data: {} },
        { id: 'node3', type: 'node', data: {} },
        { id: 'node4', type: 'node', data: {} },
        { id: 'node5', type: 'node', data: {} },
        {
          id: 'edge1',
          type: 'edge',
          source: 'node1',
          target: 'node2',
          data: {},
        },
        {
          id: 'edge2',
          type: 'edge',
          source: 'node1',
          target: 'node3',
          data: {},
        },
        {
          id: 'edge3',
          type: 'edge',
          source: 'node2',
          target: 'node5',
          data: {},
        },
      ];

      const graph = new Graph(data);

      const descendents = graph.getDescendents('node1');
      expect(
        descendents.map((desc) => desc.id).sort((a, b) => a.localeCompare(b))
      ).toEqual(['node1', 'node2', 'node3', 'node5']);
    });
  });

  describe('getParent', () => {
    it('should get parent', () => {
      const data: Element[] = [
        { id: 'node1', type: 'node', data: {} },
        { id: 'node2', type: 'node', data: {} },
        { id: 'node3', type: 'node', data: {} },
        { id: 'node4', type: 'node', data: {} },
        { id: 'node5', type: 'node', data: {} },
        {
          id: 'edge1',
          type: 'edge',
          source: 'node1',
          target: 'node2',
          data: {},
        },
        {
          id: 'edge2',
          type: 'edge',
          source: 'node1',
          target: 'node3',
          data: {},
        },
        {
          id: 'edge3',
          type: 'edge',
          source: 'node2',
          target: 'node5',
          data: {},
        },
      ];

      const graph = new Graph(data);

      expect(graph.getParent('node1')).toEqual(null);
      expect(graph.getParent('node2')?.id).toEqual('node1');
      expect(graph.getParent('node3')?.id).toEqual('node1');
      expect(graph.getParent('node5')?.id).toEqual('node2');
    });
  });

  describe('shortestPath', () => {
    it('should find direct paths', () => {
      const data: Element[] = [
        { id: 'node1', type: 'node', data: { some: 'data' } },
        { id: 'node2', type: 'node', data: { some: 'otherData' } },
        { id: 'node3', type: 'node', data: { some: 'anotherData' } },
        {
          id: 'edge1',
          type: 'edge',
          source: 'node1',
          target: 'node2',
          data: {},
        },
        {
          id: 'edge2',
          type: 'edge',
          source: 'node2',
          target: 'node3',
          data: {},
        },
      ];

      const graph = new Graph(data);
      const path = graph.shortestPath('node1', 'node2');
      expect(path).toEqual(['node1', 'node2']);
    });

    it('should find simple paths', () => {
      const data: Element[] = [
        { id: 'node1', type: 'node', data: { some: 'data' } },
        { id: 'node2', type: 'node', data: { some: 'otherData' } },
        { id: 'node3', type: 'node', data: { some: 'anotherData' } },
        {
          id: 'edge1',
          type: 'edge',
          source: 'node1',
          target: 'node2',
          data: {},
        },
        {
          id: 'edge2',
          type: 'edge',
          source: 'node2',
          target: 'node3',
          data: {},
        },
      ];

      const graph = new Graph(data);
      const path = graph.shortestPath('node1', 'node3');
      expect(path).toEqual(['node1', 'node2', 'node3']);
    });

    it('should find shortest path when multiple exist', () => {
      const data: Element[] = [
        { id: 'node1', type: 'node', data: { some: 'data' } },
        { id: 'node2', type: 'node', data: { some: 'otherData' } },
        { id: 'node3', type: 'node', data: { some: 'anotherData' } },
        { id: 'node4', type: 'node', data: { some: 'anotherData' } },
        {
          id: 'edge1',
          type: 'edge',
          source: 'node1',
          target: 'node2',
          data: {},
        },
        {
          id: 'edge2',
          type: 'edge',
          source: 'node2',
          target: 'node3',
          data: {},
        },
        {
          id: 'edge3',
          type: 'edge',
          source: 'node3',
          target: 'node4',
          data: {},
        },
        {
          id: 'edge4',
          type: 'edge',
          source: 'node1',
          target: 'node3',
          data: {},
        },
        {
          id: 'edge5',
          type: 'edge',
          source: 'node3',
          target: 'node4',
          data: {},
        },
      ];

      const graph = new Graph(data);
      const path = graph.shortestPath('node1', 'node4');
      expect(path).toEqual(['node1', 'node3', 'node4']);
    });

    it('should avoid circular paths', () => {
      const data: Element[] = [
        { id: 'node1', type: 'node', data: { some: 'data' } },
        { id: 'node2', type: 'node', data: { some: 'otherData' } },
        { id: 'node3', type: 'node', data: { some: 'anotherData' } },
        {
          id: 'edge1',
          type: 'edge',
          source: 'node1',
          target: 'node2',
          data: {},
        },
        {
          id: 'edge3',
          type: 'edge',
          source: 'node2',
          target: 'node1',
          data: {},
        },
        {
          id: 'edge2',
          type: 'edge',
          source: 'node2',
          target: 'node3',
          data: {},
        },
      ];

      const graph = new Graph(data);
      const path = graph.shortestPath('node1', 'node3');
      expect(path).toEqual(['node1', 'node2', 'node3']);
    });
  });

  describe('pathWithConstraint', () => {
    it('should use constraint function to block edges', () => {
      const data: Element[] = [
        { id: 'node1', type: 'node', data: { some: 'data' } },
        { id: 'node2', type: 'node', data: { some: 'otherData' } },
        { id: 'node3', type: 'node', data: { some: 'anotherData' } },
        {
          id: 'edge1',
          type: 'edge',
          source: 'node1',
          target: 'node2',
          data: {},
        },
        {
          id: 'edge2',
          type: 'edge',
          source: 'node2',
          target: 'node3',
          data: {},
        },
        {
          id: 'edge3',
          type: 'edge',
          source: 'node1',
          target: 'node3',
          data: {},
        },
      ];

      const graph = new Graph(data);

      const path = graph.pathWithConstraint(
        'node1',
        'node3',
        (node1, node2, edge, path) => {
          //avoid the direct edge
          const cond = edge?.source !== 'node1' || edge?.target !== 'node3';

          return cond;
        }
      );

      expect(path).toEqual(['node1', 'node2', 'node3']);
    });
  });
});
