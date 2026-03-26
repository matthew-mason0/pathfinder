package agentnavigation.simulation;

public class SimulationConfig {
    private int rows = 10;
    private int columns = 10;
    private String algorithm = "BFS";
    private String heuristic = "Manhattan";
    private boolean timer = false;
    private boolean stepCounter = false;

    public int getRows() { return this.rows; }
    public int getColumns() { return this.columns; }
    public String getAlgorithm() { return this.algorithm; }
    public String getHeuristic() { return this.heuristic; }
    public boolean isTimer() { return this.timer; }
    public boolean isStepCounter() { return this.stepCounter; }
    
    public void setRows(int rows) { this.rows = rows; }
    public void setColumns(int columns) { this.columns = columns; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }
    public void setHeuristic(String heuristic) { this.heuristic = heuristic; }
    public void setTimer(boolean timer) { this.timer = timer; }
    public void setStepCounter(boolean stepCounter) { this.stepCounter = stepCounter; }
}