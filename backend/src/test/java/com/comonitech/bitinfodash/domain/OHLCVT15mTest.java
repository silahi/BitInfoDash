package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.OHLCVT15mTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OHLCVT15mTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OHLCVT15m.class);
        OHLCVT15m oHLCVT15m1 = getOHLCVT15mSample1();
        OHLCVT15m oHLCVT15m2 = new OHLCVT15m();
        assertThat(oHLCVT15m1).isNotEqualTo(oHLCVT15m2);

        oHLCVT15m2.setId(oHLCVT15m1.getId());
        assertThat(oHLCVT15m1).isEqualTo(oHLCVT15m2);

        oHLCVT15m2 = getOHLCVT15mSample2();
        assertThat(oHLCVT15m1).isNotEqualTo(oHLCVT15m2);
    }
}
