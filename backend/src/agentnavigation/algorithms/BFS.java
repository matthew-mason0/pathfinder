package agentnavigation.algorithms;

import java.util.Queue;
import java.util.ArrayDeque;
import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

import agentnavigation.environment.Graph;
import agentnavigation.environment.Node;
import agentnavigation.listeners.SilentStepListener;
import agentnavigation.listeners.StepListener;

public class BFS implements SearchAlgorithm {

    private final StepListener listener;
    public BFS() {
        this.listener = SilentStepListener.INSTANCE;
    }
    public BFS(StepListener listener) {
        this.listener = listener;
    }

    
    @Override
    public List<Node> search(Graph graph, Node start, Node end) {
        Queue<Node> queue = new ArrayDeque<>();
        Set<Node> visited = new HashSet<>();
        List<Node> traversalList = new ArrayList<>();
        Map<Node, Node> predecessors = new HashMap<>();

        listener.onAlgorithmStart(start);

        visited.add(start);
        queue.add(start);
        listener.onNodeDiscovered(start);
        listener.onFrontierUpdate(traversalList);

        while (!queue.isEmpty()) {
            Node current = queue.remove();
            listener.onNodeExplored(current);
            listener.onFrontierUpdate(queue);
            traversalList.add(current);

            if (end != null && current.equals(end)) {
                List<Node> path = buildPath(start, end, predecessors);
                listener.onPathFound(path);
                listener.onAlgorithmEnd();
                return traversalList;
            }
            for (Node neighbour : graph.getNeighbours(current)) {
                if (!visited.contains(neighbour)) {
                    visited.add(neighbour);
                    queue.add(neighbour);
                    predecessors.put(neighbour, current);

                    listener.onNodeDiscovered(neighbour);
                    listener.onFrontierUpdate(queue);
                }
            }
        }
        listener.onAlgorithmEnd();
        return traversalList;
    }

    private List<Node> buildPath(Node start, Node end, Map<Node, Node> predecessors) {
        List<Node> path = new ArrayList<>();
        Node current = end;
        while (current != null) {
            path.add(0, current);
            current = predecessors.get(current);
        }
        return path;
    }
}