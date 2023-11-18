package com.comonitech.bitinfodash.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.comonitech.bitinfodash.IntegrationTest;
import com.comonitech.bitinfodash.domain.MarketTrends;
import com.comonitech.bitinfodash.repository.MarketTrendsRepository;
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
 * Integration tests for the {@link MarketTrendsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MarketTrendsResourceIT {

    private static final String DEFAULT_TREND_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TREND_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_INDICATOR_VALUE = 1D;
    private static final Double UPDATED_INDICATOR_VALUE = 2D;

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_TREND_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TREND_TYPE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/market-trends";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MarketTrendsRepository marketTrendsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMarketTrendsMockMvc;

    private MarketTrends marketTrends;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MarketTrends createEntity(EntityManager em) {
        MarketTrends marketTrends = new MarketTrends()
            .trendName(DEFAULT_TREND_NAME)
            .indicatorValue(DEFAULT_INDICATOR_VALUE)
            .timestamp(DEFAULT_TIMESTAMP)
            .trendType(DEFAULT_TREND_TYPE);
        return marketTrends;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MarketTrends createUpdatedEntity(EntityManager em) {
        MarketTrends marketTrends = new MarketTrends()
            .trendName(UPDATED_TREND_NAME)
            .indicatorValue(UPDATED_INDICATOR_VALUE)
            .timestamp(UPDATED_TIMESTAMP)
            .trendType(UPDATED_TREND_TYPE);
        return marketTrends;
    }

    @BeforeEach
    public void initTest() {
        marketTrends = createEntity(em);
    }

    @Test
    @Transactional
    void createMarketTrends() throws Exception {
        int databaseSizeBeforeCreate = marketTrendsRepository.findAll().size();
        // Create the MarketTrends
        restMarketTrendsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(marketTrends)))
            .andExpect(status().isCreated());

        // Validate the MarketTrends in the database
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeCreate + 1);
        MarketTrends testMarketTrends = marketTrendsList.get(marketTrendsList.size() - 1);
        assertThat(testMarketTrends.getTrendName()).isEqualTo(DEFAULT_TREND_NAME);
        assertThat(testMarketTrends.getIndicatorValue()).isEqualTo(DEFAULT_INDICATOR_VALUE);
        assertThat(testMarketTrends.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testMarketTrends.getTrendType()).isEqualTo(DEFAULT_TREND_TYPE);
    }

    @Test
    @Transactional
    void createMarketTrendsWithExistingId() throws Exception {
        // Create the MarketTrends with an existing ID
        marketTrends.setId(1L);

        int databaseSizeBeforeCreate = marketTrendsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMarketTrendsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(marketTrends)))
            .andExpect(status().isBadRequest());

        // Validate the MarketTrends in the database
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMarketTrends() throws Exception {
        // Initialize the database
        marketTrendsRepository.saveAndFlush(marketTrends);

        // Get all the marketTrendsList
        restMarketTrendsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(marketTrends.getId().intValue())))
            .andExpect(jsonPath("$.[*].trendName").value(hasItem(DEFAULT_TREND_NAME)))
            .andExpect(jsonPath("$.[*].indicatorValue").value(hasItem(DEFAULT_INDICATOR_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].trendType").value(hasItem(DEFAULT_TREND_TYPE)));
    }

    @Test
    @Transactional
    void getMarketTrends() throws Exception {
        // Initialize the database
        marketTrendsRepository.saveAndFlush(marketTrends);

        // Get the marketTrends
        restMarketTrendsMockMvc
            .perform(get(ENTITY_API_URL_ID, marketTrends.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(marketTrends.getId().intValue()))
            .andExpect(jsonPath("$.trendName").value(DEFAULT_TREND_NAME))
            .andExpect(jsonPath("$.indicatorValue").value(DEFAULT_INDICATOR_VALUE.doubleValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.trendType").value(DEFAULT_TREND_TYPE));
    }

    @Test
    @Transactional
    void getNonExistingMarketTrends() throws Exception {
        // Get the marketTrends
        restMarketTrendsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingMarketTrends() throws Exception {
        // Initialize the database
        marketTrendsRepository.saveAndFlush(marketTrends);

        int databaseSizeBeforeUpdate = marketTrendsRepository.findAll().size();

        // Update the marketTrends
        MarketTrends updatedMarketTrends = marketTrendsRepository.findById(marketTrends.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedMarketTrends are not directly saved in db
        em.detach(updatedMarketTrends);
        updatedMarketTrends
            .trendName(UPDATED_TREND_NAME)
            .indicatorValue(UPDATED_INDICATOR_VALUE)
            .timestamp(UPDATED_TIMESTAMP)
            .trendType(UPDATED_TREND_TYPE);

        restMarketTrendsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMarketTrends.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMarketTrends))
            )
            .andExpect(status().isOk());

        // Validate the MarketTrends in the database
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeUpdate);
        MarketTrends testMarketTrends = marketTrendsList.get(marketTrendsList.size() - 1);
        assertThat(testMarketTrends.getTrendName()).isEqualTo(UPDATED_TREND_NAME);
        assertThat(testMarketTrends.getIndicatorValue()).isEqualTo(UPDATED_INDICATOR_VALUE);
        assertThat(testMarketTrends.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testMarketTrends.getTrendType()).isEqualTo(UPDATED_TREND_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingMarketTrends() throws Exception {
        int databaseSizeBeforeUpdate = marketTrendsRepository.findAll().size();
        marketTrends.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMarketTrendsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, marketTrends.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(marketTrends))
            )
            .andExpect(status().isBadRequest());

        // Validate the MarketTrends in the database
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMarketTrends() throws Exception {
        int databaseSizeBeforeUpdate = marketTrendsRepository.findAll().size();
        marketTrends.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMarketTrendsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(marketTrends))
            )
            .andExpect(status().isBadRequest());

        // Validate the MarketTrends in the database
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMarketTrends() throws Exception {
        int databaseSizeBeforeUpdate = marketTrendsRepository.findAll().size();
        marketTrends.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMarketTrendsMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(marketTrends)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MarketTrends in the database
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMarketTrendsWithPatch() throws Exception {
        // Initialize the database
        marketTrendsRepository.saveAndFlush(marketTrends);

        int databaseSizeBeforeUpdate = marketTrendsRepository.findAll().size();

        // Update the marketTrends using partial update
        MarketTrends partialUpdatedMarketTrends = new MarketTrends();
        partialUpdatedMarketTrends.setId(marketTrends.getId());

        partialUpdatedMarketTrends.trendName(UPDATED_TREND_NAME).indicatorValue(UPDATED_INDICATOR_VALUE).trendType(UPDATED_TREND_TYPE);

        restMarketTrendsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMarketTrends.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMarketTrends))
            )
            .andExpect(status().isOk());

        // Validate the MarketTrends in the database
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeUpdate);
        MarketTrends testMarketTrends = marketTrendsList.get(marketTrendsList.size() - 1);
        assertThat(testMarketTrends.getTrendName()).isEqualTo(UPDATED_TREND_NAME);
        assertThat(testMarketTrends.getIndicatorValue()).isEqualTo(UPDATED_INDICATOR_VALUE);
        assertThat(testMarketTrends.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testMarketTrends.getTrendType()).isEqualTo(UPDATED_TREND_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateMarketTrendsWithPatch() throws Exception {
        // Initialize the database
        marketTrendsRepository.saveAndFlush(marketTrends);

        int databaseSizeBeforeUpdate = marketTrendsRepository.findAll().size();

        // Update the marketTrends using partial update
        MarketTrends partialUpdatedMarketTrends = new MarketTrends();
        partialUpdatedMarketTrends.setId(marketTrends.getId());

        partialUpdatedMarketTrends
            .trendName(UPDATED_TREND_NAME)
            .indicatorValue(UPDATED_INDICATOR_VALUE)
            .timestamp(UPDATED_TIMESTAMP)
            .trendType(UPDATED_TREND_TYPE);

        restMarketTrendsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMarketTrends.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMarketTrends))
            )
            .andExpect(status().isOk());

        // Validate the MarketTrends in the database
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeUpdate);
        MarketTrends testMarketTrends = marketTrendsList.get(marketTrendsList.size() - 1);
        assertThat(testMarketTrends.getTrendName()).isEqualTo(UPDATED_TREND_NAME);
        assertThat(testMarketTrends.getIndicatorValue()).isEqualTo(UPDATED_INDICATOR_VALUE);
        assertThat(testMarketTrends.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testMarketTrends.getTrendType()).isEqualTo(UPDATED_TREND_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingMarketTrends() throws Exception {
        int databaseSizeBeforeUpdate = marketTrendsRepository.findAll().size();
        marketTrends.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMarketTrendsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, marketTrends.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(marketTrends))
            )
            .andExpect(status().isBadRequest());

        // Validate the MarketTrends in the database
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMarketTrends() throws Exception {
        int databaseSizeBeforeUpdate = marketTrendsRepository.findAll().size();
        marketTrends.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMarketTrendsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(marketTrends))
            )
            .andExpect(status().isBadRequest());

        // Validate the MarketTrends in the database
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMarketTrends() throws Exception {
        int databaseSizeBeforeUpdate = marketTrendsRepository.findAll().size();
        marketTrends.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMarketTrendsMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(marketTrends))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MarketTrends in the database
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMarketTrends() throws Exception {
        // Initialize the database
        marketTrendsRepository.saveAndFlush(marketTrends);

        int databaseSizeBeforeDelete = marketTrendsRepository.findAll().size();

        // Delete the marketTrends
        restMarketTrendsMockMvc
            .perform(delete(ENTITY_API_URL_ID, marketTrends.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MarketTrends> marketTrendsList = marketTrendsRepository.findAll();
        assertThat(marketTrendsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
