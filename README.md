Navigation Algorithm Visualisation Framework
Overview

This project is an interactive framework for implementing, visualising, and comparing agent navigation and pathfinding algorithms. It is designed with a strong emphasis on modularity, clarity, and extensibility, making it suitable for both educational use and experimentation.

The system separates computation from visualisation, allowing algorithm behaviour to be observed step-by-step in a controlled environment.

Features
Real-time visualisation of navigation algorithms on a grid-based environment
Step-based execution to clearly observe algorithm behaviour
Modular architecture for easily adding new algorithms or components
WebSocket communication between backend and frontend
Customisable environment (grid size, obstacles, etc.)
Designed to support multiple agents and future extensions
Architecture

The system is split into two main components:

Backend (Java)
Implements navigation algorithms
Maintains simulation state
Sends incremental updates via WebSockets
Frontend (JavaScript + p5.js)
Renders the environment and agents
Handles user interaction
Visualises algorithm steps in real time