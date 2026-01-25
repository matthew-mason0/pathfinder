package agentnavigation.algorithms;

import java.util.Queue;
import java.util.ArrayDeque;
import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;

import agentnavigation.environment.Graph;
import agentnavigation.environment.Node;
import agentnavigation.listeners.ConsoleStepListener;
import agentnavigation.listeners.StepListener;

public class BFS implements SearchAlgorithm {

    private final StepListener listener;
    public BFS() {
        this.listener = ConsoleStepListener.INSTANCE;
    }
    public BFS(StepListener listener) {
        this.listener = listener;
    }

    @Override
    public List<Node> search(Graph graph, Node start) {
        Queue<Node> queue = new ArrayDeque<>();
        Set<Node> visited = new HashSet<>();
        List<Node> traversalList = new ArrayList<>();

        listener.onAlgorithmStart(start);

        visited.add(start);
        queue.add(start);
        listener.onNodeDiscovered(start);
        listener.onFrontierUpdate(queue);

        while (!queue.isEmpty()) {
            Node current = queue.remove();
            listener.onNodeExplored(current);
            listener.onFrontierUpdate(queue);
            traversalList.add(current);

            for (Node neighbour : graph.getNeighbours(current)) {
                if (!visited.contains(neighbour)) {
                    visited.add(neighbour);
                    queue.add(neighbour);
                    listener.onNodeDiscovered(neighbour);
                    listener.onFrontierUpdate(queue);
                }
            }
        }
        listener.onAlgorithmEnd();
        return traversalList;
    }
}