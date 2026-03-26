package agentnavigation.simulation;

public class SimulationConfig {
    private int rows = 10;
    private int columns = 10;
    private int startNodeRow = 0;
    private int startNodeColumn = 0;
    private int endNodeRow = 9;
    private int endNodeColumn = 9;
    private String algorithm = "BFS";
    private String heuristic = "Manhattan";
    private boolean timer = false;
    private boolean stepCounter = false;

    public int getRows() { return this.rows; }
    public int getColumns() { return this.columns; }

    public int getStartNodeRow() { return this.startNodeRow; }
    public int getStartNodeColumn() { return this.startNodeColumn; }
    public int getEndNodeRow() { return this.endNodeRow; }
    public int getEndNodeColumn() { return this.endNodeColumn; }

    public String getAlgorithm() { return this.algorithm; }
    public String getHeuristic() { return this.heuristic; }
    public boolean isTimer() { return this.timer; }
    public boolean isStepCounter() { return this.stepCounter; }
    
    
    public void setRows(int rows) { this.rows = rows; }
    public void setColumns(int columns) { this.columns = columns; }

    public void setStartNodeRow(int startNodeRow) { this.startNodeRow = startNodeRow; }
    public void setStartNodeColumn(int startNodeColumn) { this.startNodeColumn = startNodeColumn; }
    public void setEndNodeRow(int endNodeRow) { this.endNodeRow = endNodeRow; }
    public void setEndNodeColumn(int endNodeColumn) { this.endNodeColumn = endNodeColumn; }

    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }
    public void setHeuristic(String heuristic) { this.heuristic = heuristic; }
    public void setTimer(boolean timer) { this.timer = timer; }
    public void setStepCounter(boolean stepCounter) { this.stepCounter = stepCounter; }
}