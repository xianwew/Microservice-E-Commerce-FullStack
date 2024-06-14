package com.example.XianweiECommerce.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisClientConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.JedisSentinelPool;

import java.util.HashSet;
import java.util.Set;

@Configuration
@Slf4j
public class RedisConfig {

    @Value("${spring.data.redis.password}")
    private String redisPassword;

    @Value("${spring.data.redis.sentinel.master}")
    private String master;

    @Value("#{'${spring.data.redis.sentinel.nodes}'.split(',')}")
    private String[] sentinelNodes;

    @Value("${spring.data.redis.jedis.pool.max-active}")
    private int maxTotal;

    @Value("${spring.data.redis.jedis.pool.max-idle}")
    private int maxIdle;

    @Value("${spring.data.redis.jedis.pool.min-idle}")
    private int minIdle;

    @Value("${spring.data.redis.jedis.pool.test-on-borrow}")
    private boolean testOnBorrow;

    @Bean
    public JedisPoolConfig jedisPoolConfig() {
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxTotal(maxTotal);
        poolConfig.setMaxIdle(maxIdle);
        poolConfig.setMinIdle(minIdle);
        poolConfig.setTestOnBorrow(testOnBorrow);
        return poolConfig;
    }

    @Bean
    public JedisSentinelPool jedisSentinelPool(JedisPoolConfig jedisPoolConfig) {
        Set<String> sentinels = new HashSet<>();
        for (String node : sentinelNodes) {
            log.info("Connecting: " + node);
            sentinels.add(node);
        }
        return new JedisSentinelPool(master, sentinels, jedisPoolConfig, redisPassword);
    }

    @Bean
    public RedisConnectionFactory redisConnectionFactory(JedisSentinelPool jedisSentinelPool, JedisPoolConfig jedisPoolConfig) {
        JedisClientConfiguration clientConfig = JedisClientConfiguration.builder()
                .usePooling()
                .poolConfig(jedisPoolConfig)
                .build();

        HostAndPort currentHostMaster = jedisSentinelPool.getCurrentHostMaster();
        RedisStandaloneConfiguration redisConfig = new RedisStandaloneConfiguration(currentHostMaster.getHost(), currentHostMaster.getPort());
        redisConfig.setPassword(redisPassword);

        return new JedisConnectionFactory(redisConfig, clientConfig);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        return redisTemplate;
    }
}