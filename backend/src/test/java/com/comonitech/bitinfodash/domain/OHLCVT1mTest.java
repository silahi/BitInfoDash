package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.OHLCVT1mTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OHLCVT1mTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OHLCVT1m.class);
        OHLCVT1m oHLCVT1m1 = getOHLCVT1mSample1();
        OHLCVT1m oHLCVT1m2 = new OHLCVT1m();
        assertThat(oHLCVT1m1).isNotEqualTo(oHLCVT1m2);

        oHLCVT1m2.setId(oHLCVT1m1.getId());
        assertThat(oHLCVT1m1).isEqualTo(oHLCVT1m2);

        oHLCVT1m2 = getOHLCVT1mSample2();
        assertThat(oHLCVT1m1).isNotEqualTo(oHLCVT1m2);
    }
}
