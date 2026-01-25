package agentnavigation.environment;

public class Environment {
    private final Graph graph;
    private final Node start;
    private final Node end;
    
    public Environment(Graph graph, Node start, Node end) {
        this.graph = graph;
        this.start = start;
        this.end = end;
    }

    public Graph getGraph() { return this.graph; }

    public Node getStart() { return this.start; }

    public Node getEnd() { return this.end; }
}
