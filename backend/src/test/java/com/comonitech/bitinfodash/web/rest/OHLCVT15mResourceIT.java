package com.comonitech.bitinfodash.web.rest;

import static com.comonitech.bitinfodash.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.comonitech.bitinfodash.IntegrationTest;
import com.comonitech.bitinfodash.domain.OHLCVT15m;
import com.comonitech.bitinfodash.repository.OHLCVT15mRepository;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
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
 * Integration tests for the {@link OHLCVT15mResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OHLCVT15mResourceIT {

    private static final ZonedDateTime DEFAULT_TIMESTAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIMESTAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Double DEFAULT_OPEN = 1D;
    private static final Double UPDATED_OPEN = 2D;

    private static final Double DEFAULT_HIGH = 1D;
    private static final Double UPDATED_HIGH = 2D;

    private static final Double DEFAULT_LOW = 1D;
    private static final Double UPDATED_LOW = 2D;

    private static final Double DEFAULT_CLOSE = 1D;
    private static final Double UPDATED_CLOSE = 2D;

    private static final Long DEFAULT_VOLUME = 1L;
    private static final Long UPDATED_VOLUME = 2L;

    private static final Integer DEFAULT_TRADES = 1;
    private static final Integer UPDATED_TRADES = 2;

    private static final String ENTITY_API_URL = "/api/ohlcvt-15-ms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OHLCVT15mRepository oHLCVT15mRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOHLCVT15mMockMvc;

    private OHLCVT15m oHLCVT15m;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT15m createEntity(EntityManager em) {
        OHLCVT15m oHLCVT15m = new OHLCVT15m()
            .timestamp(DEFAULT_TIMESTAMP)
            .open(DEFAULT_OPEN)
            .high(DEFAULT_HIGH)
            .low(DEFAULT_LOW)
            .close(DEFAULT_CLOSE)
            .volume(DEFAULT_VOLUME)
            .trades(DEFAULT_TRADES);
        return oHLCVT15m;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT15m createUpdatedEntity(EntityManager em) {
        OHLCVT15m oHLCVT15m = new OHLCVT15m()
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);
        return oHLCVT15m;
    }

    @BeforeEach
    public void initTest() {
        oHLCVT15m = createEntity(em);
    }

    @Test
    @Transactional
    void createOHLCVT15m() throws Exception {
        int databaseSizeBeforeCreate = oHLCVT15mRepository.findAll().size();
        // Create the OHLCVT15m
        restOHLCVT15mMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT15m)))
            .andExpect(status().isCreated());

        // Validate the OHLCVT15m in the database
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeCreate + 1);
        OHLCVT15m testOHLCVT15m = oHLCVT15mList.get(oHLCVT15mList.size() - 1);
        assertThat(testOHLCVT15m.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testOHLCVT15m.getOpen()).isEqualTo(DEFAULT_OPEN);
        assertThat(testOHLCVT15m.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testOHLCVT15m.getLow()).isEqualTo(DEFAULT_LOW);
        assertThat(testOHLCVT15m.getClose()).isEqualTo(DEFAULT_CLOSE);
        assertThat(testOHLCVT15m.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testOHLCVT15m.getTrades()).isEqualTo(DEFAULT_TRADES);
    }

    @Test
    @Transactional
    void createOHLCVT15mWithExistingId() throws Exception {
        // Create the OHLCVT15m with an existing ID
        oHLCVT15m.setId(1L);

        int databaseSizeBeforeCreate = oHLCVT15mRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOHLCVT15mMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT15m)))
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT15m in the database
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOHLCVT15ms() throws Exception {
        // Initialize the database
        oHLCVT15mRepository.saveAndFlush(oHLCVT15m);

        // Get all the oHLCVT15mList
        restOHLCVT15mMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oHLCVT15m.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(sameInstant(DEFAULT_TIMESTAMP))))
            .andExpect(jsonPath("$.[*].open").value(hasItem(DEFAULT_OPEN.doubleValue())))
            .andExpect(jsonPath("$.[*].high").value(hasItem(DEFAULT_HIGH.doubleValue())))
            .andExpect(jsonPath("$.[*].low").value(hasItem(DEFAULT_LOW.doubleValue())))
            .andExpect(jsonPath("$.[*].close").value(hasItem(DEFAULT_CLOSE.doubleValue())))
            .andExpect(jsonPath("$.[*].volume").value(hasItem(DEFAULT_VOLUME.intValue())))
            .andExpect(jsonPath("$.[*].trades").value(hasItem(DEFAULT_TRADES)));
    }

    @Test
    @Transactional
    void getOHLCVT15m() throws Exception {
        // Initialize the database
        oHLCVT15mRepository.saveAndFlush(oHLCVT15m);

        // Get the oHLCVT15m
        restOHLCVT15mMockMvc
            .perform(get(ENTITY_API_URL_ID, oHLCVT15m.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oHLCVT15m.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(sameInstant(DEFAULT_TIMESTAMP)))
            .andExpect(jsonPath("$.open").value(DEFAULT_OPEN.doubleValue()))
            .andExpect(jsonPath("$.high").value(DEFAULT_HIGH.doubleValue()))
            .andExpect(jsonPath("$.low").value(DEFAULT_LOW.doubleValue()))
            .andExpect(jsonPath("$.close").value(DEFAULT_CLOSE.doubleValue()))
            .andExpect(jsonPath("$.volume").value(DEFAULT_VOLUME.intValue()))
            .andExpect(jsonPath("$.trades").value(DEFAULT_TRADES));
    }

    @Test
    @Transactional
    void getNonExistingOHLCVT15m() throws Exception {
        // Get the oHLCVT15m
        restOHLCVT15mMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOHLCVT15m() throws Exception {
        // Initialize the database
        oHLCVT15mRepository.saveAndFlush(oHLCVT15m);

        int databaseSizeBeforeUpdate = oHLCVT15mRepository.findAll().size();

        // Update the oHLCVT15m
        OHLCVT15m updatedOHLCVT15m = oHLCVT15mRepository.findById(oHLCVT15m.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedOHLCVT15m are not directly saved in db
        em.detach(updatedOHLCVT15m);
        updatedOHLCVT15m
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT15mMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOHLCVT15m.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOHLCVT15m))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT15m in the database
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT15m testOHLCVT15m = oHLCVT15mList.get(oHLCVT15mList.size() - 1);
        assertThat(testOHLCVT15m.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT15m.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT15m.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT15m.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT15m.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT15m.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT15m.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void putNonExistingOHLCVT15m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT15mRepository.findAll().size();
        oHLCVT15m.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT15mMockMvc
            .perform(
                put(ENTITY_API_URL_ID, oHLCVT15m.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT15m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT15m in the database
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOHLCVT15m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT15mRepository.findAll().size();
        oHLCVT15m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT15mMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT15m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT15m in the database
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOHLCVT15m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT15mRepository.findAll().size();
        oHLCVT15m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT15mMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT15m)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT15m in the database
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOHLCVT15mWithPatch() throws Exception {
        // Initialize the database
        oHLCVT15mRepository.saveAndFlush(oHLCVT15m);

        int databaseSizeBeforeUpdate = oHLCVT15mRepository.findAll().size();

        // Update the oHLCVT15m using partial update
        OHLCVT15m partialUpdatedOHLCVT15m = new OHLCVT15m();
        partialUpdatedOHLCVT15m.setId(oHLCVT15m.getId());

        partialUpdatedOHLCVT15m.timestamp(UPDATED_TIMESTAMP).open(UPDATED_OPEN).high(UPDATED_HIGH).low(UPDATED_LOW).close(UPDATED_CLOSE);

        restOHLCVT15mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT15m.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT15m))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT15m in the database
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT15m testOHLCVT15m = oHLCVT15mList.get(oHLCVT15mList.size() - 1);
        assertThat(testOHLCVT15m.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT15m.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT15m.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT15m.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT15m.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT15m.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testOHLCVT15m.getTrades()).isEqualTo(DEFAULT_TRADES);
    }

    @Test
    @Transactional
    void fullUpdateOHLCVT15mWithPatch() throws Exception {
        // Initialize the database
        oHLCVT15mRepository.saveAndFlush(oHLCVT15m);

        int databaseSizeBeforeUpdate = oHLCVT15mRepository.findAll().size();

        // Update the oHLCVT15m using partial update
        OHLCVT15m partialUpdatedOHLCVT15m = new OHLCVT15m();
        partialUpdatedOHLCVT15m.setId(oHLCVT15m.getId());

        partialUpdatedOHLCVT15m
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT15mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT15m.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT15m))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT15m in the database
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT15m testOHLCVT15m = oHLCVT15mList.get(oHLCVT15mList.size() - 1);
        assertThat(testOHLCVT15m.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT15m.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT15m.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT15m.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT15m.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT15m.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT15m.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void patchNonExistingOHLCVT15m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT15mRepository.findAll().size();
        oHLCVT15m.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT15mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, oHLCVT15m.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT15m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT15m in the database
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOHLCVT15m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT15mRepository.findAll().size();
        oHLCVT15m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT15mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT15m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT15m in the database
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOHLCVT15m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT15mRepository.findAll().size();
        oHLCVT15m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT15mMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(oHLCVT15m))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT15m in the database
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOHLCVT15m() throws Exception {
        // Initialize the database
        oHLCVT15mRepository.saveAndFlush(oHLCVT15m);

        int databaseSizeBeforeDelete = oHLCVT15mRepository.findAll().size();

        // Delete the oHLCVT15m
        restOHLCVT15mMockMvc
            .perform(delete(ENTITY_API_URL_ID, oHLCVT15m.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OHLCVT15m> oHLCVT15mList = oHLCVT15mRepository.findAll();
        assertThat(oHLCVT15mList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
