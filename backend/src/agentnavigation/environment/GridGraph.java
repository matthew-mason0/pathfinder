package agentnavigation.environment;

import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Collection;

public class GridGraph implements Graph {
    private GridNode[][] nodes;
    private Map<Node, List<Node>> adjacencyList;

    private int nextNodeId = 0;

    public GridGraph(int rows, int columns) {
        adjacencyList = new HashMap<>();
        nodes = new GridNode[rows][columns];
        buildNodes(rows, columns);
        buildEdges(rows, columns);
    }

    @Override
    public Collection<Node> getNodes() {
        return adjacencyList.keySet();
    }
    public GridNode getNodeAt(int row, int column) {
        return nodes[row][column];
    }

    @Override
    public List<Node> getNeighbours(Node node) {
        return adjacencyList.get(node);
    }
    

    private void buildNodes(int rows, int columns) {
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                GridNode node = new GridNode(nextNodeId++, row, column);
                
                nodes[row][column] = node;
                adjacencyList.put(node, new ArrayList<>());
            }
        }
    }
    private void buildEdges(int rows, int columns) {
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {

                Node current = nodes[row][column];
                List<Node> neighbours = adjacencyList.get(current);
                
                if (row > 0) neighbours.add(nodes[row-1][column]);
                if (row < rows-1) neighbours.add(nodes[row+1][column]);
                if (column > 0) neighbours.add(nodes[row][column-1]);
                if (column < columns-1) neighbours.add(nodes[row][column+1]);
            }
        }
    }
}
