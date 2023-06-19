package ru.vesuvian.service.customer.config;

//@OpenAPIDefinition(info = @Info(title = "Customer Service API", description = "Customer API documentation", version = "1.0"), security = @SecurityRequirement(name = "oauth2_bearer"),
//        servers = {@Server(url = "${server.servlet.context-path}", description = "Default Server URL")})
//@SecurityScheme(name = "oauth2_bearer", type = SecuritySchemeType.OAUTH2,
//        flows = @OAuthFlows(authorizationCode = @OAuthFlow(authorizationUrl = "${springdoc.oauthflow.authorization-url}", tokenUrl = "${springdoc.oauthflow.token-url}", scopes = {
//                @OAuthScope(name = "openid", description = "openid")
//        })))

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;

//@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        final String apiTitle = "My API";

        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(
                        new Components()
                                .addSecuritySchemes(securitySchemeName,
                                        new SecurityScheme()
                                                .name(securitySchemeName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                )
                .info(new Info().title(apiTitle));
    }
//
//
//    @Bean
//    public Docket api() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                .select()
//                .apis(RequestHandlerSelectors.any())
//                .apis(RequestHandlerSelectors.basePackage("ru.vesuvian.service.customer.controller"))
//                .apis(RequestHandlerSelectors.basePackage("server.customer.src.main.java.ru.vesuvian.service.customer.controller.CustomerController.java"))
//
//                .paths(PathSelectors.any())
//
//                .build()
//                .securitySchemes(Arrays.asList(securityScheme()))
//                .securityContexts(Arrays.asList(securityContext()));
//    }
//    private SecurityScheme securityScheme() {
//        GrantType grantType = new AuthorizationCodeGrantBuilder()
//                .tokenEndpoint(new TokenEndpoint("http://45.141.103.134:8282/realms/dev/protocol/openid-connect/token", "oauthtoken"))
//                .tokenRequestEndpoint(
//                        new TokenRequestEndpoint("http://45.141.103.134:8282/realms/dev/protocol/openid-connect/auth", "swagger-ui", "ZoistP5MrGPQdSBfC9kdmPJC1OEhqgCx"))
//                .build();
//
//        SecurityScheme oauth = new OAuthBuilder().name("spring_oauth")
//                .grantTypes(Arrays.asList(grantType))
//                .scopes(Arrays.asList(scopes()))
//                .build();
//        return oauth;
//    }
//
//    private SecurityContext securityContext() {
//        return SecurityContext.builder()
//                .securityReferences(
//                        Arrays.asList(new SecurityReference("spring_oauth", scopes())))
//                .forPaths(PathSelectors.any())
//                .build();
//    }
//
//    private AuthorizationScope[] scopes() {
//        AuthorizationScope[] scopes = {
//                new AuthorizationScope("read", "for read operations"),
//                new AuthorizationScope("write", "for write operations"),
//                new AuthorizationScope("foo", "Access foo API") };
//        return scopes;
//    }


//    @Bean
//    public OpenAPI customOpenAPI() {
//        return new OpenAPI()
//                .components(new Components().addSecuritySchemes("keycloak",
//                        new SecurityScheme()
//                                .type(SecurityScheme.Type.OAUTH2)
//                                .flows(new OAuthFlows().implicit(new OAuthFlow()
//                                        .authorizationUrl("http://45.141.103.134:8282/realms/dev/protocol/openid-connect/auth")
//                                        .scopes(new Scopes().addString("read", "allows reading all"))))
//                                .name("keycloak")
//                                .scheme("oauth2")
//                                .bearerFormat("jwt")));
//    }


//        @Value("${keycloak.auth-server-url}")
//        String authServerUrl;
//        @Value("${keycloak.realm}")
//        String realm;
//
//        private static final String OAUTH_SCHEME_NAME = "swagger-ui";
//
//        @Bean
//        public OpenAPI openAPI() {
//                return new OpenAPI().components(new Components()
//                                .addSecuritySchemes(OAUTH_SCHEME_NAME, createOAuthScheme()))
//                        .addSecurityItem(new SecurityRequirement().addList(OAUTH_SCHEME_NAME))
//                        .info(new Info().title("Todos Management Service")
//                                .description("A service providing todos.")
//                                .version("1.0"));
//        }
//
//        private SecurityScheme createOAuthScheme() {
//                OAuthFlows flows = createOAuthFlows();
//                return new SecurityScheme().type(SecurityScheme.Type.OAUTH2)
//                        .flows(flows);
//        }
//
//        private OAuthFlows createOAuthFlows() {
//                OAuthFlow flow = createAuthorizationCodeFlow();
//                return new OAuthFlows().implicit(flow);
//        }
//
//        private OAuthFlow createAuthorizationCodeFlow() {
//                return new OAuthFlow()
//                        .authorizationUrl("http://45.141.103.134:8282/realms/dev/protocol/openid-connect/auth")
//                        .scopes(new Scopes().addString("read_access", "read data")
//                                .addString("write_access", "modify data"));
//        }
}
