package agentnavigation.algorithms;

import java.util.Set;
import java.util.HashSet;
import java.util.List;  
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.HashMap;

import agentnavigation.environment.Graph;
import agentnavigation.environment.Node;
import agentnavigation.listeners.SilentStepListener;
import agentnavigation.listeners.StepListener;

public class Dijkstra implements SearchAlgorithm {

    private final StepListener listener;
    public Dijkstra() {
        this.listener = SilentStepListener.INSTANCE;
    }
    public Dijkstra(StepListener listener) {
        this.listener = listener;
    }

    @Override
    public List<Node> search(Graph graph, Node start, Node end) {
        Set<Node> visited = new HashSet<>();
        List<Node> traversalList = new ArrayList<>();
        Map<Node, Node> predecessors = new HashMap<>();
        Map<Node, Integer> distance = new HashMap<>();
        PriorityQueue<Node> priorityQueue = new PriorityQueue<>(Comparator.comparingInt(distance::get));

        distance.put(start, 0);
        listener.onAlgorithmStart(start);

        priorityQueue.add(start);
        listener.onNodeDiscovered(start);
        listener.onFrontierUpdate(priorityQueue);

        while (!priorityQueue.isEmpty()) {
            Node current = priorityQueue.poll();
            if (visited.contains(current)) continue;
            visited.add(current);
            listener.onNodeExplored(current);
            traversalList.add(current);

            if (end != null && current.equals(end)) {
                List<Node> path = buildPath(start, end, predecessors);
                listener.onPathFound(path);
                listener.onAlgorithmEnd();
                return traversalList;
            }
            for (Node neighbour : graph.getNeighbours(current)) {
                if (!neighbour.isWalkable()) continue;
                // if (visited.contains(neighbour)) continue;

                int currentDistance = distance.get(current);
                int oldDistance = distance.getOrDefault(neighbour, Integer.MAX_VALUE);
                int newDistance = currentDistance + 1; // unweighted => every cost is 1

                if (newDistance < oldDistance) {
                    distance.put(neighbour, newDistance);
                    predecessors.put(neighbour, current);
                    priorityQueue.add(neighbour);

                    listener.onNodeDiscovered(neighbour);
                }
            }
            listener.onFrontierUpdate(priorityQueue);
        }
        listener.onAlgorithmEnd();
        return traversalList;
    }

    private List<Node> buildPath(Node start, Node end, Map<Node, Node> predecessors) {
        List<Node> path = new ArrayList<>();
        Node current = end;
        while (current!= null) {
            path.add(0, current);
            current = predecessors.get(current);
        }
        return path;
    }
}