package com.comonitech.bitinfodash.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class MarketTrendsTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static MarketTrends getMarketTrendsSample1() {
        return new MarketTrends().id(1L).trendName("trendName1").trendType("trendType1");
    }

    public static MarketTrends getMarketTrendsSample2() {
        return new MarketTrends().id(2L).trendName("trendName2").trendType("trendType2");
    }

    public static MarketTrends getMarketTrendsRandomSampleGenerator() {
        return new MarketTrends()
            .id(longCount.incrementAndGet())
            .trendName(UUID.randomUUID().toString())
            .trendType(UUID.randomUUID().toString());
    }
}
