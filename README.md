**Xianwei’s ECommerce Microservice React / Spring Full Stack Application**


# Hello and welcome to my GitHub repository!

This project is a react / spring full-stack e-commerce application built using a microservice architecture. Over the course of 25 days, I have implemented a robust, scalable, and reliable system using cutting-edge technologies. The application includes services for users, items, orders, and payments, all orchestrated to provide a seamless e-commerce experience. Below are some screenshots of the app.

Feel free to explore the code, and don't hesitate to reach out if you have any questions or feedback!

Thank you for visiting, and I hope you find this project as exciting and educational as I did while building it.


# Overview of Deployment and System Components

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXexYnK1GJNbgZSNmtnIQGuY7q7ZGQla4nX6rEJiD1bs-ENYuqtWcwcaLPsFiySaAkItRZsZUfz2KmZYeudBFqdggM6oZx8FU3RQT1ZEQMKh9AUoqxZcjVuGb07MajVVkJUkEMxtZYzdrgX63AoMUcvoiM8?key=It25FaNN3Hk2ogZbUXQYcg)


# Quick Links

1. [****Components Summary****](#Components-Summary)

2. [****Spring Netflix Eureka Cluster****](#Spring-Netflix-Eureka-Cluster)

3. [****Kafka Cluster for Asynchronous Processing****](#Kafka-Cluster-for-Asynchronous-Processing)

4. [****SAGA Pattern, Fallback, and WebSocket Notification****](#SAGA-Pattern-Fallback-and-WebSocket-Notification)

5. [****MySQL Master-Slave Setup and Optimistic Locking****](#MySQL-Master-Slave-Setup-and-Optimistic-Locking)

6. [****Redis Sentinel Setup and AOP Performance Measurement****](#Redis-Sentinel-Setup-and-AOP-Performance-Measurement)

7. [****Keycloak OAuth2 Server Authentication and Authorization with Spring Security****](#Keycloak-OAuth2-Server-Authentication-and-Authorization-with-Spring-Security)

8. [****Resilience4J Circuit Breaker, Redis Rate Limiter, and Fallback API****](#Resilience4J-Circuit-Breaker-Redis-Rate-Limiter-and-Fallback-API)

9. [****Monitoring and Observability with Promtail, Loki, Prometheus, and Grafana****](#Monitoring-and-Observability-with-Promtail-Loki-Prometheus-and-Grafana)

10. [****Deployment Summary of Microservices Application to AWS with EKS****](#Deployment-Summary-of-Microservices-Application-to-AWS-with-EKS)


# Sample App Screenshots

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXd4x-JaXfzy5b_xTRfiJ4azMJGatSdko3e-reJ2M9HS3AyR_QfU9DwD4MzqFSWYJKx2ElWMncvlB4NQBOc5hVtD4zH5293WTFyAbsgLyqgT1F4kI13n1sEDk3IpmsRHuJI8TD86HaR-l34WXUOBq0NBDDRX?key=It25FaNN3Hk2ogZbUXQYcg)

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXezaoQ6VDIZm6QzzYT9UUekld9RKVarFnZrOwDX7hrhlUur_2VbULaoum9lynChC9oYUSXYj6KBE4alv_tabzWYzWo9IQz8SAX5CJXierO2qFC2upYj2-2H8dzAmUvkFB4RTiOFllJLjaDM30VxUMkbccpR?key=It25FaNN3Hk2ogZbUXQYcg)

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfuwLJYoPGXuBVFqk-TrfxBJ1kQrbQV_T56pL2qDqWeVYNtor0AbVFNsibEJQLkda4tm7lmfFwaOuJqKENVIRAhGCKw8H5_pyzyl9-XLYfnyvXX99IVwj9fFynj48CEgL51qPKu2fZJ0JcJXxKTfW_pQf9a?key=It25FaNN3Hk2ogZbUXQYcg)

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXf6fUdoH7Ew7YMjmncKXgsnUe9gmLw5aROYnQ4sVZO8uuZ-Sp40lswFYDBk2WITWDuv3SaHtcbEyUY4m7zcUau9HmAmtKgpMKvPUcxkH1heBkzGUk9-tr5bIMB9CnjB4ym5yi4RuMh4JtswTcNCmDrPa7U?key=It25FaNN3Hk2ogZbUXQYcg)


# Components Summary

### Core Components

#### React Frontend

- Provides a dynamic and responsive user interface utilizing React, Redux, and Material UI.


#### NGINX

- Acts as a reverse proxy, improving SSL session caching and static file caching to reduce load times and enhance performance.


#### Spring Cloud Gateway

- Serves as the centralized entry point for all client requests, ensuring reliable request routing and load balancing. Integrated with Spring Cloud Config for dynamic configuration management.


#### Spring Cloud Config

- Fetches configurations from Github, and manages them for all microservices, ensuring consistency and ease of updates.


#### Keycloak

- Provides authentication and authorization with OAuth2 and OpenID Connect, ensuring secure access to services.


#### Eureka Servers

- Facilitates dynamic discovery of microservices, improving resilience and scalability.


#### Microservices (Order, User, Item, Payment)

- Each microservice handles a specific domain, enhancing modularity and scalability.


#### Kafka Cluster

- Supports asynchronous communication between services, ensuring reliable and scalable data processing.


#### Redis Sentinel

- Enhances performance through distributed caching and session management, with a master-slave setup for high availability and reliability.


#### Databases (Order, User, Item)

- MySQL databases with master-slave replication for high availability and performance.


#### Failure Record

- Logs failed transactions to ensure reliability by recording failed operations for later analysis and recovery.


### Monitoring and Logging

#### Promtail, Loki, Grafana

- Collects, stores, and visualizes logs and metrics, providing insights into system performance and aiding in troubleshooting.


#### Prometheus / Tempo

- Monitors system metrics and traces requests, enabling performance optimization and reliability analysis.


# Spring Netflix Eureka Cluster

#### ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXcW9rjiDJbZ93hWPTTykcT5d8_b7OTfIlgR3eDS1qsGsbkQjxs-RAjniWZYLLobsKvXXKxhlQ53H1peTLm3QOScVP8I79eItq0fhbFnXaBExSR4nnnBwFHbKWr4dPICWEKMbBS8vzm_9LvR77q8OxSSKXXW?key=It25FaNN3Hk2ogZbUXQYcg)

#### Overview

The Eureka cluster in the e-commerce microservice architecture plays a crucial role in service discovery, enabling microservices to dynamically locate and communicate with each other. This setup is fundamental for maintaining high availability, fault tolerance, and scalability, which are essential for the system's overall reliability and performance.


#### Configuration and Features

The Eureka cluster consists of three instances, each configured to register with the others. This mutual registration forms a robust network of interdependent services. Key aspects of the setup include:

- **Service Discovery**:

  - Each Eureka server instance registers itself with the other instances, allowing microservices to query any of the Eureka servers to get the locations of other services.

- **High Availability**:

  - With three instances (`eurekaserver1`, `eurekaserver2`, and `eurekaserver3`), the cluster can tolerate the failure of one or even two instances without losing service discovery capabilities. This redundancy is critical for uninterrupted service availability.

- **Scalability**:

  - The cluster can efficiently handle an increasing number of microservices and instances. As the application scales, service discovery remains reliable and efficient.

- **Health Checks**:

  - Regular health checks are performed at 20-second intervals, with a 5-second timeout and up to 20 retries. These checks ensure that only healthy instances participate in service discovery. Instances that fail these checks are removed from the pool, maintaining the integrity and reliability of the system.

- **Self-Preservation Mode**:

  - Enabled by setting `EUREKA_SERVER_ENABLESELF_PRESERVATION` to "true", this mode prevents the eviction of instances from the registry if the number of renewals falls below a specified threshold. This threshold is set at 85% of the expected renewals, ensuring that transient network issues do not lead to unnecessary evictions and potential service disruptions.

- **Additional Settings**:

  - Other important settings include a renewal interval of 30 seconds, an eviction interval of 5 seconds, and a lease expiration duration of 90 seconds, all contributing to the robustness and responsiveness of the service discovery mechanism.

- **Client-Side Load Balancing**:

  - The current architecture employs client-side load balancing, where each microservice instance queries the Eureka server to discover other services and then selects an appropriate instance to communicate with.


#### Summary

The Eureka cluster is a vital component of the e-commerce microservice architecture, providing essential service discovery capabilities. The configuration with three interconnected instances ensures high availability, fault tolerance, and scalability. Regular health checks and self-preservation mode enhance the system's reliability by preventing unnecessary evictions during transient network issues. Client-side load balancing is employed due to the current single-instance setup per microservice, simplifying interactions and ensuring efficient communication. This robust setup supports the dynamic and scalable nature of the microservice architecture, significantly contributing to the overall stability and performance of the application.


# Kafka Cluster for Asynchronous Processing

#### ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfMuAA5qdIWurGBSmN3ltomKCP5i-KM2DpTYgYfCVFl1J0Mc7IflZUI0u_p4ghn6ekUfnQY0r24hFiERhEay-pCohvijSwxW-5v5EjS8yUCf4IjEWSDVAZfOwvt9ZtKYkdoKzfjtB2F_IKu63AEzDAwQHw?key=It25FaNN3Hk2ogZbUXQYcg)

#### Overview

The Kafka cluster in the e-commerce microservice architecture is designed to facilitate asynchronous communication between services. It is a key component that ensures high availability, performance, and reliability, supporting the overall event-driven architecture of the system.


#### Configuration and Features

##### High Availability

- **Cluster Composition**:

  - The Kafka cluster consists of three brokers (`kafka1`, `kafka2`, `kafka3`), coordinated by a Zookeeper instance (`zoo1`).

  - This setup ensures redundancy, allowing the system to tolerate the failure of one or more brokers while maintaining message processing capabilities.

- **Health Checks**:

  - Health checks are performed every 20 seconds with a timeout of 5 seconds and up to 20 retries.

  - These checks ensure that brokers are healthy and available, enhancing the resilience of the cluster.


##### Performance

- **Asynchronous Message Pushing**:

  - The producer pushes messages to the Kafka brokers asynchronously, ensuring high throughput and the ability to handle thousands of messages per second.

- **Concurrent Reading**:

  - The consumer is configured to read messages concurrently, allowing efficient message processing.

  - The concurrency setting of three helps manage parallel consumption, improving the overall processing speed.

- **Message Replication**:

  - Kafka brokers are configured with a `KAFKA_REPLICATETHROUGHPUTPERMINUTE` of 600 messages per minute.

  - This setting ensures timely replication of messages across brokers, maintaining data consistency and durability.


##### Reliability

- **Message Delivery**:

  - The producer sends messages only if at least one broker is available, ensuring message reliability.

- **Failed Message Categorization**:

  - Failed Messages are categorized based on their recoverability. Recoverable messages are retried, and if the maximum retries (set to five) are exceeded, they are stored in a MySQL database for manual inspection. If the message is unrecoverable, it will be directly stored in the database for further inspection.

- **Health Checks and Lease Expiration**:

  - Regular health checks ensure that Kafka brokers are available and ready to process messages.

  - Settings like `KAFKA_LEASEEXPIRATIONDURATIONINSECONDS` set to 90 seconds ensure timely lease expiration, preventing stale connections.

- **Idempotent Producer**:

  - Configurations such as `ENABLE_IDEMPOTENCE_CONFIG` ensure that messages are not duplicated during retries, maintaining data integrity.


#### Implementation Details

- **ZooKeeper Coordination**:

  - ZooKeeper (`zoo1`) coordinates the Kafka brokers, maintaining metadata about the cluster and facilitating leader election for partitions.

  - This coordination is crucial for maintaining the overall health and stability of the Kafka cluster.

- **Broker Configuration**:

  - Each Kafka broker is configured with unique settings to ensure proper identification and communication within the cluster.

  - Brokers are set up with `KAFKA_ADVERTISED_LISTENERS` and `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` to manage how they advertise their addresses and handle security protocols.

- **Producer Configuration**:

  - The producer is configured to ensure high reliability and performance, with settings such as:

    - **Asynchronous Messaging**: Ensures high throughput.

    - **Retries**: Configured to retry sending messages up to five times before categorizing them as failed.

    - **Idempotence**: Ensures that duplicate messages are not created during retries.

- **Consumer Configuration**:

  - Consumers are set up to read messages concurrently, improving the speed and efficiency of message processing.

  - Concurrency settings allow multiple instances of the consumer to process messages in parallel.

- **Health Checks and Monitoring**:

  - Health checks are an integral part of the setup, ensuring that each broker is available and functioning correctly.

  - These checks help in early detection of issues, allowing for timely intervention and maintaining the overall health of the system.


#### Summary

The Kafka cluster is a vital component of the e-commerce microservice architecture, providing essential capabilities for high availability, performance, and reliability. Its configuration with three brokers and robust message handling mechanisms ensures that the system can efficiently process a large volume of messages while maintaining data integrity and service continuity. Key aspects include:

- **High Availability**: Achieved through a multi-broker setup and regular health checks, ensuring the system can tolerate failures.

- **Performance**: Enhanced by asynchronous message pushing and concurrent reading, capable of handling thousands of messages per second.

- **Reliability**: Ensured through idempotent producer configurations, categorized message handling, and regular health checks.

This setup significantly enhances the overall stability and efficiency of the application, supporting the dynamic and scalable nature of the microservice architecture.


# SAGA Pattern, Fallback, and WebSocket Notification

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXeCIYBnOIpzNo88R3K8qBK0K22T-2SFSG_kBXQxuILGGmBvKmZUnLZGcYPAzDw7JkLDz7gUseBuQu2gcO-saZlahcZSM22BjAWVciOxdxMCXL9uGPTj1EaP27l238x0Tw2KUBAj49PHDjWGi4oYDA0AUek?key=It25FaNN3Hk2ogZbUXQYcg)


#### Overview

The SAGA pattern is implemented to manage distributed transactions and ensure data consistency across microservices in the e-commerce architecture. It orchestrates a series of operations that can be rolled back in case of failures, maintaining the system's consistent state.


#### Workflow and Features

- **Order Creation**:

  - The system checks inventory availability when a user creates an order.

  - If sufficient inventory is available, items are reserved and the order status is set to “PENDING''. 

  - The order request is forwarded to the payment service via Kafka.

  - The reservation of items is managed to ensure that the inventory is not oversold.

- **Payment Processing**:

  - The payment service processes the payment and sends the result back through Kafka.

  - If the message fails to be sent from the order service or the payment fails, the system reverts the item quantity back to its original state.

  - The order service consumes the payment result, updates the order status, and notifies the frontend using WebSocket.

  - Payment processing includes retries with exponential backoff, starting from 1 second up to a maximum of 32 seconds, to handle transient failures.

- **Error Handling**:

  - If message sending fails or the payment is unsuccessful, the order status is set to "FAILED". 

  - If the payment is successful, the order status is set to “COMPLETED”.

  - The order service manages failed messages by retrying up to five times or categorizing them for manual inspection if retries exceed the limit.

  - Failed payment requests and messages are logged and stored in a MySQL database for further analysis and resolution.

- **WebSocket Notifications**:

  - The order service uses WebSocket to notify the frontend of order status changes in real-time, ensuring a seamless user experience.

  - This ensures that users are promptly informed of their order status, whether it is completed or failed.


#### Summary

The SAGA pattern ensures data consistency and reliable transaction management across distributed microservices. By orchestrating operations and providing mechanisms for rollback in case of failures, it maintains the system's integrity. The combination of order creation, payment processing, and robust error handling within the SAGA framework significantly enhances the reliability and consistency of the e-commerce application, ensuring a seamless and trustworthy user experience. This approach enables the system to handle complex transactions while maintaining data integrity and providing a responsive user interface.


# MySQL Master-Slave Setup and Optimistic Locking

#### ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXcNWs4Kp3U-hyhb42FfS1ttCtX5CCpz1GULC41n63uvmGAZ32gTcuPX0NJbR2u8FHjdOKitvbv20EOCkbDtEDRrycQ6w4Qe0iOwu1tOC8NSDSXFcbL2FHfxww3tTV1kcyU-BD_tGSPQFEra6jpXQ8uZ_oje?key=It25FaNN3Hk2ogZbUXQYcg)

#### Overview

The e-commerce microservice architecture employs a MySQL master-slave setup for the item, user, and order microservices. This setup is designed to enhance data reliability, availability, and read performance. Additionally, optimistic locking is utilized in the user profile update function to ensure data integrity during concurrent updates.


#### Master-Slave Setup

- **Concept**:

  - The master-slave setup involves one master database handling write operations and one or more slave databases handling read operations. This setup improves performance by offloading read operations to the slave, reducing the load on the master database.

- **Implementation**:

  - **User Service**:

    1. The user service utilizes a master database (`userservice-master`) and a slave database (`userservice-slave`).

    2. The master database manages all write operations, such as creating, updating, and deleting user records.

    3. The slave database is read-only and is used for read operations, such as fetching user details.

  - **Order Service**:

    1. The order service employs a similar setup with `orderservice-master` as the master database and a corresponding slave for read operations.

  - **Item Service**:

    1. The item service also follows this configuration, ensuring efficient management of inventory data.

- **Replication**:

  - Replication between the master and slave databases is asynchronous. The master database logs all changes in the binary log (`log_bin`), which the slave database then reads and applies to itself.

  - **Binlog Format**:

    1. The Binlog format can be set to `STATEMENT`, `ROW`, or `MIXED`.

       - **Statement-based Logging** records the SQL statements executed.

       - **Row-based Logging** records the actual changes made to individual rows.

       - **Mixed Logging** uses a combination of both, depending on the type of SQL statement executed.

    2. For this setup, **row-based logging** (`ROW`) is chosen to ensure a more accurate and detailed replication, especially useful for complex transactions.

  - **Data Replication Procedure**:

    1. The slave server executes `START SLAVE` to enable replication. The slave server's I/O thread requests to read the Binlog from the master server. If the I/O thread catches up with the master, it enters a sleep state.

    2. The master server writes update SQL operations (such as `UPDATE`, `INSERT`, `DELETE`) to the Binlog. The master server's Binlog dump thread sends the Binlog contents to the slave server.

    3. After starting, the slave server creates an I/O thread to read the Binlog content sent by the master and writes it to the relay log, recording the position to continue reading next time.

    4. The slave server's SQL thread continuously checks the relay log for new log entries, converts them into SQL statements, and executes them.

  - This asynchronous replication ensures that read operations on the slave database do not impact the performance of write operations on the master database.

- **Health Checks**:

  - Health checks are configured to ensure the databases are running correctly. These checks run every 10 seconds with a timeout of 30 seconds, allowing up to 10 retries.


#### Service Layer Database Selection

- **Dynamic Data Source Routing**:

  - The service layer uses a dynamic data source routing mechanism to select the appropriate database (master or slave) for each operation.

  - A `ReplicationRoutingDataSource` class is implemented to determine the current lookup key based on the context. It uses a thread-local variable to store and retrieve the data source type (`MASTER` or `SLAVE`).

  - When performing write operations, the context is set to use the master database. For read operations, the context is set to use the slave database.

  - This routing ensures that read-heavy operations do not interfere with write operations, optimizing the overall database performance.


#### Optimistic Locking in User Profile Updating

- **Concept**:

  - Optimistic locking is a concurrency control mechanism used to prevent data inconsistencies during concurrent updates. It uses a version field to track changes to an entity.

- **Implementation**:

  - The `User` and `Address` entities are annotated with `@Version`, which adds a version field that is automatically incremented with each update.

  - During the update process, the version field is checked. If the version in the database does not match the version in the update request, an `OptimisticLockException` is thrown, indicating a concurrent modification.

  - This mechanism ensures that only one update can succeed at a time, preventing overwriting changes made by other transactions.

- **Reason for Selecting Optimistic Locking**:

  - Optimistic locking is selected over pessimistic locking to reduce the potential for database contention and deadlocks.

  - Pessimistic locking involves locking the record for the entire duration of the transaction, which can lead to significant performance bottlenecks and scalability issues in high-concurrency environments.

  - Optimistic locking allows multiple transactions to proceed without locking the records, only checking for conflicts at the time of the update. This approach is more efficient and scalable, especially for web applications with a high number of concurrent users.


#### Summary

The MySQL master-slave setup and optimistic locking mechanism are crucial components of the e-commerce microservice architecture, providing enhanced reliability, availability, and data integrity.

- **Master-Slave Setup**:

  - Improves read performance by offloading read operations to the slave databases.

  - Ensures high availability and reliability by providing redundancy and load balancing.

  - Utilizes asynchronous replication to maintain data consistency between master and slave databases.

  - Implements row-based binary logging for accurate and detailed replication.

  - Configured with health checks and proper logging to maintain system integrity.

- **Optimistic Locking**:

  - Ensures data integrity during concurrent updates by preventing overwriting of data.

  - Uses a version control mechanism on entities to manage concurrency.

  - Selected over pessimistic locking to reduce potential database contention and deadlocks, improving performance and scalability.

These strategies collectively enhance the stability, performance, and reliability of the e-commerce application, ensuring a smooth and trustworthy user experience.


# Redis Sentinel Setup and AOP Performance Measurement

#### ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXf7b6JraTONpKinZWRCCBpFLbz-z5bYtYYNhxoZKPYh3dZbQD8mRPHGieWPPtDk52aQ4gQ4WBrWRFspoocoRp-2j_fFCReMzVW3NaRaLEnGO9GAUxAhez4QXIgCLb8cXz02sUDED9vbjt_bvlxvWnR7Ww9_?key=It25FaNN3Hk2ogZbUXQYcg)

#### Overview

The Redis Sentinel setup in the e-commerce microservice architecture ensures high availability, performance, and reliability for the caching layer. Redis is used for caching frequently accessed data to reduce load on the database and improve response times. Redis Sentinel provides automatic failover, monitoring, and notification capabilities to ensure the Redis service remains available even in the event of failures.


#### Configuration and Features

- **Redis Sentinel Setup**:

  - **Components**:

    - **Redis Master**: The main Redis server handling all write operations.

    - **Redis Slaves**: Two slave instances (`redis-slave1` and `redis-slave2`) that replicate data from the master and handle read operations.

    - **Redis Sentinels**: Three sentinel instances (`redis-sentinel1`, `redis-sentinel2`, and `redis-sentinel3`) that monitor the Redis master and slave servers.

  - **Redis Master Configuration**:

    - Runs the Redis server with append-only mode enabled for durability.

    - Protected with a password (`--requirepass *********`.).

  - **Redis Slave Configuration**:

    - Configured to replicate from the Redis master (`--slaveof redis-master 6379`).

    - Authenticated with the master using `--masterauth *********`.

    - Also protected with a password (`--requirepass *********`.).

  - **Redis Sentinel Configuration**:

    - Each sentinel instance runs with its own configuration file, specifying the master to monitor.

    - Sentinels monitor the master server and perform automatic failover by promoting a slave to master if the current master fails.


#### Performance and Reliability

- **High Availability**:

  - **Automatic Failover**: Redis Sentinel provides automatic failover, ensuring that if the master fails, one of the slaves is promoted to master, maintaining service availability without manual intervention.

  - **Monitoring and Notification**: Sentinels continuously monitor the master and slave servers, notifying administrators of any issues and performing failover when necessary.

- **Performance**:

  - **Read and Write Operations**: The master handles all write operations, while the slaves handle read operations, balancing the load and improving performance.

  - **Caching**: Frequently accessed data is stored in Redis, reducing the load on the primary databases and speeding up response times for read operations.

  - **Performance Measurement**:

    - Using Aspect-Oriented Programming (AOP) for performance logging, the execution time of critical functions has been measured.

    - The function execution time for searching items has been reduced from `12ms` ****to `2ms`, demonstrating significant performance improvement.


#### Implementation Details

- **Data Caching**:

  - The primary use case for Redis caching in this setup is for caching search query results. This ensures that repeated searches with the same parameters return results quickly without repeatedly querying the database.

  - The `searchItems` method in the service layer is annotated with `@Cacheable`, caching the results of item searches.

  - The cache is managed by Redis, ensuring fast access to frequently queried data.

- **Dynamic Data Source Routing**:

  - The system uses dynamic data source routing to select the appropriate Redis instance for read or write operations.

  - Read operations are routed to the slave instances, while write operations are routed to the master instance.

- **Performance Logging with AOP**:

  - AOP is used to log the execution time of critical functions, providing insights into performance bottlenecks.

  - The `PerformanceLoggingAspect` measures the execution time of the `searchItems` method, helping to optimize performance.


#### Reasons for Using Redis Sentinel over Standard Master-Slave Setup

- **Read-Heavy Operations**:

  - Caching item search queries can be a read-heavy operation. Redis Sentinel allows for load balancing across multiple slave instances, ensuring that read operations do not overwhelm a single instance.

- **Automatic Failover**:

  - Redis Sentinel provides automatic failover capabilities, promoting a slave to master if the current master fails. This feature ensures high availability and reduces downtime.

- **Enhanced Monitoring**:

  - Sentinels continuously monitor the health of Redis instances, providing immediate notifications and automatic recovery actions in case of failures.

- **Scalability**:

  - With Redis Sentinel, the architecture can easily scale to accommodate additional read replicas, further distributing the load and improving performance.


#### Summary

The Redis Sentinel setup provides a robust and high-performing caching solution for the e-commerce application. Key benefits include:

- **High Availability**: Automatic failover and continuous monitoring ensure that the Redis service remains available even during failures.

- **Improved Performance**: Caching frequently accessed data, especially search query results, reduces database load and speeds up response times, with critical function execution time reduced from 12ms to 2ms.

- **Reliability**: The use of Redis Sentinels for monitoring and failover enhances the reliability of the caching layer.

- **Efficient Read and Write Operations**: Load balancing between master and slave instances ensures efficient handling of read and write operations.

These features collectively enhance the stability, performance, and reliability of the e-commerce application, providing a seamless and efficient user experience.


# Keycloak OAuth2 server authentication and authorization with Spring Security

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXdL5vQJdASFt8GCK-Eb30fgtVmKu3w--dBKrli9zYB7P5XclFgu4OQzNywqmR0cB7CphS-67j1tIpAuKRKPgMiD4wDqvJXgZjilQy9UNWUsmUVxoolK_5sO45jHnOV492y_35EYsDB0GGgpR_OZX4CdkeQ?key=It25FaNN3Hk2ogZbUXQYcg)


#### Overview

Keycloak is used as the OAuth2 server in the e-commerce microservice architecture to handle authentication and authorization. Integrating Keycloak with Spring Security provides a robust security framework that ensures secure access to various services and APIs based on user roles and permissions.


#### Configuration and Features

- **Keycloak Setup**:

  - **Container Configuration**:

    - Keycloak runs in a Docker container, configured with an admin user and password.

    - The realm configuration `XianweiECommerce` is imported during startup to define security policies and user roles, restoring the realm and client settings.

  - **Health Check**:

    - A health check is configured to ensure Keycloak is ready to accept requests, running every 20 seconds with a timeout of 5 seconds, allowing up to 20 retries.

- **Spring Security Integration**:

  - **Security Configurations**:

    - Spring Security is configured to work with Keycloak, enabling OAuth2 resource server capabilities.

    - The configuration uses `SecurityWebFilterChain` to define security rules for public and authenticated endpoints.

    - Public endpoints are accessible without authentication, while other endpoints require specific roles or authentication.

  - **Role-Based Access Control (RBAC)**:

    - A custom role converter (`KeycloakRoleConverter`) is used to map Keycloak roles to Spring Security `GrantedAuthority` objects.

    - This converter extracts roles from the JWT token provided by Keycloak and assigns them to the authenticated user.


#### Implementation Details

- **Authentication and Authorization**:

  - **JWT Authentication**:

    - The application uses JWT tokens issued by Keycloak for authentication. The tokens include user roles and permissions, which are used to enforce access control.

    - The `JwtAuthenticationConverter` is configured to use the custom role converter, ensuring that roles from the token are correctly interpreted by Spring Security.

  - **Security Filters**:

    - Two security filter chains are defined:

      - **Public Endpoints**: Accessible without authentication (e.g., public user profiles, feedback).

      - **Authenticated Endpoints**: Require authentication and specific roles (e.g., admin-specific APIs, user profile updates).

- **Role Management**:

  - **Admin Role**:

    - Specific endpoints (e.g., CRUD operations on categories) are restricted to users with the "ADMIN" role.

    - The `AdminController` and associated services enforce these restrictions, ensuring that only authorized users can perform sensitive operations.

  - **User Role**:

    - Other endpoints require the user to be authenticated but do not necessarily require admin privileges (e.g., updating user profiles, managing carts).


#### Authentication Procedure

1. **Token Retrieval**:

   - The frontend application sends user credentials (username and password) to Keycloak.

   - Keycloak validates the credentials and, upon successful authentication, issues a JWT token to the frontend.

2. **Sending Requests with Token**:

   - The frontend includes the JWT token in the Authorization header of requests to the resource server, which in this case is the Spring Cloud Gateway.

3. **Token Validation and Access Grant**:

   - The Spring Cloud Gateway is registered with Keycloak and has access to Keycloak's public key.

   - The gateway validates the JWT token using this public key. If the token is valid, the gateway grants access to the requested resource by forwarding the request to the appropriate microservice.


#### Security and Reliability

- **Security**:

  - **OAuth2 and JWT**:

    - Using OAuth2 and JWT ensures secure and stateless authentication, with tokens containing all necessary user information and permissions.

    - Tokens are validated by Spring Security before granting access to protected resources.

  - **Role-Based Access Control**:

    - RBAC ensures that only users with the appropriate roles can access certain endpoints, enhancing security and preventing unauthorized access.

  - **SSL Encryption**:

    - All communication between clients and the Keycloak server, as well as between microservices, is encrypted using SSL, protecting data in transit.

- **Reliability**:

  - **Health Checks**:

    - Regular health checks on the Keycloak container ensure it is always ready to handle authentication requests, improving reliability.

  - **Scalability**:

    - The architecture can scale horizontally by adding more instances of Keycloak and configuring them in a high-availability setup.

  - **Token Management**:

    - JWT tokens reduce the need for constant communication with the authentication server, improving performance and reliability.


#### Summary

The integration of Keycloak OAuth2 server with Spring Security provides a robust and scalable authentication and authorization framework for the e-commerce application. Key benefits include:

- **Enhanced Security**: Secure authentication and authorization using OAuth2 and JWT, with role-based access control ensuring appropriate access to resources.

- **High Reliability**: Regular health checks, SSL encryption, and the ability to scale horizontally contribute to the reliability and robustness of the security architecture.

- **Efficient Role Management**: Custom role converters and security filters ensure that user roles are correctly interpreted and enforced by Spring Security.

- **Streamlined Authentication Process**: The authentication procedure ensures secure token-based access, with tokens validated at the gateway server using Keycloak's public key before granting access to microservices.

These features collectively enhance the security, reliability, and performance of the e-commerce application, ensuring a secure and seamless user experience.


# Resilience4J Circuit Breaker, Redis Rate Limiter, and Fallback API

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXeIY-vmFQpFcffV6b8Z8BsAaeu7XzDtvDve9s_OtkBajFP8ytVl7Dlb6lHsIC7WXwV6GPEbAFqeaoVg_RdMHdhoJ3vrHkCp9IfvXWB3ibO6QRodHa733RQnxjWJICe1FyT98cD9GQXCYjQmqOgrmE6SYf8?key=It25FaNN3Hk2ogZbUXQYcg)


#### Overview

Resilience4J and Redis Rate Limiter are integrated into the e-commerce microservice architecture to enhance reliability, fault tolerance, and resilience. These tools provide robust mechanisms for handling failures, retrying operations, and controlling the rate of requests to ensure the stability and performance of the application.


#### Resilience4J Configuration and Features

Resilience4J is used across all microservices (item, user, order, and payment) as well as the gateway server to manage fault tolerance and resilience. Key features include circuit breakers, retry mechanisms, and rate limiters.

- **Circuit Breakers**:

  - **Configuration**:

    - **Sliding Window Size**: 10

    - **Permitted Number of Calls in Half-Open State**: 2

    - **Failure Rate Threshold**: 50%

    - **Wait Duration in Open State**: 10,000 milliseconds (10 seconds)

  - **Functionality**:

    - **Circuit Breaker** monitors the number of failures and successes within a specified window. If the failure rate exceeds the threshold, the circuit breaker trips to the open state, preventing further calls to the service and allowing it to recover.

    - **Half-Open State**: After the wait duration, a limited number of calls are allowed to test if the service has recovered.

- **Retry Mechanisms**:

  - **Configuration**:

    - **Max Attempts**: 3

    - **Wait Duration Between Attempts**: 500 milliseconds

    - **Exponential Backoff**: Enabled with a multiplier of 2

    - **Ignored Exceptions**: `java.lang.NullPointerException`

    - **Retry Exceptions**: `java.util.concurrent.TimeoutException`

  - **Functionality**:

    - The retry mechanism attempts to retry a failed operation up to a specified number of times with a delay between each attempt. Exponential backoff is used to increase the wait duration after each failed attempt, reducing the load on the service and giving it time to recover.

- **Rate Limiters**:

  - **Configuration**:

    - **Timeout Duration**: 1,000 milliseconds (1 second)

    - **Limit Refresh Period**: 5,000 milliseconds (5 seconds)

    - **Limit for Period**: 1 request

  - **Functionality**:

    - Rate limiters control the number of requests allowed to a service within a specified period. This prevents overloading the service and ensures fair usage.


#### Redis Rate Limiter in Gateway Server

The gateway server uses Redis Rate Limiter to manage the rate of requests, enhancing reliability and preventing abuse.

- **Configuration**:

  - **Burst Capacity**: 1

  - **Replenish Rate**: 1 request per second

- **Functionality**:

  - The Redis Rate Limiter integrates with the gateway server to limit the rate of incoming requests. It uses Redis to store and manage rate limiting data, ensuring distributed rate limiting across multiple instances of the gateway server.

  - Requests to the order service are rate limited to prevent excessive load, ensuring that the service remains responsive and reliable.


#### Implementation Details

- **Circuit Breakers in Gateway Server**:

  - Each route in the gateway server is configured with a circuit breaker. If a service becomes unavailable, the circuit breaker trips to prevent further requests from reaching the failing service. A fallback URI (`/contactSupport`) is provided to handle requests when the circuit breaker is open.

- **Rate Limiting in Gateway Server**:

  - The order service route is configured with a Redis Rate Limiter to control the rate of requests. The rate limiter ensures that requests are spread out over time, preventing spikes in traffic that could overwhelm the service.

- **Resilience4J Configuration in Microservices**:

  - Each microservice is configured with Resilience4J settings for circuit breakers, retry mechanisms, and rate limiters. These settings are applied to critical operations to ensure that services can gracefully handle failures and recover from them.


#### Reliability and Resilience

- **Enhanced Reliability**:

  - **Circuit Breakers**: Prevent cascading failures by stopping requests to failing services, allowing them to recover and reducing the load on the system.

  - **Retries**: Ensure transient errors are handled by retrying operations, improving the chances of success without overwhelming the service.

  - **Rate Limiters**: Control the flow of requests to prevent overload, ensuring services remain responsive and reliable.

- **Improved Performance**:

  - **Reduced Downtime**: Circuit breakers and retries help reduce downtime by managing failures and ensuring services can recover without manual intervention.

  - **Fair Usage**: Rate limiters ensure fair usage of resources, preventing any single user or service from overwhelming the system.


#### Summary

The integration of Resilience4J and Redis Rate Limiter into the e-commerce microservice architecture provides a robust framework for managing reliability and resilience. Key benefits include:

- **Fault Tolerance**: Circuit breakers and retries ensure that services can handle failures gracefully, improving overall system reliability.

- **Controlled Load**: Rate limiters prevent services from being overwhelmed by controlling the rate of incoming requests.

- **Enhanced Stability**: These mechanisms collectively contribute to the stability and performance of the application, ensuring a seamless and reliable user experience.

These features are essential for maintaining the reliability and performance of the e-commerce application, providing a resilient infrastructure capable of handling failures and ensuring continuous availability.


# Monitoring and Observability with Promtail, Loki, Prometheus, and Grafana

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXev8pO0Yb3ILrtpPXt1dPoAs0F94CYsN1sQgIQjZxRn1YCk9qdRXA-OP7T2vM5n27SuhY7OWlBa55VQCRRFqFIr2CY7Dc0Nq3_gr3repNtHPY1WHAEiVCPLIgPtN5CuSARy16ndRMPJq_LW2Uq0kS69VZEO?key=It25FaNN3Hk2ogZbUXQYcg)


#### Overview

The e-commerce microservice architecture integrates Promtail, Loki, Prometheus, Grafana, and MinIO for comprehensive monitoring and observability. Additionally, NGINX is used as a gateway to facilitate and manage the flow of metrics and logs between these components. These tools collectively provide a robust solution for metrics collection, log aggregation, and tracing, enabling real-time insights into system performance and health.


#### Key Components and Features

- **Prometheus**:

  - **Role**: Metrics collection and monitoring.

  - **Functionality**:

    - Collects metrics such as CPU usage, memory usage, request rates, error rates, and response times.

    - Provides a powerful query language (PromQL) for analyzing collected metrics.

    - Generates alerts based on defined thresholds and rules, ensuring prompt notification of any issues.

- **Loki**:

  - **Role**: Log aggregation and management.

  - **Functionality**:

    - Aggregates logs from all microservices, enabling centralized log management.

    - Supports efficient querying and filtering of log data.

    - Integrates with Grafana for visualizing logs alongside metrics and traces.

- **Grafana**:

  - **Role**: Data visualization and dashboarding.

  - **Functionality**:

    - Provides customizable and interactive dashboards for real-time monitoring.

    - Enables correlation of metrics, logs, and traces, facilitating comprehensive root cause analysis.

    - Supports alerting based on metrics thresholds and log patterns.

- **Promtail**:

  - **Role**: Log collection and forwarding.

  - **Functionality**:

    - Extracts relevant metadata from log entries to facilitate efficient querying.

    - Ensures that all logs are centrally collected and available for analysis.

- **Tempo**:

  - **Role**: Distributed tracing.

  - **Functionality**:

    - Captures trace data to identify performance bottlenecks and latencies.

    - Allows tracing the lifecycle of requests across multiple services, providing a detailed view of service interactions.

- **NGINX Gateway**:

  - **Role**: Facilitates and manages the flow of metrics and logs.

  - **Functionality**:

    - Acts as a proxy server for routing requests to the appropriate endpoints.

    - Manages SSL termination and secures communication between monitoring components.

    - Balances the load between the Loki read and write targets, ensuring efficient log processing.

- **MinIO**:

  - **Role**: Object storage for logs and metrics.

  - **Functionality**:

    - Provides an S3-compatible storage solution for Loki's log data.

    - Ensures high availability and durability of stored log data.

    - Simplifies the management of large volumes of log data, supporting efficient storage and retrieval operations.


#### Procedure for Log and Metrics Collection

1. **Log Collection with Promtail**:

   - **Promtail** is deployed to collect logs from Docker containers. It uses Docker service discovery to detect running containers and retrieve their logs.

   - Logs are collected in real-time from the containers and enriched with metadata such as container name, labels, and other relevant information.

   - Promtail forwards these logs to **Loki** for aggregation and storage.

2. **Log Aggregation with Loki**:

   - **Loki** receives log data from Promtail and stores it in an efficient, compressed format.

   - Logs are indexed and made available for querying. Users can search, filter, and analyze logs using the integrated query interface.

   - Loki integrates with Grafana, allowing logs to be visualized alongside metrics and traces.

   - **MinIO** is used as the storage backend for Loki, providing an S3-compatible object store to ensure durability and availability of log data.

3. **Metrics Collection with Prometheus**:

   - **Prometheus** scrapes metrics from various microservices and infrastructure components at regular intervals (every 5 seconds).

   - Each microservice exposes metrics via an HTTP endpoint, typically using the `/actuator/prometheus` endpoint in Spring Boot applications.

   - Prometheus collects these metrics and stores them in its time-series database.

4. **Data Visualization with Grafana**:

   - **Grafana** connects to Prometheus, Loki, and Tempo as data sources.

   - It provides dashboards for visualizing metrics, logs, and traces in real-time.

   - Users can create custom dashboards and set up alerts based on data from Prometheus and Loki.

5. **Tracing with Tempo**:

   - **Tempo** collects trace data from microservices, capturing the lifecycle of requests as they traverse different services.

   - Traces are stored and made available for analysis, helping to identify performance bottlenecks and latencies.

   - Tempo integrates with Grafana for visualizing trace data alongside logs and metrics.

6. **NGINX Gateway for Monitoring and Observability**:

   - **NGINX** is configured to handle the routing of log and metric data between various components:

     - Routes requests to the appropriate Loki read and write endpoints for log aggregation.

     - Manages SSL termination, securing the communication between monitoring components.

     - Balances the load between different instances, ensuring efficient processing and minimizing bottlenecks.

   - Ensures high availability and reliability by acting as a central point of management for log and metric data flow.


#### Summary

The integration of Promtail, Loki, Prometheus, Grafana, MinIO, and NGINX provides a comprehensive monitoring and observability solution for the e-commerce microservice architecture. Key benefits include:

- **Comprehensive Monitoring**: Real-time metrics collection and visualization with Prometheus and Grafana, providing insights into system performance and health.

- **Centralized Log Management**: Efficient log aggregation and querying with Loki and Promtail, enabling quick diagnosis of issues.

- **Distributed Tracing**: Detailed tracing of requests across microservices with Tempo, facilitating performance optimization and root cause analysis.

- **Efficient Data Flow Management**: NGINX acts as a gateway to route, secure, and balance the flow of log and metric data, enhancing the reliability and efficiency of the monitoring system.

- **Reliable Storage**: MinIO provides durable and highly available storage for log data, ensuring that logs are securely stored and easily retrievable.

These tools collectively enhance the stability, performance, and reliability of the e-commerce application, ensuring a seamless and efficient user experience.


# Deployment Summary of Microservices Application to AWS with EKS

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXeYI0P5c9hn0VlbgKjZyDnjpLhN08sEGlJkD5DkcWGPcDzcYskX67whDyMeww0bfpt_59zyw-u0PCfCDAxhGsuax8zrvjOeLuGbXBDN_VuY8-toZf8UEMn1xrtBXDtj08JisC6VdjdEuz72woiF6qlCCnD0?key=It25FaNN3Hk2ogZbUXQYcg)


#### Overview 

The e-commerce microservices application is deployed on AWS using Elastic Kubernetes Service (EKS), leveraging a robust and scalable infrastructure. This deployment utilizes various AWS components such as VPC, subnets, NAT gateway, ingress controller, services, ConfigMaps, EC2 instances, and a bastion host to ensure high availability, security, and efficient resource management.


### Cloud Security

#### Elastic Kubernetes Service (EKS)

- **Managed Service Security:** EKS integrates seamlessly with AWS Identity and Access Management (IAM), enhancing security through role-based access control. This integration ensures that only authorized users can manage the Kubernetes clusters and associated resources.

- **Security Groups:** Applied to EKS nodes to control inbound and outbound traffic, allowing only trusted sources to interact with the cluster.


#### Virtual Private Cloud (VPC)

- **Network Isolation:** The VPC provides a logically isolated network environment, segregating the Kubernetes cluster from other AWS resources. This setup enhances security by preventing unauthorized access to the Kubernetes resources.

- **Traffic Control:** Security groups and network access control lists (NACLs) are used to control inbound and outbound traffic, ensuring that only approved traffic is allowed to reach the resources.


#### Subnets

- **Public Subnet:** The public subnet hosts the bastion host, which provides a secure entry point for accessing resources in the private subnet. This bastion host allows SSH access to private instances through a single, monitored entry point.

- **Private Subnet:** The private subnet houses critical components such as EKS worker nodes and middleware services, which do not require direct internet access. This configuration keeps sensitive data and services protected, enhancing overall security.


#### NAT Gateway

- **Secure Internet Access:** The NAT gateway, deployed in the public subnet, enables instances in the private subnet to connect to the internet securely. This setup prevents inbound internet traffic from reaching the private instances, ensuring a secure environment.


#### Ingress Controller

- **Traffic Management:** The NGINX ingress controller efficiently manages inbound traffic to the Kubernetes cluster. It routes traffic based on request paths and hostnames, directing it either to NGINX servers for serving static content or to the gateway server for handling dynamic requests. This ensures that traffic is handled appropriately and securely.

- **CORS Configurations:** The ingress controller is configured with annotations to handle CORS settings, ensuring flexibility and security in managing cross-origin requests.

  - `nginx.ingress.kubernetes.io/cors-allow-credentials: "true"`

  - `nginx.ingress.kubernetes.io/cors-allow-headers: '*`

  - `nginx.ingress.kubernetes.io/cors-allow-methods: PUT, GET, POST, OPTIONS`

  - `nginx.ingress.kubernetes.io/cors-allow-origin: '*'`

  - `nginx.ingress.kubernetes.io/enable-cors: "true"`

  - `nginx.ingress.kubernetes.io/use-regex: "true"`


### Reliability

#### Elastic Kubernetes Service (EKS)

- **High Availability:** EKS ensures the control plane is highly available, automatically replacing unhealthy nodes to maintain service continuity. This minimizes downtime and ensures that the application remains available to users.


#### Auto Scaling and Health Checks

- **Auto Scaling:**

  - Desired size: 1

  - Minimum size: 1

  - Maximum size: 2

- **Health Checks:** Regular health checks monitor the state of pods, replacing unhealthy instances to maintain service availability. This proactive monitoring ensures that issues are detected and resolved quickly.

  - `readinessProbe:`

    - `failureThreshold: 3`

    - `httpGet:`

      - `path: /`

      - `port: 80`

      - `scheme: HTTP`

    - `periodSeconds: 10`

    - `successThreshold: 1`

    - `timeoutSeconds: 1`


#### Services and ConfigMaps

- **Stable Endpoints:** Kubernetes services expose applications running on pods as network services, providing stable endpoints for communication. This ensures reliable communication within the cluster and with external clients.

- **Dynamic Configuration:** ConfigMaps manage configuration data separately from the application code, allowing dynamic reconfiguration of applications without altering the code. This flexibility enhances reliability by enabling quick adjustments to configuration settings.

  - `terminationGracePeriodSeconds: 30`


### Scalability

#### Elastic Kubernetes Service (EKS)

- **Automatic Scaling:** EKS automatically scales the infrastructure based on load, ensuring optimal performance during varying demand levels. This capability allows the application to handle increased traffic without manual intervention.

  - `strategy: RollingUpdate`

    - `maxSurge: 25%`

    - `maxUnavailable: 25%`


#### Virtual Private Cloud (VPC)

- **Customizability:** The VPC supports custom IP address ranges and subnet configurations, facilitating scalability. This flexibility allows the deployment to adapt to changing requirements and scale as needed.


#### Subnets

- **Resource Allocation:** The use of public and private subnets optimizes resource allocation, allowing scalable deployment of components. This setup ensures that resources are used efficiently and can be scaled up or down as required.


#### Ingress Controller

- **Efficient Routing:** The ingress controller routes traffic efficiently based on request paths and hostnames, managing load distribution effectively. This ensures that the application can handle varying traffic loads without performance degradation.


#### EC2 Instances

- **Flexible Computing:** EC2 instances provide scalable computing capacity, supporting various instance types and configurations to optimize performance and cost. This flexibility ensures that the deployment can handle increased demand without compromising performance.


### Summary

Deploying the e-commerce microservices application to AWS with EKS provides a robust and scalable architecture that ensures high availability, security, and efficient resource management. By integrating EKS, VPC, subnets, NAT gateway, ingress controller, services, ConfigMaps, EC2 instances, and a bastion host, the application benefits from a resilient infrastructure capable of handling failures gracefully, delivering a reliable and seamless user experience.

