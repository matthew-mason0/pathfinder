package agentnavigation.heuristics;

import agentnavigation.environment.GridNode;

@FunctionalInterface
public interface Heuristic {
    int estimate(GridNode a, GridNode b);
}