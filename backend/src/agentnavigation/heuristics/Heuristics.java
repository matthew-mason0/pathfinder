package agentnavigation.heuristics;

public final class Heuristics {
    private Heuristics() {} // prevent instantiation

    public static final Heuristic MANHATTAN = (a, b) ->
        Math.abs(a.getRow() - b.getRow()) +
        Math.abs(a.getColumn() - b.getColumn());
    
    public static final Heuristic EUCLIDEAN = (a, b) -> {
        int dx = a.getColumn() - b.getColumn();
        int dy = a.getRow() - b.getRow();
        return (int) Math.sqrt(dx * dx + dy * dy);
    };

    public static final Heuristic CHEBYSHEV = (a, b) -> 
        Math.max(
            Math.abs(a.getRow() - b.getRow()),
            Math.abs(a.getColumn() - b.getColumn())
        );
    
    public static final Heuristic ZERO = (a, b) -> 0;
}
