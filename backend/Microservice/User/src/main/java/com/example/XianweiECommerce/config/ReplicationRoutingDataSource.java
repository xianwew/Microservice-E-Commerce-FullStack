package com.example.XianweiECommerce.config;


import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class ReplicationRoutingDataSource extends AbstractRoutingDataSource {
    @Override
    protected Object determineCurrentLookupKey() {
        return ReplicationRoutingDataSourceContext.getDataSourceType();
    }
}
