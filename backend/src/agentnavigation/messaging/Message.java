package agentnavigation.messaging;

import java.util.List;

public class Message {
    private final MessageType type;
    private final String nodeId;
    private final String nodeRow;
    private final String nodeColumn;
    private final List<String> nodeList;
    private final String info;

    public Message(MessageType type, String nodeId, String nodeRow, String nodeColumn, List<String> nodeList, String info) {
        this.type = type;
        this.nodeId = nodeId;
        this.nodeRow = nodeRow;
        this.nodeColumn = nodeColumn;
        this.nodeList = nodeList;
        this.info = info;        
    }

    public MessageType getType() { return this.type; }
    public String getNodeId() { return this.nodeId; }
    public String getNodeRow() { return this.nodeRow; }
    public String getNodeColumn() { return this.nodeColumn; }
    public List<String> getNodeList() { return this.nodeList; }
    public String getInfo() { return this.info; }
}