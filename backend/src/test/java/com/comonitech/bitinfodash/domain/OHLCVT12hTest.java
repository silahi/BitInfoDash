package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.OHLCVT12hTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OHLCVT12hTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OHLCVT12h.class);
        OHLCVT12h oHLCVT12h1 = getOHLCVT12hSample1();
        OHLCVT12h oHLCVT12h2 = new OHLCVT12h();
        assertThat(oHLCVT12h1).isNotEqualTo(oHLCVT12h2);

        oHLCVT12h2.setId(oHLCVT12h1.getId());
        assertThat(oHLCVT12h1).isEqualTo(oHLCVT12h2);

        oHLCVT12h2 = getOHLCVT12hSample2();
        assertThat(oHLCVT12h1).isNotEqualTo(oHLCVT12h2);
    }
}
