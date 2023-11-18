package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.OHLCVT1hTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OHLCVT1hTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OHLCVT1h.class);
        OHLCVT1h oHLCVT1h1 = getOHLCVT1hSample1();
        OHLCVT1h oHLCVT1h2 = new OHLCVT1h();
        assertThat(oHLCVT1h1).isNotEqualTo(oHLCVT1h2);

        oHLCVT1h2.setId(oHLCVT1h1.getId());
        assertThat(oHLCVT1h1).isEqualTo(oHLCVT1h2);

        oHLCVT1h2 = getOHLCVT1hSample2();
        assertThat(oHLCVT1h1).isNotEqualTo(oHLCVT1h2);
    }
}
