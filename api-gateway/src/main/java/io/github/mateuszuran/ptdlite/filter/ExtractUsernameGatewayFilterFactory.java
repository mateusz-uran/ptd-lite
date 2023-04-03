package io.github.mateuszuran.ptdlite.filter;

import lombok.Data;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class ExtractUsernameGatewayFilterFactory extends AbstractGatewayFilterFactory<ExtractUsernameGatewayFilterFactory.Config> {

    public ExtractUsernameGatewayFilterFactory() {
        super(Config.class);
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
                .map(jwt -> jwt.getClaimAsString("preferred_username"))
                .map(username -> Config.REWRITE_PATH_PREFIX + username);
    }

    @Data
    public static class Config {
        private static final String REWRITE_PATH_PREFIX = "/api/pdf/generate?username=";
    }
}
