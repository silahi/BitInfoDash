package com.comonitech.bitinfodash.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class BitcoinOverviewTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static BitcoinOverview getBitcoinOverviewSample1() {
        return new BitcoinOverview().id(1L).currency("currency1");
    }

    public static BitcoinOverview getBitcoinOverviewSample2() {
        return new BitcoinOverview().id(2L).currency("currency2");
    }

    public static BitcoinOverview getBitcoinOverviewRandomSampleGenerator() {
        return new BitcoinOverview().id(longCount.incrementAndGet()).currency(UUID.randomUUID().toString());
    }
}
