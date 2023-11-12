package com.comonitech.bitinfodash.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class BitcoinAddressTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static BitcoinAddress getBitcoinAddressSample1() {
        return new BitcoinAddress().id(1L).address("address1").label("label1");
    }

    public static BitcoinAddress getBitcoinAddressSample2() {
        return new BitcoinAddress().id(2L).address("address2").label("label2");
    }

    public static BitcoinAddress getBitcoinAddressRandomSampleGenerator() {
        return new BitcoinAddress()
            .id(longCount.incrementAndGet())
            .address(UUID.randomUUID().toString())
            .label(UUID.randomUUID().toString());
    }
}
