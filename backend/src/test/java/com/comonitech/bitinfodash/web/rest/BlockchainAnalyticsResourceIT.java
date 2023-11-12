package com.comonitech.bitinfodash.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.comonitech.bitinfodash.IntegrationTest;
import com.comonitech.bitinfodash.domain.BlockchainAnalytics;
import com.comonitech.bitinfodash.repository.BlockchainAnalyticsRepository;
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
 * Integration tests for the {@link BlockchainAnalyticsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BlockchainAnalyticsResourceIT {

    private static final Integer DEFAULT_TRANSACTION_COUNT = 1;
    private static final Integer UPDATED_TRANSACTION_COUNT = 2;

    private static final Double DEFAULT_AVERAGE_TRANSACTION_FEE = 1D;
    private static final Double UPDATED_AVERAGE_TRANSACTION_FEE = 2D;

    private static final String DEFAULT_HASHRATE_DISTRIBUTION = "AAAAAAAAAA";
    private static final String UPDATED_HASHRATE_DISTRIBUTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_DIFFICULTY = 1D;
    private static final Double UPDATED_DIFFICULTY = 2D;

    private static final Double DEFAULT_NETWORK_HASHRATE = 1D;
    private static final Double UPDATED_NETWORK_HASHRATE = 2D;

    private static final String ENTITY_API_URL = "/api/blockchain-analytics";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BlockchainAnalyticsRepository blockchainAnalyticsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBlockchainAnalyticsMockMvc;

    private BlockchainAnalytics blockchainAnalytics;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BlockchainAnalytics createEntity(EntityManager em) {
        BlockchainAnalytics blockchainAnalytics = new BlockchainAnalytics()
            .transactionCount(DEFAULT_TRANSACTION_COUNT)
            .averageTransactionFee(DEFAULT_AVERAGE_TRANSACTION_FEE)
            .hashrateDistribution(DEFAULT_HASHRATE_DISTRIBUTION)
            .timestamp(DEFAULT_TIMESTAMP)
            .difficulty(DEFAULT_DIFFICULTY)
            .networkHashrate(DEFAULT_NETWORK_HASHRATE);
        return blockchainAnalytics;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BlockchainAnalytics createUpdatedEntity(EntityManager em) {
        BlockchainAnalytics blockchainAnalytics = new BlockchainAnalytics()
            .transactionCount(UPDATED_TRANSACTION_COUNT)
            .averageTransactionFee(UPDATED_AVERAGE_TRANSACTION_FEE)
            .hashrateDistribution(UPDATED_HASHRATE_DISTRIBUTION)
            .timestamp(UPDATED_TIMESTAMP)
            .difficulty(UPDATED_DIFFICULTY)
            .networkHashrate(UPDATED_NETWORK_HASHRATE);
        return blockchainAnalytics;
    }

    @BeforeEach
    public void initTest() {
        blockchainAnalytics = createEntity(em);
    }

    @Test
    @Transactional
    void createBlockchainAnalytics() throws Exception {
        int databaseSizeBeforeCreate = blockchainAnalyticsRepository.findAll().size();
        // Create the BlockchainAnalytics
        restBlockchainAnalyticsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(blockchainAnalytics))
            )
            .andExpect(status().isCreated());

        // Validate the BlockchainAnalytics in the database
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeCreate + 1);
        BlockchainAnalytics testBlockchainAnalytics = blockchainAnalyticsList.get(blockchainAnalyticsList.size() - 1);
        assertThat(testBlockchainAnalytics.getTransactionCount()).isEqualTo(DEFAULT_TRANSACTION_COUNT);
        assertThat(testBlockchainAnalytics.getAverageTransactionFee()).isEqualTo(DEFAULT_AVERAGE_TRANSACTION_FEE);
        assertThat(testBlockchainAnalytics.getHashrateDistribution()).isEqualTo(DEFAULT_HASHRATE_DISTRIBUTION);
        assertThat(testBlockchainAnalytics.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testBlockchainAnalytics.getDifficulty()).isEqualTo(DEFAULT_DIFFICULTY);
        assertThat(testBlockchainAnalytics.getNetworkHashrate()).isEqualTo(DEFAULT_NETWORK_HASHRATE);
    }

    @Test
    @Transactional
    void createBlockchainAnalyticsWithExistingId() throws Exception {
        // Create the BlockchainAnalytics with an existing ID
        blockchainAnalytics.setId(1L);

        int databaseSizeBeforeCreate = blockchainAnalyticsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlockchainAnalyticsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(blockchainAnalytics))
            )
            .andExpect(status().isBadRequest());

        // Validate the BlockchainAnalytics in the database
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBlockchainAnalytics() throws Exception {
        // Initialize the database
        blockchainAnalyticsRepository.saveAndFlush(blockchainAnalytics);

        // Get all the blockchainAnalyticsList
        restBlockchainAnalyticsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(blockchainAnalytics.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionCount").value(hasItem(DEFAULT_TRANSACTION_COUNT)))
            .andExpect(jsonPath("$.[*].averageTransactionFee").value(hasItem(DEFAULT_AVERAGE_TRANSACTION_FEE.doubleValue())))
            .andExpect(jsonPath("$.[*].hashrateDistribution").value(hasItem(DEFAULT_HASHRATE_DISTRIBUTION)))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].difficulty").value(hasItem(DEFAULT_DIFFICULTY.doubleValue())))
            .andExpect(jsonPath("$.[*].networkHashrate").value(hasItem(DEFAULT_NETWORK_HASHRATE.doubleValue())));
    }

    @Test
    @Transactional
    void getBlockchainAnalytics() throws Exception {
        // Initialize the database
        blockchainAnalyticsRepository.saveAndFlush(blockchainAnalytics);

        // Get the blockchainAnalytics
        restBlockchainAnalyticsMockMvc
            .perform(get(ENTITY_API_URL_ID, blockchainAnalytics.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(blockchainAnalytics.getId().intValue()))
            .andExpect(jsonPath("$.transactionCount").value(DEFAULT_TRANSACTION_COUNT))
            .andExpect(jsonPath("$.averageTransactionFee").value(DEFAULT_AVERAGE_TRANSACTION_FEE.doubleValue()))
            .andExpect(jsonPath("$.hashrateDistribution").value(DEFAULT_HASHRATE_DISTRIBUTION))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.difficulty").value(DEFAULT_DIFFICULTY.doubleValue()))
            .andExpect(jsonPath("$.networkHashrate").value(DEFAULT_NETWORK_HASHRATE.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingBlockchainAnalytics() throws Exception {
        // Get the blockchainAnalytics
        restBlockchainAnalyticsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBlockchainAnalytics() throws Exception {
        // Initialize the database
        blockchainAnalyticsRepository.saveAndFlush(blockchainAnalytics);

        int databaseSizeBeforeUpdate = blockchainAnalyticsRepository.findAll().size();

        // Update the blockchainAnalytics
        BlockchainAnalytics updatedBlockchainAnalytics = blockchainAnalyticsRepository.findById(blockchainAnalytics.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedBlockchainAnalytics are not directly saved in db
        em.detach(updatedBlockchainAnalytics);
        updatedBlockchainAnalytics
            .transactionCount(UPDATED_TRANSACTION_COUNT)
            .averageTransactionFee(UPDATED_AVERAGE_TRANSACTION_FEE)
            .hashrateDistribution(UPDATED_HASHRATE_DISTRIBUTION)
            .timestamp(UPDATED_TIMESTAMP)
            .difficulty(UPDATED_DIFFICULTY)
            .networkHashrate(UPDATED_NETWORK_HASHRATE);

        restBlockchainAnalyticsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBlockchainAnalytics.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBlockchainAnalytics))
            )
            .andExpect(status().isOk());

        // Validate the BlockchainAnalytics in the database
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeUpdate);
        BlockchainAnalytics testBlockchainAnalytics = blockchainAnalyticsList.get(blockchainAnalyticsList.size() - 1);
        assertThat(testBlockchainAnalytics.getTransactionCount()).isEqualTo(UPDATED_TRANSACTION_COUNT);
        assertThat(testBlockchainAnalytics.getAverageTransactionFee()).isEqualTo(UPDATED_AVERAGE_TRANSACTION_FEE);
        assertThat(testBlockchainAnalytics.getHashrateDistribution()).isEqualTo(UPDATED_HASHRATE_DISTRIBUTION);
        assertThat(testBlockchainAnalytics.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testBlockchainAnalytics.getDifficulty()).isEqualTo(UPDATED_DIFFICULTY);
        assertThat(testBlockchainAnalytics.getNetworkHashrate()).isEqualTo(UPDATED_NETWORK_HASHRATE);
    }

    @Test
    @Transactional
    void putNonExistingBlockchainAnalytics() throws Exception {
        int databaseSizeBeforeUpdate = blockchainAnalyticsRepository.findAll().size();
        blockchainAnalytics.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBlockchainAnalyticsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, blockchainAnalytics.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(blockchainAnalytics))
            )
            .andExpect(status().isBadRequest());

        // Validate the BlockchainAnalytics in the database
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBlockchainAnalytics() throws Exception {
        int databaseSizeBeforeUpdate = blockchainAnalyticsRepository.findAll().size();
        blockchainAnalytics.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBlockchainAnalyticsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(blockchainAnalytics))
            )
            .andExpect(status().isBadRequest());

        // Validate the BlockchainAnalytics in the database
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBlockchainAnalytics() throws Exception {
        int databaseSizeBeforeUpdate = blockchainAnalyticsRepository.findAll().size();
        blockchainAnalytics.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBlockchainAnalyticsMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(blockchainAnalytics))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the BlockchainAnalytics in the database
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBlockchainAnalyticsWithPatch() throws Exception {
        // Initialize the database
        blockchainAnalyticsRepository.saveAndFlush(blockchainAnalytics);

        int databaseSizeBeforeUpdate = blockchainAnalyticsRepository.findAll().size();

        // Update the blockchainAnalytics using partial update
        BlockchainAnalytics partialUpdatedBlockchainAnalytics = new BlockchainAnalytics();
        partialUpdatedBlockchainAnalytics.setId(blockchainAnalytics.getId());

        partialUpdatedBlockchainAnalytics
            .transactionCount(UPDATED_TRANSACTION_COUNT)
            .averageTransactionFee(UPDATED_AVERAGE_TRANSACTION_FEE)
            .hashrateDistribution(UPDATED_HASHRATE_DISTRIBUTION)
            .timestamp(UPDATED_TIMESTAMP)
            .difficulty(UPDATED_DIFFICULTY);

        restBlockchainAnalyticsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBlockchainAnalytics.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBlockchainAnalytics))
            )
            .andExpect(status().isOk());

        // Validate the BlockchainAnalytics in the database
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeUpdate);
        BlockchainAnalytics testBlockchainAnalytics = blockchainAnalyticsList.get(blockchainAnalyticsList.size() - 1);
        assertThat(testBlockchainAnalytics.getTransactionCount()).isEqualTo(UPDATED_TRANSACTION_COUNT);
        assertThat(testBlockchainAnalytics.getAverageTransactionFee()).isEqualTo(UPDATED_AVERAGE_TRANSACTION_FEE);
        assertThat(testBlockchainAnalytics.getHashrateDistribution()).isEqualTo(UPDATED_HASHRATE_DISTRIBUTION);
        assertThat(testBlockchainAnalytics.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testBlockchainAnalytics.getDifficulty()).isEqualTo(UPDATED_DIFFICULTY);
        assertThat(testBlockchainAnalytics.getNetworkHashrate()).isEqualTo(DEFAULT_NETWORK_HASHRATE);
    }

    @Test
    @Transactional
    void fullUpdateBlockchainAnalyticsWithPatch() throws Exception {
        // Initialize the database
        blockchainAnalyticsRepository.saveAndFlush(blockchainAnalytics);

        int databaseSizeBeforeUpdate = blockchainAnalyticsRepository.findAll().size();

        // Update the blockchainAnalytics using partial update
        BlockchainAnalytics partialUpdatedBlockchainAnalytics = new BlockchainAnalytics();
        partialUpdatedBlockchainAnalytics.setId(blockchainAnalytics.getId());

        partialUpdatedBlockchainAnalytics
            .transactionCount(UPDATED_TRANSACTION_COUNT)
            .averageTransactionFee(UPDATED_AVERAGE_TRANSACTION_FEE)
            .hashrateDistribution(UPDATED_HASHRATE_DISTRIBUTION)
            .timestamp(UPDATED_TIMESTAMP)
            .difficulty(UPDATED_DIFFICULTY)
            .networkHashrate(UPDATED_NETWORK_HASHRATE);

        restBlockchainAnalyticsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBlockchainAnalytics.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBlockchainAnalytics))
            )
            .andExpect(status().isOk());

        // Validate the BlockchainAnalytics in the database
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeUpdate);
        BlockchainAnalytics testBlockchainAnalytics = blockchainAnalyticsList.get(blockchainAnalyticsList.size() - 1);
        assertThat(testBlockchainAnalytics.getTransactionCount()).isEqualTo(UPDATED_TRANSACTION_COUNT);
        assertThat(testBlockchainAnalytics.getAverageTransactionFee()).isEqualTo(UPDATED_AVERAGE_TRANSACTION_FEE);
        assertThat(testBlockchainAnalytics.getHashrateDistribution()).isEqualTo(UPDATED_HASHRATE_DISTRIBUTION);
        assertThat(testBlockchainAnalytics.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testBlockchainAnalytics.getDifficulty()).isEqualTo(UPDATED_DIFFICULTY);
        assertThat(testBlockchainAnalytics.getNetworkHashrate()).isEqualTo(UPDATED_NETWORK_HASHRATE);
    }

    @Test
    @Transactional
    void patchNonExistingBlockchainAnalytics() throws Exception {
        int databaseSizeBeforeUpdate = blockchainAnalyticsRepository.findAll().size();
        blockchainAnalytics.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBlockchainAnalyticsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, blockchainAnalytics.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(blockchainAnalytics))
            )
            .andExpect(status().isBadRequest());

        // Validate the BlockchainAnalytics in the database
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBlockchainAnalytics() throws Exception {
        int databaseSizeBeforeUpdate = blockchainAnalyticsRepository.findAll().size();
        blockchainAnalytics.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBlockchainAnalyticsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(blockchainAnalytics))
            )
            .andExpect(status().isBadRequest());

        // Validate the BlockchainAnalytics in the database
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBlockchainAnalytics() throws Exception {
        int databaseSizeBeforeUpdate = blockchainAnalyticsRepository.findAll().size();
        blockchainAnalytics.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBlockchainAnalyticsMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(blockchainAnalytics))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the BlockchainAnalytics in the database
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBlockchainAnalytics() throws Exception {
        // Initialize the database
        blockchainAnalyticsRepository.saveAndFlush(blockchainAnalytics);

        int databaseSizeBeforeDelete = blockchainAnalyticsRepository.findAll().size();

        // Delete the blockchainAnalytics
        restBlockchainAnalyticsMockMvc
            .perform(delete(ENTITY_API_URL_ID, blockchainAnalytics.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BlockchainAnalytics> blockchainAnalyticsList = blockchainAnalyticsRepository.findAll();
        assertThat(blockchainAnalyticsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
