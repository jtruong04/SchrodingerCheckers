import { union } from 'lodash';

const traverseGraph = (graph, queue, marked) => {
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

export default traverseGraph;
