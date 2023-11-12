package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.BlockchainAnalyticsTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BlockchainAnalyticsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlockchainAnalytics.class);
        BlockchainAnalytics blockchainAnalytics1 = getBlockchainAnalyticsSample1();
        BlockchainAnalytics blockchainAnalytics2 = new BlockchainAnalytics();
        assertThat(blockchainAnalytics1).isNotEqualTo(blockchainAnalytics2);

        blockchainAnalytics2.setId(blockchainAnalytics1.getId());
        assertThat(blockchainAnalytics1).isEqualTo(blockchainAnalytics2);

        blockchainAnalytics2 = getBlockchainAnalyticsSample2();
        assertThat(blockchainAnalytics1).isNotEqualTo(blockchainAnalytics2);
    }
}
