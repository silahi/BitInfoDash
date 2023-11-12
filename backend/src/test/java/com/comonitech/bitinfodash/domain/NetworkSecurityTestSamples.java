package com.comonitech.bitinfodash.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class NetworkSecurityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static NetworkSecurity getNetworkSecuritySample1() {
        return new NetworkSecurity()
            .id(1L)
            .alertType("alertType1")
            .description("description1")
            .severity("severity1")
            .resolution("resolution1");
    }

    public static NetworkSecurity getNetworkSecuritySample2() {
        return new NetworkSecurity()
            .id(2L)
            .alertType("alertType2")
            .description("description2")
            .severity("severity2")
            .resolution("resolution2");
    }

    public static NetworkSecurity getNetworkSecurityRandomSampleGenerator() {
        return new NetworkSecurity()
            .id(longCount.incrementAndGet())
            .alertType(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .severity(UUID.randomUUID().toString())
            .resolution(UUID.randomUUID().toString());
    }
}
