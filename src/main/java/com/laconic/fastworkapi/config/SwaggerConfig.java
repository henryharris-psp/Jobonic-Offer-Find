package com.laconic.fastworkapi.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@OpenAPIDefinition(
        servers = {
                @Server(url = "/", description = "Default Server URL")
        }
)
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customizeOpenAPI() {
        var info = new Info()
                .title("FastWork System API")
                .description("Rest API for FastWork System")
                .version("1.0");

        var securityRequirement = new SecurityRequirement()
                .addList("bearerToken");

        var securityScheme = new SecurityScheme()
                .name("bearerToken")
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");

        return new OpenAPI()
                .info(info)
                .addSecurityItem(securityRequirement)
                .components(new Components()
                                    .addSecuritySchemes("bearerToken", securityScheme));
    }
}
