package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.OHLCVT1dTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OHLCVT1dTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OHLCVT1d.class);
        OHLCVT1d oHLCVT1d1 = getOHLCVT1dSample1();
        OHLCVT1d oHLCVT1d2 = new OHLCVT1d();
        assertThat(oHLCVT1d1).isNotEqualTo(oHLCVT1d2);

        oHLCVT1d2.setId(oHLCVT1d1.getId());
        assertThat(oHLCVT1d1).isEqualTo(oHLCVT1d2);

        oHLCVT1d2 = getOHLCVT1dSample2();
        assertThat(oHLCVT1d1).isNotEqualTo(oHLCVT1d2);
    }
}
