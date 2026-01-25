package agentnavigation.environment;

import java.util.Collection;
import java.util.List;

public interface Graph {
    Collection<Node> getNodes();
    List<Node> getNeighbours(Node node);
}