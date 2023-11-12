package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.MarketTrendsTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MarketTrendsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MarketTrends.class);
        MarketTrends marketTrends1 = getMarketTrendsSample1();
        MarketTrends marketTrends2 = new MarketTrends();
        assertThat(marketTrends1).isNotEqualTo(marketTrends2);

        marketTrends2.setId(marketTrends1.getId());
        assertThat(marketTrends1).isEqualTo(marketTrends2);

        marketTrends2 = getMarketTrendsSample2();
        assertThat(marketTrends1).isNotEqualTo(marketTrends2);
    }
}
