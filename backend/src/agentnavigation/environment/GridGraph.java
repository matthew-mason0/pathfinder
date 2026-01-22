package agentnavigation.environment;

import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;

public class GridGraph implements Graph {
    private Map<Node, List<Node>> adjacencyList;

    public GridGraph(int rows, int columns) {
        adjacencyList = new HashMap<>();
        buildNodes(rows, columns);
    }

    @Override
    public List<Node> getNeighbours(Node node) {
        return adjacencyList.get(node);
    }
    
    private void buildNodes(int rows, int columns) {
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                Node node = new Node(row, column);
                adjacencyList.put(node, new ArrayList<>());
            }
        }

        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                Node current = new Node(row, column);
                List<Node> neighbours = adjacencyList.get(current);
                
                if (row > 0) {
                    Node up = new Node(row - 1, column);
                    neighbours.add(up);
                }
                if (row < rows-1) {
                    Node down = new Node(row + 1, column);
                    neighbours.add(down);
                }
                if (column > 0) {
                    Node left = new Node(row, column - 1);
                    neighbours.add(left);
                }
                if (column < columns-1) {
                    Node right = new Node(row, column + 1);
                    neighbours.add(right);
                }
            }
        }
    }
}
