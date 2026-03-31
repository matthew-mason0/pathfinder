package agentnavigation.algorithms;

import agentnavigation.heuristics.Heuristic;
import agentnavigation.heuristics.Heuristics;
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
            case "AStar":
                return createAStar("MANHATTAN", listener);
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
    public static SearchAlgorithm createAStar(String heuristicString, StepListener listener) {
        Heuristic heuristic;
        switch (heuristicString.toUpperCase()) {
            case "MANHATTAN":
                heuristic = Heuristics.MANHATTAN;
                break;
            case "EUCLIDEAN":
                heuristic = Heuristics.EUCLIDEAN;
                break;
            case "CHEBYSHEV":
                heuristic = Heuristics.CHEBYSHEV;
                break;
            case "ZERO":
                heuristic = Heuristics.ZERO;
                break;
            default:
                heuristic = Heuristics.MANHATTAN;
                break;
        }
        return new AStar(listener, heuristic);
    }
}