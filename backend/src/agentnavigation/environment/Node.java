package agentnavigation.environment;

public class Node {
    public int row;
    public int column;

    public Node(int row, int column) {
        this.row = row;
        this.column = column;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Node)) return false;
        Node node = (Node) obj;
        return (this.row == node.row && this.column == node.column);
    }

    @Override
    public int hashCode() {
        return 31 * this.row + this.column;
    }

    @Override
    public String toString() {
        return "(" +this.row + ", " + this.column + ")";
    }
}