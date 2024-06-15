package com.xianwei.gatewayserver;

import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.timelimiter.TimeLimiterConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.circuitbreaker.resilience4j.ReactiveResilience4JCircuitBreakerFactory;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JConfigBuilder;
import org.springframework.cloud.client.circuitbreaker.Customizer;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import reactor.core.publisher.Mono;

import java.time.Duration;

@SpringBootApplication
public class GatewayApplication {

	@Value("${keycloak.url}")
	private String keycloakUrl;

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder routeLocatorBuilder) {
		return routeLocatorBuilder.routes()
				.route("users_route", r -> r.path("/api/user/**", "/api/cart/**", "/api/feedback/**", "/api/ratings/**")
						.filters(f -> f.circuitBreaker(c -> c.setName("usersCircuitBreaker").setFallbackUri("forward:/contactSupport")))
						.uri("lb://USER"))
				.route("items_route", r -> r.path("/api/item/**", "/api/categories/**", "/api/admin/**")
						.filters(f -> f.circuitBreaker(c -> c.setName("itemsCircuitBreaker").setFallbackUri("forward:/contactSupport")))
						.uri("lb://ITEM"))
				.route("orders_route", r -> r.path("/api/orders/**")
						.filters(f -> f.circuitBreaker(c -> c.setName("ordersCircuitBreaker").setFallbackUri("forward:/contactSupport"))
								.requestRateLimiter(config -> config.setRateLimiter(redisRateLimiter()).setKeyResolver(userKeyResolver())))
						.uri("lb://ORDER"))
				.route("payment_route", r -> r.path("/api/payment/**")
						.filters(f -> f.circuitBreaker(c -> c.setName("paymentCircuitBreaker").setFallbackUri("forward:/contactSupport")))
						.uri("lb://PAYMENT"))
				.route("keycloak_route", r -> r.path("/realms/**", "/protocol/**")
						.uri(keycloakUrl))
				.build();
	}

	@Bean
	public RedisRateLimiter redisRateLimiter() {
		return new RedisRateLimiter(1, 1, 1);
	}

	@Bean
	public Customizer<ReactiveResilience4JCircuitBreakerFactory> defaultCustomizer() {
		return factory -> factory.configureDefault(id -> new Resilience4JConfigBuilder(id)
				.circuitBreakerConfig(CircuitBreakerConfig.ofDefaults())
				.timeLimiterConfig(TimeLimiterConfig.custom().timeoutDuration(Duration.ofSeconds(10)).build())
				.build());
	}

	@Bean
	KeyResolver userKeyResolver() {
		return exchange -> Mono.justOrEmpty(exchange.getRequest().getHeaders().getFirst("order"))
				.defaultIfEmpty("anonymous");
	}
}
