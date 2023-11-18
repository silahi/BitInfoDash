package com.comonitech.bitinfodash.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class OHLCVT5mTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static OHLCVT5m getOHLCVT5mSample1() {
        return new OHLCVT5m().id(1L).volume(1L).trades(1);
    }

    public static OHLCVT5m getOHLCVT5mSample2() {
        return new OHLCVT5m().id(2L).volume(2L).trades(2);
    }

    public static OHLCVT5m getOHLCVT5mRandomSampleGenerator() {
        return new OHLCVT5m().id(longCount.incrementAndGet()).volume(longCount.incrementAndGet()).trades(intCount.incrementAndGet());
    }
}
