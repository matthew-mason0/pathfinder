package agentnavigation;
/**
 * Entry point for backend
 * Responsible for initialising environments and algorithms, and starting the WebSocket server
 */

import java.util.List;

import agentnavigation.algorithms.AlgorithmFactory;
import agentnavigation.algorithms.SearchAlgorithm;
import agentnavigation.environment.Environment;
import agentnavigation.environment.EnvironmentLoader;
import agentnavigation.environment.Node;
import agentnavigation.listeners.ConsoleStepListener;

public class Main {

    public static void main(String[] args) {
        Environment environment = EnvironmentLoader.createGridEnvironment(10, 10);
        SearchAlgorithm algorithm = AlgorithmFactory.createBFS(ConsoleStepListener.INSTANCE);

        List<Node> traversalList = algorithm.search(environment.getGraph(), environment.getStart(), environment.getEnd());
        // System.out.println(traversalList);
    }
}
