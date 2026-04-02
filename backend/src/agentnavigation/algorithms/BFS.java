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
    public List<Node> search(Graph graph, Node start, Node end, boolean timer) {
        Queue<Node> queue = new ArrayDeque<>();
        Set<Node> visited = new HashSet<>();
        List<Node> traversalList = new ArrayList<>();
        Map<Node, Node> predecessors = new HashMap<>();
        long timeStart = 0;
        long timeEnd = 0;

        listener.onAlgorithmStart(start);
        if (timer) timeStart = System.nanoTime();

        visited.add(start);
        queue.add(start);
        listener.onNodeDiscovered(start);
        listener.onFrontierUpdate(queue);

        while (!queue.isEmpty()) {
            Node current = queue.remove();
            listener.onNodeExplored(current);
            traversalList.add(current);

            if (end != null && current.equals(end)) {
                if (timer) timeEnd = System.nanoTime();
                List<Node> path = buildPath(start, end, predecessors);
                listener.onPathFound(path);
                listener.onAlgorithmEnd((timeEnd - timeStart) / 1_000_000.0);
                return traversalList;
            }
            for (Node neighbour : graph.getNeighbours(current)) {
                if (!neighbour.isWalkable()) continue;
                if (visited.contains(neighbour)) continue;

                visited.add(neighbour);
                queue.add(neighbour);
                predecessors.put(neighbour, current);

                listener.onNodeDiscovered(neighbour);
            }
            listener.onFrontierUpdate(queue);
        }

        if (timer) timeEnd = System.nanoTime();
        listener.onAlgorithmEnd((timeEnd - timeStart) / 1_000_000.0);
        return traversalList;
    }

    private List<Node> buildPath(Node start, Node end, Map<Node, Node> predecessors) {
        // TODO Refactor for all algorithmns
        List<Node> path = new ArrayList<>();
        Node current = end;
        while (current != null) {
            path.add(0, current);
            current = predecessors.get(current);
        }
        return path;
    }
}