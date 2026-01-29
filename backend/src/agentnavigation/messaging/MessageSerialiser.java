package agentnavigation.messaging;

import com.google.gson.Gson;

public class MessageSerialiser {
    private static final Gson gson = new Gson();

    public static String toJson(Message message) {
        return gson.toJson(message);
    }
}