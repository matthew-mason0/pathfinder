package agentnavigation;
/**
 * Entry point for backend
 * Responsible for initialising configuration, selecting environments and algorithms and starting the WebSocket server
 */

import java.util.List;

import agentnavigation.algorithms.AlgorithmFactory;
import agentnavigation.algorithms.SearchAlgorithm;
import agentnavigation.environment.EnvironmentLoader;
import agentnavigation.environment.Graph;
import agentnavigation.environment.Node;

public class Main {

    public static void main(String[] args) {
        Graph graph = EnvironmentLoader.createGridGraph(10, 10);
        SearchAlgorithm algorithm = AlgorithmFactory.createBFS();
        Node start = new Node(0, 0);

        List<Node> traversalList = algorithm.search(graph, start);
        System.out.println(traversalList);
    }
}
