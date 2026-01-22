package agentnavigation.environment;

import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;

public class GridGraph implements Graph {
    private Map<Node, List<Node>> adjacencyList;

    public GridGraph() {
        adjacencyList = new HashMap<>();
        buildNodes();
    }

    @Override
    public List<Node> getNeighbours(Node node) {
        return adjacencyList.get(node);
    }
    
    private void buildNodes() {
        for (int row = 0; row < 10; row++) {
            for (int column = 0; column < 10; column++) {
                Node node = new Node(row, column);
                adjacencyList.put(node, new ArrayList<>());
            }
        }

        for (int row = 0; row < 10; row++) {
            for (int column = 0; column < 10; column++) {
                Node current = new Node(row, column);
                List<Node> neighbours = adjacencyList.get(current);
                
                if (row > 0) {
                    Node up = new Node(row - 1, column);
                    neighbours.add(up);
                }
                if (row < 9) {
                    Node down = new Node(row + 1, column);
                    neighbours.add(down);
                }
                if (column > 0) {
                    Node left = new Node(row, column - 1);
                    neighbours.add(left);
                }
                if (column < 9) {
                    Node right = new Node(row, column + 1);
                    neighbours.add(right);
                }
            }
        }
    }
}
