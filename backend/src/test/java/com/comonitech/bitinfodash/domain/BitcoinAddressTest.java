package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.BitcoinAddressTestSamples.*;
import static com.comonitech.bitinfodash.domain.TransactionsTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class BitcoinAddressTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BitcoinAddress.class);
        BitcoinAddress bitcoinAddress1 = getBitcoinAddressSample1();
        BitcoinAddress bitcoinAddress2 = new BitcoinAddress();
        assertThat(bitcoinAddress1).isNotEqualTo(bitcoinAddress2);

        bitcoinAddress2.setId(bitcoinAddress1.getId());
        assertThat(bitcoinAddress1).isEqualTo(bitcoinAddress2);

        bitcoinAddress2 = getBitcoinAddressSample2();
        assertThat(bitcoinAddress1).isNotEqualTo(bitcoinAddress2);
    }

    @Test
    void transactionsTest() throws Exception {
        BitcoinAddress bitcoinAddress = getBitcoinAddressRandomSampleGenerator();
        Transactions transactionsBack = getTransactionsRandomSampleGenerator();

        bitcoinAddress.addTransactions(transactionsBack);
        assertThat(bitcoinAddress.getTransactions()).containsOnly(transactionsBack);
        assertThat(transactionsBack.getBitcoinAddress()).isEqualTo(bitcoinAddress);

        bitcoinAddress.removeTransactions(transactionsBack);
        assertThat(bitcoinAddress.getTransactions()).doesNotContain(transactionsBack);
        assertThat(transactionsBack.getBitcoinAddress()).isNull();

        bitcoinAddress.transactions(new HashSet<>(Set.of(transactionsBack)));
        assertThat(bitcoinAddress.getTransactions()).containsOnly(transactionsBack);
        assertThat(transactionsBack.getBitcoinAddress()).isEqualTo(bitcoinAddress);

        bitcoinAddress.setTransactions(new HashSet<>());
        assertThat(bitcoinAddress.getTransactions()).doesNotContain(transactionsBack);
        assertThat(transactionsBack.getBitcoinAddress()).isNull();
    }
}
