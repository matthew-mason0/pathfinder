package agentnavigation.algorithms;

import agentnavigation.listeners.StepListener;

public class AlgorithmFactory {
    public static SearchAlgorithm createBFS(StepListener listener) {
        return new BFS(listener);
    }
}