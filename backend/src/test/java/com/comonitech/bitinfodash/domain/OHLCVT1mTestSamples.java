package com.comonitech.bitinfodash.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class OHLCVT1mTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static OHLCVT1m getOHLCVT1mSample1() {
        return new OHLCVT1m().id(1L).volume(1L).trades(1);
    }

    public static OHLCVT1m getOHLCVT1mSample2() {
        return new OHLCVT1m().id(2L).volume(2L).trades(2);
    }

    public static OHLCVT1m getOHLCVT1mRandomSampleGenerator() {
        return new OHLCVT1m().id(longCount.incrementAndGet()).volume(longCount.incrementAndGet()).trades(intCount.incrementAndGet());
    }
}
