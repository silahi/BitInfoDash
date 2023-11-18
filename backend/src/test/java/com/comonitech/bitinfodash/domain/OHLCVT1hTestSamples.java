package com.comonitech.bitinfodash.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class OHLCVT1hTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static OHLCVT1h getOHLCVT1hSample1() {
        return new OHLCVT1h().id(1L).volume(1L).trades(1);
    }

    public static OHLCVT1h getOHLCVT1hSample2() {
        return new OHLCVT1h().id(2L).volume(2L).trades(2);
    }

    public static OHLCVT1h getOHLCVT1hRandomSampleGenerator() {
        return new OHLCVT1h().id(longCount.incrementAndGet()).volume(longCount.incrementAndGet()).trades(intCount.incrementAndGet());
    }
}
