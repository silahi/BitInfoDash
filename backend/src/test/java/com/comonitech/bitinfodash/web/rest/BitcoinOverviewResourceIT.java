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

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CURRENCY = "AAAAAAAAAA";
    private static final String UPDATED_CURRENCY = "BBBBBBBBBB";

    private static final Double DEFAULT_VOLUME_CHANGE_24_H = 1D;
    private static final Double UPDATED_VOLUME_CHANGE_24_H = 2D;

    private static final Double DEFAULT_PERCENT_CHANGE_1_H = 1D;
    private static final Double UPDATED_PERCENT_CHANGE_1_H = 2D;

    private static final Double DEFAULT_PERCENT_CHANGE_24_H = 1D;
    private static final Double UPDATED_PERCENT_CHANGE_24_H = 2D;

    private static final Double DEFAULT_PERCENT_CHANGE_7_D = 1D;
    private static final Double UPDATED_PERCENT_CHANGE_7_D = 2D;

    private static final Double DEFAULT_PERCENT_CHANGE_30_D = 1D;
    private static final Double UPDATED_PERCENT_CHANGE_30_D = 2D;

    private static final Double DEFAULT_PERCENT_CHANGE_60_D = 1D;
    private static final Double UPDATED_PERCENT_CHANGE_60_D = 2D;

    private static final Double DEFAULT_PERCENT_CHANGE_90_D = 1D;
    private static final Double UPDATED_PERCENT_CHANGE_90_D = 2D;

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
            .timestamp(DEFAULT_TIMESTAMP)
            .currency(DEFAULT_CURRENCY)
            .volumeChange24h(DEFAULT_VOLUME_CHANGE_24_H)
            .percentChange1h(DEFAULT_PERCENT_CHANGE_1_H)
            .percentChange24h(DEFAULT_PERCENT_CHANGE_24_H)
            .percentChange7d(DEFAULT_PERCENT_CHANGE_7_D)
            .percentChange30d(DEFAULT_PERCENT_CHANGE_30_D)
            .percentChange60d(DEFAULT_PERCENT_CHANGE_60_D)
            .percentChange90d(DEFAULT_PERCENT_CHANGE_90_D);
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
            .timestamp(UPDATED_TIMESTAMP)
            .currency(UPDATED_CURRENCY)
            .volumeChange24h(UPDATED_VOLUME_CHANGE_24_H)
            .percentChange1h(UPDATED_PERCENT_CHANGE_1_H)
            .percentChange24h(UPDATED_PERCENT_CHANGE_24_H)
            .percentChange7d(UPDATED_PERCENT_CHANGE_7_D)
            .percentChange30d(UPDATED_PERCENT_CHANGE_30_D)
            .percentChange60d(UPDATED_PERCENT_CHANGE_60_D)
            .percentChange90d(UPDATED_PERCENT_CHANGE_90_D);
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
        assertThat(testBitcoinOverview.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testBitcoinOverview.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
        assertThat(testBitcoinOverview.getVolumeChange24h()).isEqualTo(DEFAULT_VOLUME_CHANGE_24_H);
        assertThat(testBitcoinOverview.getPercentChange1h()).isEqualTo(DEFAULT_PERCENT_CHANGE_1_H);
        assertThat(testBitcoinOverview.getPercentChange24h()).isEqualTo(DEFAULT_PERCENT_CHANGE_24_H);
        assertThat(testBitcoinOverview.getPercentChange7d()).isEqualTo(DEFAULT_PERCENT_CHANGE_7_D);
        assertThat(testBitcoinOverview.getPercentChange30d()).isEqualTo(DEFAULT_PERCENT_CHANGE_30_D);
        assertThat(testBitcoinOverview.getPercentChange60d()).isEqualTo(DEFAULT_PERCENT_CHANGE_60_D);
        assertThat(testBitcoinOverview.getPercentChange90d()).isEqualTo(DEFAULT_PERCENT_CHANGE_90_D);
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
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY)))
            .andExpect(jsonPath("$.[*].volumeChange24h").value(hasItem(DEFAULT_VOLUME_CHANGE_24_H.doubleValue())))
            .andExpect(jsonPath("$.[*].percentChange1h").value(hasItem(DEFAULT_PERCENT_CHANGE_1_H.doubleValue())))
            .andExpect(jsonPath("$.[*].percentChange24h").value(hasItem(DEFAULT_PERCENT_CHANGE_24_H.doubleValue())))
            .andExpect(jsonPath("$.[*].percentChange7d").value(hasItem(DEFAULT_PERCENT_CHANGE_7_D.doubleValue())))
            .andExpect(jsonPath("$.[*].percentChange30d").value(hasItem(DEFAULT_PERCENT_CHANGE_30_D.doubleValue())))
            .andExpect(jsonPath("$.[*].percentChange60d").value(hasItem(DEFAULT_PERCENT_CHANGE_60_D.doubleValue())))
            .andExpect(jsonPath("$.[*].percentChange90d").value(hasItem(DEFAULT_PERCENT_CHANGE_90_D.doubleValue())));
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
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY))
            .andExpect(jsonPath("$.volumeChange24h").value(DEFAULT_VOLUME_CHANGE_24_H.doubleValue()))
            .andExpect(jsonPath("$.percentChange1h").value(DEFAULT_PERCENT_CHANGE_1_H.doubleValue()))
            .andExpect(jsonPath("$.percentChange24h").value(DEFAULT_PERCENT_CHANGE_24_H.doubleValue()))
            .andExpect(jsonPath("$.percentChange7d").value(DEFAULT_PERCENT_CHANGE_7_D.doubleValue()))
            .andExpect(jsonPath("$.percentChange30d").value(DEFAULT_PERCENT_CHANGE_30_D.doubleValue()))
            .andExpect(jsonPath("$.percentChange60d").value(DEFAULT_PERCENT_CHANGE_60_D.doubleValue()))
            .andExpect(jsonPath("$.percentChange90d").value(DEFAULT_PERCENT_CHANGE_90_D.doubleValue()));
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
            .timestamp(UPDATED_TIMESTAMP)
            .currency(UPDATED_CURRENCY)
            .volumeChange24h(UPDATED_VOLUME_CHANGE_24_H)
            .percentChange1h(UPDATED_PERCENT_CHANGE_1_H)
            .percentChange24h(UPDATED_PERCENT_CHANGE_24_H)
            .percentChange7d(UPDATED_PERCENT_CHANGE_7_D)
            .percentChange30d(UPDATED_PERCENT_CHANGE_30_D)
            .percentChange60d(UPDATED_PERCENT_CHANGE_60_D)
            .percentChange90d(UPDATED_PERCENT_CHANGE_90_D);

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
        assertThat(testBitcoinOverview.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testBitcoinOverview.getCurrency()).isEqualTo(UPDATED_CURRENCY);
        assertThat(testBitcoinOverview.getVolumeChange24h()).isEqualTo(UPDATED_VOLUME_CHANGE_24_H);
        assertThat(testBitcoinOverview.getPercentChange1h()).isEqualTo(UPDATED_PERCENT_CHANGE_1_H);
        assertThat(testBitcoinOverview.getPercentChange24h()).isEqualTo(UPDATED_PERCENT_CHANGE_24_H);
        assertThat(testBitcoinOverview.getPercentChange7d()).isEqualTo(UPDATED_PERCENT_CHANGE_7_D);
        assertThat(testBitcoinOverview.getPercentChange30d()).isEqualTo(UPDATED_PERCENT_CHANGE_30_D);
        assertThat(testBitcoinOverview.getPercentChange60d()).isEqualTo(UPDATED_PERCENT_CHANGE_60_D);
        assertThat(testBitcoinOverview.getPercentChange90d()).isEqualTo(UPDATED_PERCENT_CHANGE_90_D);
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

        partialUpdatedBitcoinOverview
            .marketCap(UPDATED_MARKET_CAP)
            .exchangeVolume(UPDATED_EXCHANGE_VOLUME)
            .volumeChange24h(UPDATED_VOLUME_CHANGE_24_H)
            .percentChange60d(UPDATED_PERCENT_CHANGE_60_D)
            .percentChange90d(UPDATED_PERCENT_CHANGE_90_D);

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
        assertThat(testBitcoinOverview.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testBitcoinOverview.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
        assertThat(testBitcoinOverview.getVolumeChange24h()).isEqualTo(UPDATED_VOLUME_CHANGE_24_H);
        assertThat(testBitcoinOverview.getPercentChange1h()).isEqualTo(DEFAULT_PERCENT_CHANGE_1_H);
        assertThat(testBitcoinOverview.getPercentChange24h()).isEqualTo(DEFAULT_PERCENT_CHANGE_24_H);
        assertThat(testBitcoinOverview.getPercentChange7d()).isEqualTo(DEFAULT_PERCENT_CHANGE_7_D);
        assertThat(testBitcoinOverview.getPercentChange30d()).isEqualTo(DEFAULT_PERCENT_CHANGE_30_D);
        assertThat(testBitcoinOverview.getPercentChange60d()).isEqualTo(UPDATED_PERCENT_CHANGE_60_D);
        assertThat(testBitcoinOverview.getPercentChange90d()).isEqualTo(UPDATED_PERCENT_CHANGE_90_D);
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
            .timestamp(UPDATED_TIMESTAMP)
            .currency(UPDATED_CURRENCY)
            .volumeChange24h(UPDATED_VOLUME_CHANGE_24_H)
            .percentChange1h(UPDATED_PERCENT_CHANGE_1_H)
            .percentChange24h(UPDATED_PERCENT_CHANGE_24_H)
            .percentChange7d(UPDATED_PERCENT_CHANGE_7_D)
            .percentChange30d(UPDATED_PERCENT_CHANGE_30_D)
            .percentChange60d(UPDATED_PERCENT_CHANGE_60_D)
            .percentChange90d(UPDATED_PERCENT_CHANGE_90_D);

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
        assertThat(testBitcoinOverview.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testBitcoinOverview.getCurrency()).isEqualTo(UPDATED_CURRENCY);
        assertThat(testBitcoinOverview.getVolumeChange24h()).isEqualTo(UPDATED_VOLUME_CHANGE_24_H);
        assertThat(testBitcoinOverview.getPercentChange1h()).isEqualTo(UPDATED_PERCENT_CHANGE_1_H);
        assertThat(testBitcoinOverview.getPercentChange24h()).isEqualTo(UPDATED_PERCENT_CHANGE_24_H);
        assertThat(testBitcoinOverview.getPercentChange7d()).isEqualTo(UPDATED_PERCENT_CHANGE_7_D);
        assertThat(testBitcoinOverview.getPercentChange30d()).isEqualTo(UPDATED_PERCENT_CHANGE_30_D);
        assertThat(testBitcoinOverview.getPercentChange60d()).isEqualTo(UPDATED_PERCENT_CHANGE_60_D);
        assertThat(testBitcoinOverview.getPercentChange90d()).isEqualTo(UPDATED_PERCENT_CHANGE_90_D);
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
