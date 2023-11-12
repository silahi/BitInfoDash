package com.comonitech.bitinfodash.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.comonitech.bitinfodash.IntegrationTest;
import com.comonitech.bitinfodash.domain.NetworkSecurity;
import com.comonitech.bitinfodash.repository.NetworkSecurityRepository;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link NetworkSecurityResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class NetworkSecurityResourceIT {

    private static final String DEFAULT_ALERT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_ALERT_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_SEVERITY = "AAAAAAAAAA";
    private static final String UPDATED_SEVERITY = "BBBBBBBBBB";

    private static final String DEFAULT_RESOLUTION = "AAAAAAAAAA";
    private static final String UPDATED_RESOLUTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/network-securities";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NetworkSecurityRepository networkSecurityRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNetworkSecurityMockMvc;

    private NetworkSecurity networkSecurity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NetworkSecurity createEntity(EntityManager em) {
        NetworkSecurity networkSecurity = new NetworkSecurity()
            .alertType(DEFAULT_ALERT_TYPE)
            .description(DEFAULT_DESCRIPTION)
            .timestamp(DEFAULT_TIMESTAMP)
            .severity(DEFAULT_SEVERITY)
            .resolution(DEFAULT_RESOLUTION);
        return networkSecurity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NetworkSecurity createUpdatedEntity(EntityManager em) {
        NetworkSecurity networkSecurity = new NetworkSecurity()
            .alertType(UPDATED_ALERT_TYPE)
            .description(UPDATED_DESCRIPTION)
            .timestamp(UPDATED_TIMESTAMP)
            .severity(UPDATED_SEVERITY)
            .resolution(UPDATED_RESOLUTION);
        return networkSecurity;
    }

    @BeforeEach
    public void initTest() {
        networkSecurity = createEntity(em);
    }

    @Test
    @Transactional
    void createNetworkSecurity() throws Exception {
        int databaseSizeBeforeCreate = networkSecurityRepository.findAll().size();
        // Create the NetworkSecurity
        restNetworkSecurityMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(networkSecurity))
            )
            .andExpect(status().isCreated());

        // Validate the NetworkSecurity in the database
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeCreate + 1);
        NetworkSecurity testNetworkSecurity = networkSecurityList.get(networkSecurityList.size() - 1);
        assertThat(testNetworkSecurity.getAlertType()).isEqualTo(DEFAULT_ALERT_TYPE);
        assertThat(testNetworkSecurity.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testNetworkSecurity.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testNetworkSecurity.getSeverity()).isEqualTo(DEFAULT_SEVERITY);
        assertThat(testNetworkSecurity.getResolution()).isEqualTo(DEFAULT_RESOLUTION);
    }

    @Test
    @Transactional
    void createNetworkSecurityWithExistingId() throws Exception {
        // Create the NetworkSecurity with an existing ID
        networkSecurity.setId(1L);

        int databaseSizeBeforeCreate = networkSecurityRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNetworkSecurityMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(networkSecurity))
            )
            .andExpect(status().isBadRequest());

        // Validate the NetworkSecurity in the database
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllNetworkSecurities() throws Exception {
        // Initialize the database
        networkSecurityRepository.saveAndFlush(networkSecurity);

        // Get all the networkSecurityList
        restNetworkSecurityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(networkSecurity.getId().intValue())))
            .andExpect(jsonPath("$.[*].alertType").value(hasItem(DEFAULT_ALERT_TYPE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].severity").value(hasItem(DEFAULT_SEVERITY)))
            .andExpect(jsonPath("$.[*].resolution").value(hasItem(DEFAULT_RESOLUTION)));
    }

    @Test
    @Transactional
    void getNetworkSecurity() throws Exception {
        // Initialize the database
        networkSecurityRepository.saveAndFlush(networkSecurity);

        // Get the networkSecurity
        restNetworkSecurityMockMvc
            .perform(get(ENTITY_API_URL_ID, networkSecurity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(networkSecurity.getId().intValue()))
            .andExpect(jsonPath("$.alertType").value(DEFAULT_ALERT_TYPE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.severity").value(DEFAULT_SEVERITY))
            .andExpect(jsonPath("$.resolution").value(DEFAULT_RESOLUTION));
    }

    @Test
    @Transactional
    void getNonExistingNetworkSecurity() throws Exception {
        // Get the networkSecurity
        restNetworkSecurityMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingNetworkSecurity() throws Exception {
        // Initialize the database
        networkSecurityRepository.saveAndFlush(networkSecurity);

        int databaseSizeBeforeUpdate = networkSecurityRepository.findAll().size();

        // Update the networkSecurity
        NetworkSecurity updatedNetworkSecurity = networkSecurityRepository.findById(networkSecurity.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedNetworkSecurity are not directly saved in db
        em.detach(updatedNetworkSecurity);
        updatedNetworkSecurity
            .alertType(UPDATED_ALERT_TYPE)
            .description(UPDATED_DESCRIPTION)
            .timestamp(UPDATED_TIMESTAMP)
            .severity(UPDATED_SEVERITY)
            .resolution(UPDATED_RESOLUTION);

        restNetworkSecurityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNetworkSecurity.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedNetworkSecurity))
            )
            .andExpect(status().isOk());

        // Validate the NetworkSecurity in the database
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeUpdate);
        NetworkSecurity testNetworkSecurity = networkSecurityList.get(networkSecurityList.size() - 1);
        assertThat(testNetworkSecurity.getAlertType()).isEqualTo(UPDATED_ALERT_TYPE);
        assertThat(testNetworkSecurity.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNetworkSecurity.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testNetworkSecurity.getSeverity()).isEqualTo(UPDATED_SEVERITY);
        assertThat(testNetworkSecurity.getResolution()).isEqualTo(UPDATED_RESOLUTION);
    }

    @Test
    @Transactional
    void putNonExistingNetworkSecurity() throws Exception {
        int databaseSizeBeforeUpdate = networkSecurityRepository.findAll().size();
        networkSecurity.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNetworkSecurityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, networkSecurity.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(networkSecurity))
            )
            .andExpect(status().isBadRequest());

        // Validate the NetworkSecurity in the database
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNetworkSecurity() throws Exception {
        int databaseSizeBeforeUpdate = networkSecurityRepository.findAll().size();
        networkSecurity.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNetworkSecurityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(networkSecurity))
            )
            .andExpect(status().isBadRequest());

        // Validate the NetworkSecurity in the database
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNetworkSecurity() throws Exception {
        int databaseSizeBeforeUpdate = networkSecurityRepository.findAll().size();
        networkSecurity.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNetworkSecurityMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(networkSecurity))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the NetworkSecurity in the database
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNetworkSecurityWithPatch() throws Exception {
        // Initialize the database
        networkSecurityRepository.saveAndFlush(networkSecurity);

        int databaseSizeBeforeUpdate = networkSecurityRepository.findAll().size();

        // Update the networkSecurity using partial update
        NetworkSecurity partialUpdatedNetworkSecurity = new NetworkSecurity();
        partialUpdatedNetworkSecurity.setId(networkSecurity.getId());

        partialUpdatedNetworkSecurity.severity(UPDATED_SEVERITY).resolution(UPDATED_RESOLUTION);

        restNetworkSecurityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNetworkSecurity.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNetworkSecurity))
            )
            .andExpect(status().isOk());

        // Validate the NetworkSecurity in the database
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeUpdate);
        NetworkSecurity testNetworkSecurity = networkSecurityList.get(networkSecurityList.size() - 1);
        assertThat(testNetworkSecurity.getAlertType()).isEqualTo(DEFAULT_ALERT_TYPE);
        assertThat(testNetworkSecurity.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testNetworkSecurity.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testNetworkSecurity.getSeverity()).isEqualTo(UPDATED_SEVERITY);
        assertThat(testNetworkSecurity.getResolution()).isEqualTo(UPDATED_RESOLUTION);
    }

    @Test
    @Transactional
    void fullUpdateNetworkSecurityWithPatch() throws Exception {
        // Initialize the database
        networkSecurityRepository.saveAndFlush(networkSecurity);

        int databaseSizeBeforeUpdate = networkSecurityRepository.findAll().size();

        // Update the networkSecurity using partial update
        NetworkSecurity partialUpdatedNetworkSecurity = new NetworkSecurity();
        partialUpdatedNetworkSecurity.setId(networkSecurity.getId());

        partialUpdatedNetworkSecurity
            .alertType(UPDATED_ALERT_TYPE)
            .description(UPDATED_DESCRIPTION)
            .timestamp(UPDATED_TIMESTAMP)
            .severity(UPDATED_SEVERITY)
            .resolution(UPDATED_RESOLUTION);

        restNetworkSecurityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNetworkSecurity.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNetworkSecurity))
            )
            .andExpect(status().isOk());

        // Validate the NetworkSecurity in the database
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeUpdate);
        NetworkSecurity testNetworkSecurity = networkSecurityList.get(networkSecurityList.size() - 1);
        assertThat(testNetworkSecurity.getAlertType()).isEqualTo(UPDATED_ALERT_TYPE);
        assertThat(testNetworkSecurity.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNetworkSecurity.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testNetworkSecurity.getSeverity()).isEqualTo(UPDATED_SEVERITY);
        assertThat(testNetworkSecurity.getResolution()).isEqualTo(UPDATED_RESOLUTION);
    }

    @Test
    @Transactional
    void patchNonExistingNetworkSecurity() throws Exception {
        int databaseSizeBeforeUpdate = networkSecurityRepository.findAll().size();
        networkSecurity.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNetworkSecurityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, networkSecurity.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(networkSecurity))
            )
            .andExpect(status().isBadRequest());

        // Validate the NetworkSecurity in the database
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNetworkSecurity() throws Exception {
        int databaseSizeBeforeUpdate = networkSecurityRepository.findAll().size();
        networkSecurity.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNetworkSecurityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(networkSecurity))
            )
            .andExpect(status().isBadRequest());

        // Validate the NetworkSecurity in the database
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNetworkSecurity() throws Exception {
        int databaseSizeBeforeUpdate = networkSecurityRepository.findAll().size();
        networkSecurity.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNetworkSecurityMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(networkSecurity))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the NetworkSecurity in the database
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNetworkSecurity() throws Exception {
        // Initialize the database
        networkSecurityRepository.saveAndFlush(networkSecurity);

        int databaseSizeBeforeDelete = networkSecurityRepository.findAll().size();

        // Delete the networkSecurity
        restNetworkSecurityMockMvc
            .perform(delete(ENTITY_API_URL_ID, networkSecurity.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NetworkSecurity> networkSecurityList = networkSecurityRepository.findAll();
        assertThat(networkSecurityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
