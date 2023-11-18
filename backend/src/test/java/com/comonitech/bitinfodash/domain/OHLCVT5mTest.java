package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.OHLCVT5mTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OHLCVT5mTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OHLCVT5m.class);
        OHLCVT5m oHLCVT5m1 = getOHLCVT5mSample1();
        OHLCVT5m oHLCVT5m2 = new OHLCVT5m();
        assertThat(oHLCVT5m1).isNotEqualTo(oHLCVT5m2);

        oHLCVT5m2.setId(oHLCVT5m1.getId());
        assertThat(oHLCVT5m1).isEqualTo(oHLCVT5m2);

        oHLCVT5m2 = getOHLCVT5mSample2();
        assertThat(oHLCVT5m1).isNotEqualTo(oHLCVT5m2);
    }
}
