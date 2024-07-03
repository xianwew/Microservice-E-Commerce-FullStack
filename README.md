# Hello and welcome to my GitHub repository!

This project is a react / spring full-stack e-commerce application built using a microservice architecture. Over the course of 25 days, I have implemented a robust, scalable, and reliable system using cutting-edge technologies. The application includes services for users, items, orders, and payments, all orchestrated to provide a seamless e-commerce experience.

Feel free to explore the code, and don't hesitate to reach out if you have any questions or feedback!

Thank you for visiting, and I hope you find this project as exciting and educational as I did while building it.


# Overview of System Components

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfQ5nVG9cr49ZRrknTjph8Ggbt2vYvuk0lfPSy0Yj3iDOmV01ZJsIhyZY6fCHyPlu4zdUSUfuVErSROBgRDx5dylpBw9D-ybXtmMq-qp2A3O8DqxpYjTXQwi4oVz7x__l8V-YpkaEakJyH7v5bf7huJ6-w?key=It25FaNN3Hk2ogZbUXQYcg)


# Quick Links

1. [****Components Summary****](#Components-Summary)

2. [****Spring Netflix Eureka Cluster****](#Spring-Netflix-Eureka-Cluster)

3. [****Kafka Cluster for Asynchronous Processing****](#Kafka-Cluster-for-Asynchronous-Processing)

4. [****SAGA Pattern, Fallback, and WebSocket Notification****](#SAGA-Pattern-Fallback-and-WebSocket-Notification)

5. [****MySQL Master-Slave Setup and Optimistic Locking****](#MySQL-Master-Slave-Setup-and-Optimistic-Locking)

6. [****Redis Sentinel Setup and AOP Performance Measurement****](#Redis-Sentinel-Setup-and-AOP-Performance-Measurement)

7. [****NGINX as Reverse Proxy****](#NGINX-as-Reverse-Proxy)

8. [****Keycloak OAuth2 Server Authentication and Authorization with Spring Security****](#Keycloak-OAuth2-Server-Authentication-and-Authorization-with-Spring-Security)

9. [****Resilience4J Circuit Breaker, Redis Rate Limiter, and Fallback API****](#Resilience4J-Circuit-Breaker-Redis-Rate-Limiter-and-Fallback-API)

10.  [****Monitoring and Observability with Promtail, Loki, Prometheus, and Grafana****](#Monitoring-and-Observability-with-Promtail-Loki-Prometheus-and-Grafana)


# Sample App Screenshots

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXf6KcwgdnvgYP0QwC5VAgMfzhBGh0Dyh0VUvxnrLrDtjzi7pZOhfIduMs6v2ijm10oHpfQMoD9CbaougDf4ZeUtwKdvZWQhIcpv-U6VGyAeDH1vK0hzkkkXvS2QwguywDVEjI2Pn3KK4_KXsp1BhZ8EN_Nu?key=It25FaNN3Hk2ogZbUXQYcg)

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfbdiOZE8s_pEu5xJQ251yNc42h9dH4DIBN3Mn38Xzim6wz6zSav3rn6c519cz_Zs6LkV4W6rqkhy71KMFhM5LdMvDmE-Yt5_-HkHdQvnV9hHlUbsC9XciX3i_3UCBJq9wWLSraAWNO9xRmngnCN8QYyOyz?key=It25FaNN3Hk2ogZbUXQYcg)

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXezLqmESm-og237k91Uyj6MEUOLiPul3RCIWHTwvUYgQ8Wqp2XL_OERw6Bj5TMdt6BrYV1Sku2LPzagN7gRTSWcep1TPxr4Kwwhw3Q1qOdyzVLAOp0ZaWiI7fk3Sl9PTne85yPlpn4AZ6zEgs6H-tmxZ1cc?key=It25FaNN3Hk2ogZbUXQYcg)

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfIFoaBOa9PXg6tZjW2RpKuAYJlAlClw66mYfdmx4o7Tc_X1b2615BpF2YQUg6ZvR81rbHmcUVAzZi_4rK3TF2j0FdvvKTZeoUp8gA-L7gRsEAvxe3Bdffy9A4L-UOh3ZyOBG5fqhuh2dM0oU5C2u0GhjU?key=It25FaNN3Hk2ogZbUXQYcg)


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

- Enhances performance through distributed caching, with a master-slave setup for high availability and reliability.


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

#### ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXdImkO9juLgMoVTcBdZWJIMVz8LaearI5ZWMNYu-mwdqLpbt9Y7dEUqJ3j48So8u2yxuBTpan1UDANz0ZHHCF-jcPvSAPEpPkN15PqNDQKcFvoSMzIB1JrzXCuBwn_pZSZM9T3hbZYcy_8QSlzCW7Pmmspu?key=It25FaNN3Hk2ogZbUXQYcg)

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

#### ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXeSGqeQAJQSHIA2iRgvi-UPcBbhgTEwht5Kjva4WXPtpMLgZ-VYFjYfVUEOsFUAWU2gyZlG5MKZ7SRnOYmjUrlz4tWiKcHLwzRYJKtc07fXooQUgTJmi9PT18jPG7C0j_J0WPGS2MrLJdoJ6IUIDfWsDvw?key=It25FaNN3Hk2ogZbUXQYcg)

#### Overview<a id="overview"></a>

The Kafka cluster in the e-commerce microservice architecture is designed to facilitate asynchronous communication between services. It is a key component that ensures high availability, performance, and reliability, supporting the overall event-driven architecture of the system.


#### Configuration and Features<a id="configuration-and-features"></a>

##### High Availability<a id="high-availability"></a>

- **Cluster Composition**:

  - The Kafka cluster consists of three brokers (`kafka1`, `kafka2`, `kafka3`), coordinated by a Zookeeper instance (`zoo1`).

  - This setup ensures redundancy, allowing the system to tolerate the failure of one or more brokers while maintaining message processing capabilities.

- **Health Checks**:

  - Health checks are performed every 20 seconds with a timeout of 5 seconds and up to 20 retries.

  - These checks ensure that brokers are healthy and available, enhancing the resilience of the cluster.


##### Performance<a id="performance"></a>

- **Asynchronous Message Pushing**:

  - The producer pushes messages to the Kafka brokers asynchronously, ensuring high throughput and the ability to handle thousands of messages per second.

- **Concurrent Reading**:

  - The consumer is configured to read messages concurrently, allowing efficient message processing.

  - The concurrency setting of three helps manage parallel consumption, improving the overall processing speed.

- **Message Replication**:

  - Kafka brokers are configured with a `KAFKA_REPLICATETHROUGHPUTPERMINUTE` of 600 messages per minute.

  - This setting ensures timely replication of messages across brokers, maintaining data consistency and durability.


##### Reliability<a id="reliability"></a>

- **Message Delivery**:

  - The producer sends messages only if at least one broker is available, ensuring message reliability.

- **Failed Message Categorization**:

  - Failed Messages are categorized based on their recoverability. Recoverable messages are retried, and if the maximum retries (set to five) are exceeded, they are stored in a MySQL database for manual inspection. If the message is unrecoverable, it will be directly stored in the database for further inspection.

- **Health Checks and Lease Expiration**:

  - Regular health checks ensure that Kafka brokers are available and ready to process messages.

  - Settings like `KAFKA_LEASEEXPIRATIONDURATIONINSECONDS` set to 90 seconds ensure timely lease expiration, preventing stale connections.

- **Idempotent Producer**:

  - Configurations such as `ENABLE_IDEMPOTENCE_CONFIG` ensure that messages are not duplicated during retries, maintaining data integrity.


#### Implementation Details<a id="implementation-details"></a>

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


#### Summary<a id="summary"></a>

The Kafka cluster is a vital component of the e-commerce microservice architecture, providing essential capabilities for high availability, performance, and reliability. Its configuration with three brokers and robust message handling mechanisms ensures that the system can efficiently process a large volume of messages while maintaining data integrity and service continuity. Key aspects include:

- **High Availability**: Achieved through a multi-broker setup and regular health checks, ensuring the system can tolerate failures.

- **Performance**: Enhanced by asynchronous message pushing and concurrent reading, capable of handling thousands of messages per second.

- **Reliability**: Ensured through idempotent producer configurations, categorized message handling, and regular health checks.

This setup significantly enhances the overall stability and efficiency of the application, supporting the dynamic and scalable nature of the microservice architecture.



# SAGA Pattern, Fallback, and WebSocket Notification

#### ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXccVLrWeM9IJ4zWUOwqtijxez8tsWxitm56sOKwQCQIjb2lCZRAdWmhSMMJO_LAUWaCuD5mWoyBANGcwqatzTSMMNjkLFIqxpwDBdyiCg71htC7M5UpleyjZ34efFpTGP2ZP8CGn1SsxU8qSBhy-a42Hpg?key=It25FaNN3Hk2ogZbUXQYcg)


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

#### ![](https://lh7-us.googleusercontent.com/docsz/AD_4nXeNDO-H90xqvvqfqmmbunN9ZCbGLvz65A0dhv6-H3WwO5wky_tomy_8wHkT2X5LNdDE5ttJOOCNrsHVQh8gOHDZ0ExDV3U2YMY67Ge8IMjdQQfIo1CBaS6V9dd7dKh0WPJbJc6ilA5h4P1K4_JF_vLwoGs2?key=It25FaNN3Hk2ogZbUXQYcg)

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

#### ****![](https://lh7-us.googleusercontent.com/docsz/AD_4nXe1jlkg5zwV03IG4A-bs3WR3KzpVqeHxhZEUmIUTYfyIa5yLFWiUATWvtD6ElqF-2sgLO9jXZeX1sW3sSXtGY1SAqEk4NO-pz2eE-GIx0hJByKwFX-5_NzGB3POqgYNpO3e0TIxU-4MyvGjJdV2CjkSOfc3?key=It25FaNN3Hk2ogZbUXQYcg)

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


# NGINX as Reverse Proxy

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXdJGsu5yv1lUJefCn0pJksBgtklgeDwnaK3npAoZ9XHM1EKIZnAnxRLpn0GOr57YmyQ9FICLD4jej4LBLnC4DaJc3Sdph94N62njC4Vu_6l9_LctTYqdnwdNHt9ak5eDWYvxXwjtd0jpZbw7s82GqpNbEw?key=It25FaNN3Hk2ogZbUXQYcg)


#### Overview

NGINX is used as a reverse proxy in the e-commerce microservice architecture to enhance performance, security, and scalability. By acting as an intermediary between client requests and backend services, NGINX helps distribute load, manage SSL termination, and serve static content efficiently.


#### Configuration and Features

- **NGINX Configuration**:

  - **Container Setup**:

    - The NGINX container is configured to listen on ports 80 (HTTP) and 443 (HTTPS).

    - SSL certificates are provided for secure communication.

    - Static files from the frontend build are served directly from the NGINX container.

  - **Worker Processes**:

    - Configured with one worker process and a maximum of 1024 connections per worker.

  - **HTTP Settings**:

    - `sendfile` is enabled for efficient file transfer.

    - `keepalive_timeout` is set to 65 seconds to maintain open connections for a duration, reducing the overhead of establishing new connections.

- **Server Configuration**:

  - **SSL Termination**:

    - SSL certificates (`nginx.crt` and `nginx.key`) are used for secure communication.

    - SSL session caching and timeout are configured to improve performance and security.

  - **Proxy Settings**:

    - Requests to the root path (`/`) are proxied to the gateway server on port 8080.

    - Various headers (`Host`, `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`) are set to pass client information to the backend services.

  - **Static Content Handling**:

    - Static files under the `/static/` path are served directly from the NGINX container, with caching enabled for one hour.

    - The `index.html` file is also served with caching and specific cache-control headers to ensure efficient content delivery.


#### Performance and Reliability

- **Performance**:

  - **SSL Termination**: By handling SSL termination, NGINX offloads the encryption and decryption process from the backend services, improving overall performance.

  - **Static Content Serving**: Serving static files directly from NGINX reduces the load on backend services and speeds up content delivery.

  - **Caching**: Enabling SSL session caching and setting cache-control headers for static files and `index.html` reduces load times and improves user experience.

  - **Performance Measurement**: Using the Lighthouse plugin in Chrome, the loading time has been reduced from `320ms` ****to `200ms`, demonstrating a significant performance improvement.

- **Security**:

  - **SSL Encryption**: Ensures secure communication between clients and the server.

  - **Header Management**: Properly set headers help in maintaining security and passing crucial client information to backend services.

- **Availability**:

  - **Reverse Proxy**: Acts as a single entry point for client requests, managing traffic and improving the availability of backend services.

  - **Health Checks and Failover**: NGINX can be configured to perform health checks and reroute traffic in case of backend service failures, ensuring high availability.


#### Implementation Details

- **Reverse Proxy**:

  - NGINX is configured to forward incoming requests to the gateway server, acting as an intermediary that manages traffic efficiently.

  - This setup provides a layer of abstraction and allows for easier scaling and management of backend services.

- **SSL Session Caching**:

  - SSL session caching is enabled to reuse SSL session parameters, reducing the overhead of establishing new SSL connections and improving performance.

- **Static Content Serving**:

  - Static assets are served directly from NGINX, leveraging caching mechanisms to enhance performance and reduce load times.

- **Cache-Control Headers**:

  - Specific cache-control headers are set for static content to ensure efficient caching and faster load times for returning users.


#### Summary

NGINX as a reverse proxy significantly enhances the performance, security, and availability of the e-commerce application. Key benefits include:

- **Improved Performance**: Load balancing, SSL termination, and efficient static content serving reduce load times from 320ms to 200ms.

- **Enhanced Security**: SSL encryption and proper header management ensure secure communication and maintain data integrity.

- **High Availability**: Acting as a reverse proxy, NGINX distributes traffic and provides failover capabilities, ensuring the continuous availability of backend services.

These features collectively contribute to a robust and efficient infrastructure, providing a seamless and secure user experience for the e-commerce application.


# Keycloak OAuth2 server authentication and authorization with Spring Security

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXdV9croEHXx4u92CA7bD6J888L906Bay20ZbdxepHHm2_vhxPKWh9pvWXCqKbJOxO1i1pNfen9u38n6QBXY0HVM-RZjtXJfVCMX_pDlDe5pjGGQYU1FG0OeaydEpbmO2z2kw9aMlaDOc5v2Zi0kTWmPbRA?key=It25FaNN3Hk2ogZbUXQYcg)


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

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXcwwrfBpQwNdoQiPSa5xaEDAqoZM2jycfpzC3EmS-tvXTtP_LyLfCec-njGT0jbXy8n3lHfuqjOIJNMRKJ0ZFfbtWeJp6QLi-dmdl8XfAzURtJE9XjXZLjUoWd6nTJaOgV8qZoWnyPqQzXlMilaPmGxt5Q?key=It25FaNN3Hk2ogZbUXQYcg)


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

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXdAuqpW16bTexH_FvcOQvWe6vvqb18nKpfOEKjm4YF81Ac23GtKJ529x-lsCpQrp-HVQp0MJMNtwoQLB5rYBbyP2aH_ZZN8zN0O2Vxhg8PsIOXlitnnql5JyBq5UeBXnEXbi6F5E5dQhJALS23GNpRoPSf0?key=It25FaNN3Hk2ogZbUXQYcg)


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
