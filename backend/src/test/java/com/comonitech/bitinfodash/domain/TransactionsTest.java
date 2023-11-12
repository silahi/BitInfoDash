package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.BitcoinAddressTestSamples.*;
import static com.comonitech.bitinfodash.domain.TransactionsTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TransactionsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transactions.class);
        Transactions transactions1 = getTransactionsSample1();
        Transactions transactions2 = new Transactions();
        assertThat(transactions1).isNotEqualTo(transactions2);

        transactions2.setId(transactions1.getId());
        assertThat(transactions1).isEqualTo(transactions2);

        transactions2 = getTransactionsSample2();
        assertThat(transactions1).isNotEqualTo(transactions2);
    }

    @Test
    void bitcoinAddressTest() throws Exception {
        Transactions transactions = getTransactionsRandomSampleGenerator();
        BitcoinAddress bitcoinAddressBack = getBitcoinAddressRandomSampleGenerator();

        transactions.setBitcoinAddress(bitcoinAddressBack);
        assertThat(transactions.getBitcoinAddress()).isEqualTo(bitcoinAddressBack);

        transactions.bitcoinAddress(null);
        assertThat(transactions.getBitcoinAddress()).isNull();
    }
}
