# Update Log

## 12/01/26 - gridRenderer
The frontend `gridRenderer.js` file was created to handle the display logic necessary to put graphics on `index.html`. It is comprised of Cell, Grid and Grid Renderer classes. At this stage it is simple, to provide a placeholder interface for the backend to be implemented to. Upon development of the backend, this file may be refined to more precisely convey the inner-workings of algorithms.

The Cell class holds minimal data - it's coordinate relative to the grid it is contained in, and a terrain type (`EMPTY/WALL/START/GOAL/...`) to reflect its algorithmic use. It contains no methods; it is simply for data grouping.

The Grid class provides a context for the cells. It contains a 2-dimensional array attribute for the cells - the constructor instantiates a new cell into each element. It also contains a `getCell()` method to provide a reference to each cell by its coordinate on the grid. Further methods such as `getNeighbours(Cell)` and `isWalkable(Cell)` are anticipated once the backend been integrated.

The GridRenderer class contains the bulk of the display logic. It is constructed only with an argument for cell size. It holds said cell size and a colour object literal as attributes. The colour object literal maps key-value pairs between a terrain type and an integer array which later is passed into colour parameters using the spread operator.  
The class has two draw methods. A grid can be passed into the first `draw()` method, which will then use a double for-loop to call the second `drawCell()` method on each of the cells. The `drawCell()` method takes a cell and draws a rectangle with its colour determined by the terrain type and its position determined by the cell size and coordinate.