package agentnavigation.algorithms;

import agentnavigation.listeners.StepListener;

public class AlgorithmFactory {
    public static SearchAlgorithm createAlgorithm(String algorithm, StepListener listener) {
        switch (algorithm) {
            case "BFS":
                return createBFS(listener);
            case "DFS":
                return createDFS(listener);
            case "Dijkstra":
                return createDijkstra(listener);
            default:
                return createBFS(listener);
        }
    }
    public static SearchAlgorithm createBFS(StepListener listener) {
        return new BFS(listener);
    }
    public static SearchAlgorithm createDFS(StepListener listener) {
        return new DFS(listener);
    }
    public static SearchAlgorithm createDijkstra(StepListener listener) {
        return new Dijkstra(listener);
    }
}