import { union } from 'lodash';

const traverseGraph = (graph, queue, marked = []) => {
    if (queue.length === 0) {
        return marked;
    }
    let currentNode = queue.shift();
    marked = union(marked, [currentNode]);
    graph[currentNode].forEach((node) => {
        if (!marked.includes(node)) {
            queue.push(node);
        }
    });
    return traverseGraph(graph, queue, marked);
};

export const traverseGraphDepth = (graph, queue, marked = []) => {
    if (queue.length === 0) {
        return marked;
    }
    let next = queue.shift();
    const { node, depth } = next;
    marked[depth] = union(marked[depth], [node]);
    graph[node].forEach((node) => {
        if (!marked.some((row) => row.includes(node))) {
            queue.push({ node, depth: depth + 1 });
        }
    });
    return traverseGraphDepth(graph, queue, marked);
};

export default traverseGraph;
