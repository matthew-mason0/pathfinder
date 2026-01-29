package agentnavigation.simulation;

import java.util.HashMap;
import java.util.Map;

public class SimulationConfig {
    private final  Map<String, String> settings = new HashMap<>();

    public void set(String key, String value) {
        this.settings.put(key, value);
    }

    public String get(String key) {
        return this.settings.get(key);
    }

    public Map<String, String> getAll() {
        return this.settings;
    }
}
