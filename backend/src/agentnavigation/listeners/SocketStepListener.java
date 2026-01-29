package agentnavigation.listeners;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.Consumer;

import agentnavigation.environment.Node;
import agentnavigation.messaging.Message;
import agentnavigation.messaging.MessageType;

public class SocketStepListener implements StepListener{
    private final Consumer<Message> sender;

    public SocketStepListener(Consumer<Message> sender) {
        this.sender = sender;
    }
    
    @Override
    public void onAlgorithmStart(Node start) {

        Message message = new Message(
            MessageType.ALGORITHM_START,
            nodeIdFormatter(start),
            null,
            null
        );

        sender.accept(message);
    }

    @Override
    public void onNodeDiscovered(Node node) {

        Message message = new Message(
            MessageType.NODE_DISCOVERED,
            nodeIdFormatter(node),
            null,
            null
        );

        sender.accept(message);
    }

    @Override
    public void onNodeExplored(Node node) {

        Message message = new Message(
            MessageType.NODE_EXPLORED,
            nodeIdFormatter(node),
            null,
            null
        );

        sender.accept(message);
    }

    @Override
    public void onFrontierUpdate(Collection<Node> frontier) {
        Message message = new Message(
            MessageType.FRONTIER_UPDATE,
            null,
            nodeListFormatter(frontier),
            null
        );

        sender.accept(message);
    }

    @Override
    public void onPathFound(List<Node> path) {

        Message message = new Message(
            MessageType.PATH_FOUND,
            null,
            nodeListFormatter(path),
            null
        );

        sender.accept(message);
    }   

    @Override
    public void onAlgorithmEnd() {
        Message message = new Message(
            MessageType.ALGORITHM_END,
            null,
            null,
            null
        );

        sender.accept(message);
    }

    private List<String> nodeListFormatter(List<Node> nodeList) {
        List<String> formattedList = new ArrayList<>();
        for (Node node : nodeList) {
            formattedList.add(node.toString());
        }
        return formattedList;
    }
    private List<String> nodeListFormatter(Collection<Node> nodeList) {
        List<Node> list = new ArrayList<>(nodeList);
        return nodeListFormatter(list);
    }

    private String nodeIdFormatter(Node node) {
        Integer nodeId = node.getId();
        return nodeId.toString();
    }
}
