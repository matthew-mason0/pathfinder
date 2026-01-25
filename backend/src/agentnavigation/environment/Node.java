package agentnavigation.environment;

public class Node {
    private final int id;

    public Node(int id) {
        this.id = id;
    }

    public int getId() {
        return this.id;
    }

    @Override
    public final boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Node)) return false;
        Node node = (Node) obj;
        return (this.id == node.id);
    }

    @Override
    public final int hashCode() {
        return Integer.hashCode(id);
    }

    @Override
    public String toString() {
        return "Node(" + this.id + ")";
    }
}