package agentnavigation.algorithms;

import java.util.List;

import agentnavigation.environment.Node;
import agentnavigation.environment.Graph;

public interface SearchAlgorithm {
    public List<Node> search(Graph graph, Node start, Node end, boolean timer);
}