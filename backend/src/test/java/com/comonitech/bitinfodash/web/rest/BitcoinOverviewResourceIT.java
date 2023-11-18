package com.comonitech.bitinfodash.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.comonitech.bitinfodash.IntegrationTest;
import com.comonitech.bitinfodash.domain.BitcoinOverview;
import com.comonitech.bitinfodash.repository.BitcoinOverviewRepository;
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
 * Integration tests for the {@link BitcoinOverviewResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BitcoinOverviewResourceIT {

    private static final Double DEFAULT_BITCOIN_PRICE = 1D;
    private static final Double UPDATED_BITCOIN_PRICE = 2D;

    private static final Double DEFAULT_MARKET_CAP = 1D;
    private static final Double UPDATED_MARKET_CAP = 2D;

    private static final Double DEFAULT_EXCHANGE_VOLUME = 1D;
    private static final Double UPDATED_EXCHANGE_VOLUME = 2D;

    private static final Double DEFAULT_RECENT_VARIATION = 1D;
    private static final Double UPDATED_RECENT_VARIATION = 2D;

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CURRENCY = "AAAAAAAAAA";
    private static final String UPDATED_CURRENCY = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/bitcoin-overviews";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BitcoinOverviewRepository bitcoinOverviewRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBitcoinOverviewMockMvc;

    private BitcoinOverview bitcoinOverview;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BitcoinOverview createEntity(EntityManager em) {
        BitcoinOverview bitcoinOverview = new BitcoinOverview()
            .bitcoinPrice(DEFAULT_BITCOIN_PRICE)
            .marketCap(DEFAULT_MARKET_CAP)
            .exchangeVolume(DEFAULT_EXCHANGE_VOLUME)
            .recentVariation(DEFAULT_RECENT_VARIATION)
            .timestamp(DEFAULT_TIMESTAMP)
            .currency(DEFAULT_CURRENCY);
        return bitcoinOverview;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BitcoinOverview createUpdatedEntity(EntityManager em) {
        BitcoinOverview bitcoinOverview = new BitcoinOverview()
            .bitcoinPrice(UPDATED_BITCOIN_PRICE)
            .marketCap(UPDATED_MARKET_CAP)
            .exchangeVolume(UPDATED_EXCHANGE_VOLUME)
            .recentVariation(UPDATED_RECENT_VARIATION)
            .timestamp(UPDATED_TIMESTAMP)
            .currency(UPDATED_CURRENCY);
        return bitcoinOverview;
    }

    @BeforeEach
    public void initTest() {
        bitcoinOverview = createEntity(em);
    }

    @Test
    @Transactional
    void createBitcoinOverview() throws Exception {
        int databaseSizeBeforeCreate = bitcoinOverviewRepository.findAll().size();
        // Create the BitcoinOverview
        restBitcoinOverviewMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bitcoinOverview))
            )
            .andExpect(status().isCreated());

        // Validate the BitcoinOverview in the database
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeCreate + 1);
        BitcoinOverview testBitcoinOverview = bitcoinOverviewList.get(bitcoinOverviewList.size() - 1);
        assertThat(testBitcoinOverview.getBitcoinPrice()).isEqualTo(DEFAULT_BITCOIN_PRICE);
        assertThat(testBitcoinOverview.getMarketCap()).isEqualTo(DEFAULT_MARKET_CAP);
        assertThat(testBitcoinOverview.getExchangeVolume()).isEqualTo(DEFAULT_EXCHANGE_VOLUME);
        assertThat(testBitcoinOverview.getRecentVariation()).isEqualTo(DEFAULT_RECENT_VARIATION);
        assertThat(testBitcoinOverview.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testBitcoinOverview.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
    }

    @Test
    @Transactional
    void createBitcoinOverviewWithExistingId() throws Exception {
        // Create the BitcoinOverview with an existing ID
        bitcoinOverview.setId(1L);

        int databaseSizeBeforeCreate = bitcoinOverviewRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBitcoinOverviewMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bitcoinOverview))
            )
            .andExpect(status().isBadRequest());

        // Validate the BitcoinOverview in the database
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBitcoinOverviews() throws Exception {
        // Initialize the database
        bitcoinOverviewRepository.saveAndFlush(bitcoinOverview);

        // Get all the bitcoinOverviewList
        restBitcoinOverviewMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bitcoinOverview.getId().intValue())))
            .andExpect(jsonPath("$.[*].bitcoinPrice").value(hasItem(DEFAULT_BITCOIN_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].marketCap").value(hasItem(DEFAULT_MARKET_CAP.doubleValue())))
            .andExpect(jsonPath("$.[*].exchangeVolume").value(hasItem(DEFAULT_EXCHANGE_VOLUME.doubleValue())))
            .andExpect(jsonPath("$.[*].recentVariation").value(hasItem(DEFAULT_RECENT_VARIATION.doubleValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY)));
    }

    @Test
    @Transactional
    void getBitcoinOverview() throws Exception {
        // Initialize the database
        bitcoinOverviewRepository.saveAndFlush(bitcoinOverview);

        // Get the bitcoinOverview
        restBitcoinOverviewMockMvc
            .perform(get(ENTITY_API_URL_ID, bitcoinOverview.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bitcoinOverview.getId().intValue()))
            .andExpect(jsonPath("$.bitcoinPrice").value(DEFAULT_BITCOIN_PRICE.doubleValue()))
            .andExpect(jsonPath("$.marketCap").value(DEFAULT_MARKET_CAP.doubleValue()))
            .andExpect(jsonPath("$.exchangeVolume").value(DEFAULT_EXCHANGE_VOLUME.doubleValue()))
            .andExpect(jsonPath("$.recentVariation").value(DEFAULT_RECENT_VARIATION.doubleValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY));
    }

    @Test
    @Transactional
    void getNonExistingBitcoinOverview() throws Exception {
        // Get the bitcoinOverview
        restBitcoinOverviewMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBitcoinOverview() throws Exception {
        // Initialize the database
        bitcoinOverviewRepository.saveAndFlush(bitcoinOverview);

        int databaseSizeBeforeUpdate = bitcoinOverviewRepository.findAll().size();

        // Update the bitcoinOverview
        BitcoinOverview updatedBitcoinOverview = bitcoinOverviewRepository.findById(bitcoinOverview.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedBitcoinOverview are not directly saved in db
        em.detach(updatedBitcoinOverview);
        updatedBitcoinOverview
            .bitcoinPrice(UPDATED_BITCOIN_PRICE)
            .marketCap(UPDATED_MARKET_CAP)
            .exchangeVolume(UPDATED_EXCHANGE_VOLUME)
            .recentVariation(UPDATED_RECENT_VARIATION)
            .timestamp(UPDATED_TIMESTAMP)
            .currency(UPDATED_CURRENCY);

        restBitcoinOverviewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBitcoinOverview.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBitcoinOverview))
            )
            .andExpect(status().isOk());

        // Validate the BitcoinOverview in the database
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeUpdate);
        BitcoinOverview testBitcoinOverview = bitcoinOverviewList.get(bitcoinOverviewList.size() - 1);
        assertThat(testBitcoinOverview.getBitcoinPrice()).isEqualTo(UPDATED_BITCOIN_PRICE);
        assertThat(testBitcoinOverview.getMarketCap()).isEqualTo(UPDATED_MARKET_CAP);
        assertThat(testBitcoinOverview.getExchangeVolume()).isEqualTo(UPDATED_EXCHANGE_VOLUME);
        assertThat(testBitcoinOverview.getRecentVariation()).isEqualTo(UPDATED_RECENT_VARIATION);
        assertThat(testBitcoinOverview.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testBitcoinOverview.getCurrency()).isEqualTo(UPDATED_CURRENCY);
    }

    @Test
    @Transactional
    void putNonExistingBitcoinOverview() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinOverviewRepository.findAll().size();
        bitcoinOverview.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBitcoinOverviewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bitcoinOverview.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(bitcoinOverview))
            )
            .andExpect(status().isBadRequest());

        // Validate the BitcoinOverview in the database
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBitcoinOverview() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinOverviewRepository.findAll().size();
        bitcoinOverview.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBitcoinOverviewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(bitcoinOverview))
            )
            .andExpect(status().isBadRequest());

        // Validate the BitcoinOverview in the database
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBitcoinOverview() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinOverviewRepository.findAll().size();
        bitcoinOverview.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBitcoinOverviewMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bitcoinOverview))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the BitcoinOverview in the database
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBitcoinOverviewWithPatch() throws Exception {
        // Initialize the database
        bitcoinOverviewRepository.saveAndFlush(bitcoinOverview);

        int databaseSizeBeforeUpdate = bitcoinOverviewRepository.findAll().size();

        // Update the bitcoinOverview using partial update
        BitcoinOverview partialUpdatedBitcoinOverview = new BitcoinOverview();
        partialUpdatedBitcoinOverview.setId(bitcoinOverview.getId());

        partialUpdatedBitcoinOverview.marketCap(UPDATED_MARKET_CAP).exchangeVolume(UPDATED_EXCHANGE_VOLUME).currency(UPDATED_CURRENCY);

        restBitcoinOverviewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBitcoinOverview.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBitcoinOverview))
            )
            .andExpect(status().isOk());

        // Validate the BitcoinOverview in the database
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeUpdate);
        BitcoinOverview testBitcoinOverview = bitcoinOverviewList.get(bitcoinOverviewList.size() - 1);
        assertThat(testBitcoinOverview.getBitcoinPrice()).isEqualTo(DEFAULT_BITCOIN_PRICE);
        assertThat(testBitcoinOverview.getMarketCap()).isEqualTo(UPDATED_MARKET_CAP);
        assertThat(testBitcoinOverview.getExchangeVolume()).isEqualTo(UPDATED_EXCHANGE_VOLUME);
        assertThat(testBitcoinOverview.getRecentVariation()).isEqualTo(DEFAULT_RECENT_VARIATION);
        assertThat(testBitcoinOverview.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testBitcoinOverview.getCurrency()).isEqualTo(UPDATED_CURRENCY);
    }

    @Test
    @Transactional
    void fullUpdateBitcoinOverviewWithPatch() throws Exception {
        // Initialize the database
        bitcoinOverviewRepository.saveAndFlush(bitcoinOverview);

        int databaseSizeBeforeUpdate = bitcoinOverviewRepository.findAll().size();

        // Update the bitcoinOverview using partial update
        BitcoinOverview partialUpdatedBitcoinOverview = new BitcoinOverview();
        partialUpdatedBitcoinOverview.setId(bitcoinOverview.getId());

        partialUpdatedBitcoinOverview
            .bitcoinPrice(UPDATED_BITCOIN_PRICE)
            .marketCap(UPDATED_MARKET_CAP)
            .exchangeVolume(UPDATED_EXCHANGE_VOLUME)
            .recentVariation(UPDATED_RECENT_VARIATION)
            .timestamp(UPDATED_TIMESTAMP)
            .currency(UPDATED_CURRENCY);

        restBitcoinOverviewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBitcoinOverview.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBitcoinOverview))
            )
            .andExpect(status().isOk());

        // Validate the BitcoinOverview in the database
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeUpdate);
        BitcoinOverview testBitcoinOverview = bitcoinOverviewList.get(bitcoinOverviewList.size() - 1);
        assertThat(testBitcoinOverview.getBitcoinPrice()).isEqualTo(UPDATED_BITCOIN_PRICE);
        assertThat(testBitcoinOverview.getMarketCap()).isEqualTo(UPDATED_MARKET_CAP);
        assertThat(testBitcoinOverview.getExchangeVolume()).isEqualTo(UPDATED_EXCHANGE_VOLUME);
        assertThat(testBitcoinOverview.getRecentVariation()).isEqualTo(UPDATED_RECENT_VARIATION);
        assertThat(testBitcoinOverview.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testBitcoinOverview.getCurrency()).isEqualTo(UPDATED_CURRENCY);
    }

    @Test
    @Transactional
    void patchNonExistingBitcoinOverview() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinOverviewRepository.findAll().size();
        bitcoinOverview.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBitcoinOverviewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, bitcoinOverview.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(bitcoinOverview))
            )
            .andExpect(status().isBadRequest());

        // Validate the BitcoinOverview in the database
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBitcoinOverview() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinOverviewRepository.findAll().size();
        bitcoinOverview.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBitcoinOverviewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(bitcoinOverview))
            )
            .andExpect(status().isBadRequest());

        // Validate the BitcoinOverview in the database
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBitcoinOverview() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinOverviewRepository.findAll().size();
        bitcoinOverview.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBitcoinOverviewMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(bitcoinOverview))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the BitcoinOverview in the database
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBitcoinOverview() throws Exception {
        // Initialize the database
        bitcoinOverviewRepository.saveAndFlush(bitcoinOverview);

        int databaseSizeBeforeDelete = bitcoinOverviewRepository.findAll().size();

        // Delete the bitcoinOverview
        restBitcoinOverviewMockMvc
            .perform(delete(ENTITY_API_URL_ID, bitcoinOverview.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BitcoinOverview> bitcoinOverviewList = bitcoinOverviewRepository.findAll();
        assertThat(bitcoinOverviewList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
