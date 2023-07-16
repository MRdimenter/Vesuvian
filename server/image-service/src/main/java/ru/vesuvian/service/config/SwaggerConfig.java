package ru.vesuvian.service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.*;

@Configuration
public class SwaggerConfig {
//    @Value("${keycloak.auth-server-url}")
//    String authServerUrl;
//    @Value("${keycloak.realm}")
//    String realm;
//
//    private static final String OAUTH_SCHEME_NAME = "swagger-ui";

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().components(new Components())
                       // .addSecuritySchemes(OAUTH_SCHEME_NAME, createOAuthScheme()))
                //.addSecurityItem(new SecurityRequirement().addList(OAUTH_SCHEME_NAME))
                .info(new Info().title("Image service")
                        .description("Service for receiving images from the server\n")
                        .version("1.0"));
    }

//    private SecurityScheme createOAuthScheme() {
//        OAuthFlows flows = createOAuthFlows();
//        return new SecurityScheme().type(SecurityScheme.Type.OAUTH2)
//                .flows(flows);
//    }
//
//    private OAuthFlows createOAuthFlows() {
//        OAuthFlow flow = createAuthorizationCodeFlow();
//        return new OAuthFlows().clientCredentials(flow);
//    }
//
//    private OAuthFlow createAuthorizationCodeFlow() {
//        return new OAuthFlow()
//                .tokenUrl("http://212.113.120.198:8282/realms/dev/protocol/openid-connect/token")
//                .scopes(new Scopes().addString("user", "Access to user data"));
//    }

}

