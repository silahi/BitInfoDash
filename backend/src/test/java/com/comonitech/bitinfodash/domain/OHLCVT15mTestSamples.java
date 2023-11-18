package com.comonitech.bitinfodash.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class OHLCVT15mTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static OHLCVT15m getOHLCVT15mSample1() {
        return new OHLCVT15m().id(1L).volume(1L).trades(1);
    }

    public static OHLCVT15m getOHLCVT15mSample2() {
        return new OHLCVT15m().id(2L).volume(2L).trades(2);
    }

    public static OHLCVT15m getOHLCVT15mRandomSampleGenerator() {
        return new OHLCVT15m().id(longCount.incrementAndGet()).volume(longCount.incrementAndGet()).trades(intCount.incrementAndGet());
    }
}
