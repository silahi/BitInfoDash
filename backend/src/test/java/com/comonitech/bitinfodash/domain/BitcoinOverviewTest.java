package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.BitcoinOverviewTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BitcoinOverviewTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BitcoinOverview.class);
        BitcoinOverview bitcoinOverview1 = getBitcoinOverviewSample1();
        BitcoinOverview bitcoinOverview2 = new BitcoinOverview();
        assertThat(bitcoinOverview1).isNotEqualTo(bitcoinOverview2);

        bitcoinOverview2.setId(bitcoinOverview1.getId());
        assertThat(bitcoinOverview1).isEqualTo(bitcoinOverview2);

        bitcoinOverview2 = getBitcoinOverviewSample2();
        assertThat(bitcoinOverview1).isNotEqualTo(bitcoinOverview2);
    }
}
