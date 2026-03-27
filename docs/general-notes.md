# Update Log

## 12/01/26 - frontend gridRenderer
The frontend `gridRenderer.js` file was created to handle the display logic necessary to put graphics on `index.html`. It is comprised of Cell, Grid and Grid Renderer classes. At this stage it is simple, to provide a placeholder interface for the backend to be implemented to. Upon development of the backend, this file may be refined to more precisely convey the inner-workings of algorithms.

### Cell class
The Cell class holds minimal data - it's coordinate relative to the grid it is contained in, and a terrain type (`EMPTY/WALL/START/END/...`) to reflect its algorithmic use. It contains no methods; it is simply for data grouping.

### Grid class
The Grid class provides a context for the cells. It contains a 2-dimensional array attribute for the cells - the constructor instantiates a new cell into each element. It also contains a `getCell()` method to provide a reference to each cell by its coordinate on the grid. Further methods such as `getNeighbours(Cell)` and `isWalkable(Cell)` are anticipated once the backend been integrated.

### Gridrenderer class
The GridRenderer class contains the bulk of the display logic. It is constructed only with an argument for cell size. It holds said cell size and a colour object literal as attributes. The colour object literal maps key-value pairs between a terrain type and an integer array which later is passed into colour parameters using the spread operator.  
The class has two draw methods. A grid can be passed into the first `draw()` method, which will then use a double for-loop to call the second `drawCell()` method on each of the cells. The `drawCell()` method takes a cell and draws a rectangle with its colour determined by the terrain type and its position determined by the cell size and coordinate.

## 25/01/26 - backend environment
Interfaces and factory classes were pre-emptively implemented to provide the anticipated necessary abstraction for supporting multiple algorithms and graph structures.

### Node classes
A general `Node` class was built to fill elements of a graph. It has override methods for equality, hashcode and human-readable printing. Each created node is identifiable by a unique id.  
The `GridNode` class inherits the `Node` class, and introduces row and column identifiers to provide easier referencing.

### GridGraph class
Grid Graph definition: [Wolfram MathWorld](https://mathworld.wolfram.com/GridGraph.html)
HashMap Theory: [Modern Algorithm Analysis: Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). Introduction to Algorithms (4th ed.). MIT Press.](https://books.google.co.uk/books?hl=en&lr=&id=RSMuEAAAQBAJ&oi=fnd&pg=PR13&dq=Modern+Algorithm+Analysis:+Cormen,+T.+H.,+Leiserson,+C.+E.,+Rivest,+R.+L.,+%26+Stein,+C.+(2022).+Introduction+to+Algorithms+(4th+ed.).+MIT+Press.&ots=a3m9XT4GUO&sig=qsesrbNtpjAMRTfAEEp3ueic1nU&redir_esc=y#v=onepage&q=Hashmap&f=false)

The `GridGraph` class implements the `Graph` interface to build the specific set of graphs known as two-dimensional lattice graphs. It takes in a number of rows and columns and uses a hashmap to build an adjacency list of nodes and their neighbours as key-value pairs.

### Environment Classes
The `Environment` class wraps together a graph and a start node to be passed into algorithms.
The `EnvironmentLoader` factory class contains a static `createGridEnvironment` to instantiate and produce a grid environment with a currently hardcoded start node. Later this will take in a start node passed from a websocket.

### Algorithm Classes
At this time only the `BFS` class has been developed to direct focus to larger scale design. In the spirit of abstraction, the `BFS` class implements a `SearchAlgorithm` interface, and is instantiated with an `AlgorithmFactory` factory class.  
The `BFS` class takes a given graph and start node and implements a queue and hashset to travese. A traversal list is produced by taking nodes from the queue and adding their neighbours to it. The hashset keeps record of which nodes have already been visited.

## 01/02/26 - backend WebSockets
WebSockets documentation: [WebSocket - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

Listener and Message classes were created to sense for algorithm steps and prepare messages to hand to a WebSocket. WebSocket server and client classes were created to provide a platfrom with which to send messages and test how they would be recieved on the frontend. A `SimulationController` class was built to communicate with the server and maintain system states upon commands received from clients.  

### Message Classes
The `Message` class formats any algorithm step into a set of attributes: type, nodeId, nodeRow, nodeColumn, nodeList, info. Fields which were not applicable to a given message were to be filled with `null`. A `MessageType` enum was implemented to provide a discrete and finite set of cases to handle later on. A `MessageSerialiser` class was created to convert the message objects into JSON to be sent over the WebSocket.  

### Listener Classes
A series of listener classes were made, implemnting a `StepListener` interface to track algorithm start/end, node discovery and exploration, whole frontier updates, and found paths. Singleton instances of listeners were passed into the BFS algorithm as an attribute. At the key points in the algorithm code, respective methods were called on the listener passing any relevant info to be used in the message creation. `SilentStepListener` and `ConsoleStepListener` classes were created to do nothing and to print human-readable step logic to the console for testing. A `SocketStepListener` class was created to build messages and pass them up with a `Consumer` object. The `Consumer` is a lambda function designed to serialise and send the message.  

### Simulation Controller and WebSocket Classes
The `WSSocket` class inherits an external `WebSocketServer` library to override open, close, message, error and start methods. It passes control to a `SimulationController` class.  
The `SimulationController` handles incoming and outgoing messages, and initialises and configures the environment and algorithim to offload main method responsibility.  
The `WSClientTest` class inherits an extranal `WebSocketClient` library, overriding similar methods to provide a client to view and debug the server's connection and message handling.


// TODO Connect config pages to update global settingState appropriately. Use 2d array to pass cell types to backend.