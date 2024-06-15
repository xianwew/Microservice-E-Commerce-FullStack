**Xianwei’s ECommerce Microservice React / Spring Full Stack Application**


# Overview of System Components

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXdB5TmqQ3c0wQd1vnrJYJDT_vuYqNvak1pP3NB7oApXnzw2illNIKVCvnX25RYK9KBvRg7zLgnNCzNc7O5tmiiLY6H79XFdg44WZr6zvKNhSgU1eLjyE_6-TMMvFT7bf79cpJwBuyvKiqNK7VRkq98bNgoR?key=It25FaNN3Hk2ogZbUXQYcg)


# Quick Link

1. [****Components Introduction****](https://docs.google.com/document/d/1EXIbFpxAa--Hd1ItvC96s3_3TGZE2K4Se792132_ewo/edit#bookmark=id.v0l6nddnqzmn)

2. [****Spring Netflix Eureka Cluster****](https://docs.google.com/document/d/1EXIbFpxAa--Hd1ItvC96s3_3TGZE2K4Se792132_ewo/edit#bookmark=id.yoovqx9cgy86)


# Components Introduction

### Core Components

#### React Frontend

- **Summary**: Provides a dynamic and responsive user interface utilizing React, Redux, and Material UI.


#### NGINX

- **Summary**: Acts as a reverse proxy, improving SSL session caching and static file caching to reduce load times and enhance performance.


#### Spring Cloud Gateway

- **Summary**: Serves as the centralized entry point for all client requests, ensuring reliable request routing and load balancing. Integrated with Spring Cloud Config for dynamic configuration management.


#### Spring Cloud Config

- **Summary**: Manages configuration for all microservices, ensuring consistency and ease of updates.


#### Keycloak

- **Summary**: Provides authentication and authorization with OAuth2 and OpenID Connect, ensuring secure access to services.


#### Eureka Servers

- **Summary**: Facilitates dynamic discovery of microservices, improving resilience and scalability.


#### Microservices (Order, User, Item, Payment)

- **Summary**: Each microservice handles a specific domain, enhancing modularity and scalability.


#### Kafka Cluster

- **Summary**: Supports asynchronous communication between services, ensuring reliable and scalable data processing.


#### Redis Sentinel

- **Summary**: Enhances performance through distributed caching and session management, with a master-slave setup for high availability and reliability.


#### Databases (Order, User, Item)

- **Summary**: MySQL databases with master-slave replication for high availability and performance. Utilizes hash partitioning and optimistic locking for scalability and data integrity.


#### Failure Record

- **Summary**: Logs failed transactions to ensure reliability by recording failed operations for later analysis and recovery.


### Monitoring and Logging

#### Promtail, Loki, Grafana

- **Summary**: Collects, stores, and visualizes logs and metrics, providing insights into system performance and aiding in troubleshooting.


#### Prometheus / Tempo

- **Summary**: Monitors system metrics and traces requests, enabling performance optimization and reliability analysis.


# Spring Netflix Eureka Cluster

#### ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfPC4buCgMz6xPlZpN8PP1K3a3Vi6y6PWpMEeKlzFaKGwafo7hu22Snd1ei9MWGKQkOfnq3RSVh6LgHXsVlDh6sO2pVrqbPkqw9Ry6JZ3Zn226phgXQWqeTxPTlIl3thMQ2zVoTnG6l4CXJHhP_tBmDXyU6?key=It25FaNN3Hk2ogZbUXQYcg)

#### Overview

The Eureka cluster in the e-commerce microservice architecture plays a crucial role in service discovery, enabling microservices to dynamically locate and communicate with each other. This setup is fundamental for maintaining high availability, fault tolerance, and scalability, which are essential for the system's overall reliability and performance.


#### Configuration and Features

The Eureka cluster consists of three instances, each configured to register with the others. This mutual registration forms a robust network of interdependent services. Key aspects of the setup include:

- **Service Discovery**: Each Eureka server instance registers itself with the other instances, allowing microservices to query any of the Eureka servers to get the locations of other services.

- **High Availability**: With three instances (`eurekaserver1`, `eurekaserver2`, and `eurekaserver3`), the cluster can tolerate the failure of one or even two instances without losing service discovery capabilities. This redundancy is critical for uninterrupted service availability.

- **Scalability**: The cluster can efficiently handle an increasing number of microservices and instances. As the application scales, service discovery remains reliable and efficient.

- **Health Checks**: Regular health checks are performed at 20-second intervals, with a 5-second timeout and up to 20 retries. These checks ensure that only healthy instances participate in service discovery. Instances that fail these checks are removed from the pool, maintaining the integrity and reliability of the system.

- **Self-Preservation Mode**: Enabled by setting `EUREKA_SERVER_ENABLESELF_PRESERVATION` to "true", this mode prevents the eviction of instances from the registry if the number of renewals falls below a specified threshold. This threshold is set at 85% of the expected renewals, ensuring that transient network issues do not lead to unnecessary evictions and potential service disruptions.

- **Additional Settings**: Other important settings include a renewal interval of 30 seconds, an eviction interval of 5 seconds, and a lease expiration duration of 90 seconds, all contributing to the robustness and responsiveness of the service discovery mechanism.


#### Summary

The Eureka cluster is a vital component of the e-commerce microservice architecture, providing essential service discovery capabilities. The configuration with three interconnected instances ensures high availability, fault tolerance, and scalability. Regular health checks and self-preservation mode enhance the system's reliability by preventing unnecessary evictions during transient network issues. This robust setup supports the dynamic and scalable nature of the microservice architecture, significantly contributing to the overall stability and performance of the application.

