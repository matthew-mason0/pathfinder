/**
 * Entry point for backend
 * Responsible for initialising configuration, selecting environments and algorithms and starting the WebSocket server
 */

package agentnavigation;

import agentnavigation.algorithms.SearchAlgorithm;

public class Main {

    public static void main(String[] args) {
        System.out.println("Hello World!");
        System.out.println(SearchAlgorithm.class.getName());
    }
}
