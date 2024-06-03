package com.xianwei.gateway;

import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.timelimiter.TimeLimiterConfig;
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
import org.springframework.http.HttpMethod;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.LocalDateTime;

@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder routeLocatorBuilder) {
		return routeLocatorBuilder.routes()
				.route(p -> p
						.path("/api/user/**", "/api/cart/**", "/api/feedback/**", "/api/ratings/**")
						.filters(f -> f.addRequestHeader("Authorization", "#{request.headers.Authorization}"))
						.uri("lb://USER"))
				.route(p -> p
						.path("/api/item/**", "/api/categories/**", "/api/admin/**")
						.filters(f -> f.addRequestHeader("Authorization", "#{request.headers.Authorization}"))
						.uri("lb://ITEM"))
				.route(p -> p
						.path("/api/orders/**")
						.filters(f -> f.addRequestHeader("Authorization", "#{request.headers.Authorization}"))
						.uri("lb://ORDER"))
				.route(p -> p
						.path("/api/payment/**")
						.filters(f -> f.addRequestHeader("Authorization", "#{request.headers.Authorization}"))
						.uri("lb://PAYMENT"))
				.build();
	}

	@Bean
	public Customizer<ReactiveResilience4JCircuitBreakerFactory> defaultCustomizer() {
		return factory -> factory.configureDefault(id -> new Resilience4JConfigBuilder(id)
				.circuitBreakerConfig(CircuitBreakerConfig.ofDefaults())
				.timeLimiterConfig(TimeLimiterConfig.custom().timeoutDuration(Duration.ofSeconds(10)).build())
				.build());
	}
}
