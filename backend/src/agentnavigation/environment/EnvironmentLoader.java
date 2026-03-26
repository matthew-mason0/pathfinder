package agentnavigation.environment;

public class EnvironmentLoader {
    public static Environment createGridEnvironment(int rows, int columns) {
        GridGraph graph = new GridGraph(rows, columns);
        Node start = graph.getNodeAt(0, 0);
        Node end = graph.getNodeAt(9, 9);
        return new Environment(graph, start, end);
    }

    public static Environment createGridEnvironment(int rows, int columns, int startRow, int startColumn, int endRow, int endColumn) {
        GridGraph graph = new GridGraph(rows, columns);
        Node start = graph.getNodeAt(0, 0); // TODO allow for start node choice
        Node end = graph.getNodeAt(9, 9); // TODO allow for end node choice
        return new Environment(graph, start, end);
    }
}