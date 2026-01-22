package agentnavigation.algorithms;

import agentnavigation.environment.Node;
import agentnavigation.environment.Graph;

public interface SearchAlgorithm {
    public void search(Graph graph, Node node);
}