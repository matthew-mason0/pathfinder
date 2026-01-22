package agentnavigation.algorithms;

public class AlgorithmFactory {
    public static SearchAlgorithm createBFS() {
        return new BFS();
    }
}