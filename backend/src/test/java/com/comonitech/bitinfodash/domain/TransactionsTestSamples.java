package com.comonitech.bitinfodash.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TransactionsTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Transactions getTransactionsSample1() {
        return new Transactions().id(1L).senderAddress("senderAddress1").recipientAddress("recipientAddress1");
    }

    public static Transactions getTransactionsSample2() {
        return new Transactions().id(2L).senderAddress("senderAddress2").recipientAddress("recipientAddress2");
    }

    public static Transactions getTransactionsRandomSampleGenerator() {
        return new Transactions()
            .id(longCount.incrementAndGet())
            .senderAddress(UUID.randomUUID().toString())
            .recipientAddress(UUID.randomUUID().toString());
    }
}
