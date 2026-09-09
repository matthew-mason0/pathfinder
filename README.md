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

# Pathfinder

A real-time agent navigation and pathfinding visualisation system developed as a third-year university dissertation project.

Pathfinder consists of a **Java backend** responsible for pathfinding and agent navigation, and a **p5.js frontend** that visualises the simulation. The two components communicate in real time using **WebSockets**.

## Overview

Pathfinder explores how autonomous agents can navigate through an environment while responding to their surroundings and dynamically determining routes to their destinations.

The project was designed to separate the navigation logic from its visualisation. This architecture allowed the navigation system to operate independently from the graphical interface while still providing a real-time visual representation of the agents' behaviour.

## Features

* Real-time agent navigation
* Pathfinding through a configurable environment
* Interactive visualisation using p5.js
* Java-based backend for navigation and simulation logic
* WebSocket communication between frontend and backend
* Visual representation of agents, paths and the environment

## Architecture

The application is split into two primary components.

### Backend

The Java backend is responsible for the core simulation and navigation functionality. It manages agents and calculates the routes they use to navigate through the environment.

### Frontend

The p5.js frontend provides an interactive visual representation of the simulation. It displays the environment and agents and communicates with the backend to receive simulation updates.

### Communication

The frontend and backend communicate using WebSockets, allowing information to be exchanged without repeatedly creating new HTTP requests.


## Dissertation

Pathfinder was developed as a third-year dissertation project, investigating agent navigation and pathfinding through a system that combines algorithmic navigation with real-time visualisation.

## Future Improvements

Potential areas for further development include:

* More sophisticated agent behaviours
* Additional pathfinding algorithms
* Dynamic obstacles
* Improved visualisation and interaction
* Larger and more complex environments
* Performance optimisation for larger numbers of agents

## Author
**Matthew Mason**