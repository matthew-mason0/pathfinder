package agentnavigation.algorithms;

import java.util.Queue;
import java.util.ArrayDeque;
import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;

import agentnavigation.environment.Graph;
import agentnavigation.environment.Node;

public class BFS implements SearchAlgorithm {

    @Override
    public List<Node> search(Graph graph, Node start) {
        Queue<Node> queue = new ArrayDeque<>();
        Set<Node> visited = new HashSet<>();

        visited.add(start);
        queue.add(start);
        List<Node> traversalList = new ArrayList<>();

        while (!queue.isEmpty()) {
            Node current = queue.remove();
            traversalList.add(current);

            for (Node neighbour : graph.getNeighbours(current)) {
                if (!visited.contains(neighbour)) {
                    visited.add(neighbour);
                    queue.add(neighbour);
                }
            }
        }
        return traversalList;
    }
}