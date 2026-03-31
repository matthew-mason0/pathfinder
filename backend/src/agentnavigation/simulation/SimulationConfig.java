package agentnavigation.simulation;

public class SimulationConfig {
    private int rows;
    private int columns;
    private String[][] gridState;
    private String algorithm;
    private String heuristic;
    private boolean timer;
    private boolean stepCounter;

    public SimulationConfig() {
        this.rows = 10;
        this.columns = 10;
        this.gridState = new String[][] {
            {"START", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"},
            {"EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"},
            {"EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"},
            {"EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"},
            {"EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"},
            {"EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"},
            {"EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"},
            {"EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"},
            {"EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"},
            {"EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "END"}
        };
        this.algorithm = "BFS";
        this.heuristic = "Manhattan";
        this.timer = false;
        this.stepCounter = false;
    }

    public int getRows() { return this.rows; }
    public int getColumns() { return this.columns; }
    public String[][] getGridState() { return this.gridState; }
    public String getAlgorithm() { return this.algorithm; }
    public String getHeuristic() { return this.heuristic; }
    public boolean isTimer() { return this.timer; }
    public boolean isStepCounter() { return this.stepCounter; }
    
    
    public void setRows(int rows) { this.rows = rows; }
    public void setColumns(int columns) { this.columns = columns; }
    public void setGridState(String[][] gridState) { this.gridState = gridState; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }
    public void setHeuristic(String heuristic) { this.heuristic = heuristic; }
    public void setTimer(boolean timer) { this.timer = timer; }
    public void setStepCounter(boolean stepCounter) { this.stepCounter = stepCounter; }

    public void printGridState() {
        for (int i = 0; i < this.rows; i++) {
                System.out.print("{");
            for (int j = 0; j < this.columns; j++) {
                System.out.print(this.gridState[i][j]);
                if (j != this.columns-1) System.out.print(", ");
            }
            System.out.print("}\n");
        }
    }

    // TODO Refactor to improve efficiency
    public int getStartNodeRow() {
        int startNodeRow = -1;
        for (int row = 0; row < this.rows; row++) {
            for (int column = 0; column < this.columns; column++) {
                if (this.gridState[row][column].equals("START")) startNodeRow = row;
            }
        }
        return startNodeRow;
    }
    public int getStartNodeColumn() {
        int startNodeColumn = -1;
        for (int row = 0; row < this.rows; row++) {
            for (int column = 0; column < this.columns; column++) {
                if (this.gridState[row][column].equals("START")) startNodeColumn = column;
            }
        }
        return startNodeColumn;
    }
    public int getEndNodeRow() {
        int endNodeRow = -1;
        for (int row = 0; row < this.rows; row++) {
            for (int column = 0; column < this.columns; column++) {
                if (this.gridState[row][column].equals("END")) endNodeRow = row;
            }
        }
        return endNodeRow;
    }
    public int getEndNodeColumn() {
        int endNodeColumn = -1;
        for (int row = 0; row < this.rows; row++) {
            for (int column = 0; column < this.columns; column++) {
                if (this.gridState[row][column].equals("END")) endNodeColumn = column;
            }
        }
        return endNodeColumn;
    }
}