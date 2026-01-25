package agentnavigation.messaging;

import java.util.List;

public class Message {
    private final MessageType type;
    private final String nodeId;
    private final List<String> nodeList;
    private final String info;

    public Message(MessageType type, String nodeId, List<String> nodeList, String info) {
        this.type = type;
        this.nodeId = nodeId;
        this.nodeList = nodeList;
        this.info = info;        
    }

    public MessageType getType() { return type; }
    public String getNodeId() { return nodeId; }
    public List<String> getNodeList() { return nodeList; }
    public String getInfo() { return info; }
}