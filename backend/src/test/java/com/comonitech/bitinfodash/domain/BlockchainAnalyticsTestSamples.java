package com.comonitech.bitinfodash.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class BlockchainAnalyticsTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static BlockchainAnalytics getBlockchainAnalyticsSample1() {
        return new BlockchainAnalytics().id(1L).transactionCount(1).hashrateDistribution("hashrateDistribution1");
    }

    public static BlockchainAnalytics getBlockchainAnalyticsSample2() {
        return new BlockchainAnalytics().id(2L).transactionCount(2).hashrateDistribution("hashrateDistribution2");
    }

    public static BlockchainAnalytics getBlockchainAnalyticsRandomSampleGenerator() {
        return new BlockchainAnalytics()
            .id(longCount.incrementAndGet())
            .transactionCount(intCount.incrementAndGet())
            .hashrateDistribution(UUID.randomUUID().toString());
    }
}
