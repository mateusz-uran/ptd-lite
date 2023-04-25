package io.github.mateuszuran.ptdlite.filter;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class ExtractUsernameGatewayFilterFactory extends AbstractGatewayFilterFactory<ExtractUsernameGatewayFilterFactory.Config> {
    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuer;

    private final WebClient webClient;

    public ExtractUsernameGatewayFilterFactory(WebClient.Builder webClientBuilder) {
        super(Config.class);
        this.webClient = webClientBuilder.build();
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> newPath()
                .flatMap(path -> {
                    ServerHttpRequest.Builder requestBuilder = exchange.getRequest().mutate();
                    requestBuilder.path(path);
                    return chain.filter(exchange.mutate().request(requestBuilder.build()).build());
                }));
    }

    private Mono<String> newPath() {
        return ReactiveSecurityContextHolder.getContext()
                .map(SecurityContext::getAuthentication)
                .map(authentication -> (Jwt) authentication.getCredentials())
                .map(Jwt::getTokenValue) // Extract the token value
                .flatMap(token -> webClient.get()
                        .uri(issuer + "userinfo") // Replace with your Auth0 domain
                        .headers(headers -> headers.setBearerAuth(token))
                        .retrieve()
                        .bodyToMono(UserInfoResponse.class))
                .map(userInfo -> Config.REWRITE_PATH_PREFIX + userInfo.getNickname());
    }

    @Data
    public static class Config {
        private static final String REWRITE_PATH_PREFIX = "/api/pdf/generate?username=";
    }

    @Data
    public static class UserInfoResponse {
        private String nickname;
    }
}
