package agentnavigation.environment;

public class GridNode extends Node {
    private final int row;
    private final int column;
    private CellType type = CellType.EMPTY;

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

    public CellType getType() {
        return this.type;
    }

    public void setType(CellType type) {
        this.type = type;
    }

    @Override
    public boolean isWalkable() {
        return this.type != CellType.WALL;
    }

    @Override
    public String toString() {
        return "(" + this.row + ", " + this.column + ")";
    }
    
}
