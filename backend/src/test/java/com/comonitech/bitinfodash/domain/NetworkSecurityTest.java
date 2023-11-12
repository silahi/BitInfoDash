package com.comonitech.bitinfodash.domain;

import static com.comonitech.bitinfodash.domain.NetworkSecurityTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.comonitech.bitinfodash.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NetworkSecurityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NetworkSecurity.class);
        NetworkSecurity networkSecurity1 = getNetworkSecuritySample1();
        NetworkSecurity networkSecurity2 = new NetworkSecurity();
        assertThat(networkSecurity1).isNotEqualTo(networkSecurity2);

        networkSecurity2.setId(networkSecurity1.getId());
        assertThat(networkSecurity1).isEqualTo(networkSecurity2);

        networkSecurity2 = getNetworkSecuritySample2();
        assertThat(networkSecurity1).isNotEqualTo(networkSecurity2);
    }
}
