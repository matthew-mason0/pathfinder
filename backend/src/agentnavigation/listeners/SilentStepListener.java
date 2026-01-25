package agentnavigation.listeners;

import java.util.Collection;
import java.util.List;

import agentnavigation.environment.Node;

public final class SilentStepListener implements StepListener {

    public static final StepListener INSTANCE = new SilentStepListener();
    private SilentStepListener() {}; // prevents new instances elsewhere

    @Override
    public void onAlgorithmStart(Node start) {}

    @Override
    public void onNodeDiscovered(Node node) {}

    @Override
    public void onNodeExplored(Node node) {}

    @Override
    public void onFrontierUpdate(Collection<Node> frontier) {}

    @Override
    public void onPathFound(List<Node> path) {}

    @Override
    public void onAlgorithmEnd() {}
}
