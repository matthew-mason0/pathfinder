package agentnavigation.listeners;

import java.util.Collection;
import java.util.List;

import agentnavigation.environment.Node;

public interface StepListener {
    void onAlgorithmStart(Node start);
    void onNodeDiscovered(Node node);
    void onNodeExplored(Node node);
    void onFrontierUpdate(Collection<Node> frontier);
    void onPathFound(List<Node> path);
    void onAlgorithmEnd(double timeTaken);
}
