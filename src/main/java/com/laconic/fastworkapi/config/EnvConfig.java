package com.laconic.fastworkapi.config;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
public class EnvConfig {
    private final Dotenv dotenv;

    public EnvConfig() {
        this.dotenv = Dotenv.configure().ignoreIfMissing().load();
    }

    public String getEnvValue(String key) {
        return dotenv.get(key);
    }
}
