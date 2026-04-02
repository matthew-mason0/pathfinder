package agentnavigation.listeners;

import java.util.Collection;
import java.util.List;

import agentnavigation.environment.Node;

public class ConsoleStepListener implements StepListener {
    public static final StepListener INSTANCE = new ConsoleStepListener();
    private ConsoleStepListener() {}; // prevents new instances elsewhere

    @Override
    public void onAlgorithmStart(Node start) {
        System.out.println("Algorithm started at node: " + start);
    }

    @Override
    public void onNodeDiscovered(Node node) {
        System.out.println("Node discovered: " + node );
    }

    @Override
    public void onNodeExplored(Node node) {
        System.out.println("Node explored: " + node);
    }

    @Override
    public void onFrontierUpdate(Collection<Node> frontier) {
        System.out.println("Frontier now contains: " + frontier);
    }

    @Override
    public void onPathFound(List<Node> path) {
        System.out.println("Path found: " + path);
    }

    @Override
    public void onAlgorithmEnd(double timeTaken) {
        System.out.println("Algorithm finished in " + timeTaken + " ms.");
    }
    
}
