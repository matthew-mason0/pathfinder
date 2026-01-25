package agentnavigation.environment;

public class Environment {
    private final Graph graph;
    private final Node start;

    public Environment(Graph graph, Node start) {
        this.graph = graph;
        this.start = start;
    }

    public Graph getGraph() { return this.graph; }

    public Node getStart() { return this.start; }
}
