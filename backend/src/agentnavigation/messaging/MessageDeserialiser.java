package agentnavigation.messaging;

import com.google.gson.Gson;

public class MessageDeserialiser {
    private static final Gson gson = new Gson();

    public static <T> T fromJson(String message, Class<T> type) {
        return gson.fromJson(message, type);
    }
}