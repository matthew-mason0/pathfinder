package agentnavigation.environment;

public class GridNode extends Node {
    private final int row;
    private final int column;

    public GridNode(int id, int row, int column) {
        super(id);
        this.row = row;
        this.column = column;
    }

    public int getRow() {
        return this.row;
    }

    public int getColumn() {
        return this.column;
    }

    @Override
    public String toString() {
        return "GridNode(" + this.row + ", " + this.column + ")";
    }
    
}
