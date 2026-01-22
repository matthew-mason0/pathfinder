package agentnavigation.environment;

public class EnvironmentLoader {
    public static Graph createGridGraph(int rows, int columns) {
        return new GridGraph(rows, columns);
    }
}