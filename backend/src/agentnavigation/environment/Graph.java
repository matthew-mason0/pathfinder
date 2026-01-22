package agentnavigation.environment;

import java.util.List;

public interface Graph {
    List<Node> getNeighbours(Node node);
}