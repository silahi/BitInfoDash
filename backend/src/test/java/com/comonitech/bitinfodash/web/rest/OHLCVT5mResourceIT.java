package com.comonitech.bitinfodash.web.rest;

import static com.comonitech.bitinfodash.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.comonitech.bitinfodash.IntegrationTest;
import com.comonitech.bitinfodash.domain.OHLCVT5m;
import com.comonitech.bitinfodash.repository.OHLCVT5mRepository;
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
 * Integration tests for the {@link OHLCVT5mResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OHLCVT5mResourceIT {

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

    private static final String ENTITY_API_URL = "/api/ohlcvt-5-ms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OHLCVT5mRepository oHLCVT5mRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOHLCVT5mMockMvc;

    private OHLCVT5m oHLCVT5m;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT5m createEntity(EntityManager em) {
        OHLCVT5m oHLCVT5m = new OHLCVT5m()
            .timestamp(DEFAULT_TIMESTAMP)
            .open(DEFAULT_OPEN)
            .high(DEFAULT_HIGH)
            .low(DEFAULT_LOW)
            .close(DEFAULT_CLOSE)
            .volume(DEFAULT_VOLUME)
            .trades(DEFAULT_TRADES);
        return oHLCVT5m;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT5m createUpdatedEntity(EntityManager em) {
        OHLCVT5m oHLCVT5m = new OHLCVT5m()
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);
        return oHLCVT5m;
    }

    @BeforeEach
    public void initTest() {
        oHLCVT5m = createEntity(em);
    }

    @Test
    @Transactional
    void createOHLCVT5m() throws Exception {
        int databaseSizeBeforeCreate = oHLCVT5mRepository.findAll().size();
        // Create the OHLCVT5m
        restOHLCVT5mMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT5m)))
            .andExpect(status().isCreated());

        // Validate the OHLCVT5m in the database
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeCreate + 1);
        OHLCVT5m testOHLCVT5m = oHLCVT5mList.get(oHLCVT5mList.size() - 1);
        assertThat(testOHLCVT5m.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testOHLCVT5m.getOpen()).isEqualTo(DEFAULT_OPEN);
        assertThat(testOHLCVT5m.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testOHLCVT5m.getLow()).isEqualTo(DEFAULT_LOW);
        assertThat(testOHLCVT5m.getClose()).isEqualTo(DEFAULT_CLOSE);
        assertThat(testOHLCVT5m.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testOHLCVT5m.getTrades()).isEqualTo(DEFAULT_TRADES);
    }

    @Test
    @Transactional
    void createOHLCVT5mWithExistingId() throws Exception {
        // Create the OHLCVT5m with an existing ID
        oHLCVT5m.setId(1L);

        int databaseSizeBeforeCreate = oHLCVT5mRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOHLCVT5mMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT5m)))
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT5m in the database
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOHLCVT5ms() throws Exception {
        // Initialize the database
        oHLCVT5mRepository.saveAndFlush(oHLCVT5m);

        // Get all the oHLCVT5mList
        restOHLCVT5mMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oHLCVT5m.getId().intValue())))
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
    void getOHLCVT5m() throws Exception {
        // Initialize the database
        oHLCVT5mRepository.saveAndFlush(oHLCVT5m);

        // Get the oHLCVT5m
        restOHLCVT5mMockMvc
            .perform(get(ENTITY_API_URL_ID, oHLCVT5m.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oHLCVT5m.getId().intValue()))
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
    void getNonExistingOHLCVT5m() throws Exception {
        // Get the oHLCVT5m
        restOHLCVT5mMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOHLCVT5m() throws Exception {
        // Initialize the database
        oHLCVT5mRepository.saveAndFlush(oHLCVT5m);

        int databaseSizeBeforeUpdate = oHLCVT5mRepository.findAll().size();

        // Update the oHLCVT5m
        OHLCVT5m updatedOHLCVT5m = oHLCVT5mRepository.findById(oHLCVT5m.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedOHLCVT5m are not directly saved in db
        em.detach(updatedOHLCVT5m);
        updatedOHLCVT5m
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT5mMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOHLCVT5m.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOHLCVT5m))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT5m in the database
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT5m testOHLCVT5m = oHLCVT5mList.get(oHLCVT5mList.size() - 1);
        assertThat(testOHLCVT5m.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT5m.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT5m.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT5m.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT5m.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT5m.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT5m.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void putNonExistingOHLCVT5m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT5mRepository.findAll().size();
        oHLCVT5m.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT5mMockMvc
            .perform(
                put(ENTITY_API_URL_ID, oHLCVT5m.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT5m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT5m in the database
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOHLCVT5m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT5mRepository.findAll().size();
        oHLCVT5m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT5mMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT5m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT5m in the database
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOHLCVT5m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT5mRepository.findAll().size();
        oHLCVT5m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT5mMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT5m)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT5m in the database
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOHLCVT5mWithPatch() throws Exception {
        // Initialize the database
        oHLCVT5mRepository.saveAndFlush(oHLCVT5m);

        int databaseSizeBeforeUpdate = oHLCVT5mRepository.findAll().size();

        // Update the oHLCVT5m using partial update
        OHLCVT5m partialUpdatedOHLCVT5m = new OHLCVT5m();
        partialUpdatedOHLCVT5m.setId(oHLCVT5m.getId());

        partialUpdatedOHLCVT5m
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT5mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT5m.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT5m))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT5m in the database
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT5m testOHLCVT5m = oHLCVT5mList.get(oHLCVT5mList.size() - 1);
        assertThat(testOHLCVT5m.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT5m.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT5m.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testOHLCVT5m.getLow()).isEqualTo(DEFAULT_LOW);
        assertThat(testOHLCVT5m.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT5m.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT5m.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void fullUpdateOHLCVT5mWithPatch() throws Exception {
        // Initialize the database
        oHLCVT5mRepository.saveAndFlush(oHLCVT5m);

        int databaseSizeBeforeUpdate = oHLCVT5mRepository.findAll().size();

        // Update the oHLCVT5m using partial update
        OHLCVT5m partialUpdatedOHLCVT5m = new OHLCVT5m();
        partialUpdatedOHLCVT5m.setId(oHLCVT5m.getId());

        partialUpdatedOHLCVT5m
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT5mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT5m.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT5m))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT5m in the database
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT5m testOHLCVT5m = oHLCVT5mList.get(oHLCVT5mList.size() - 1);
        assertThat(testOHLCVT5m.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT5m.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT5m.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT5m.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT5m.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT5m.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT5m.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void patchNonExistingOHLCVT5m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT5mRepository.findAll().size();
        oHLCVT5m.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT5mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, oHLCVT5m.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT5m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT5m in the database
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOHLCVT5m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT5mRepository.findAll().size();
        oHLCVT5m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT5mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT5m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT5m in the database
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOHLCVT5m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT5mRepository.findAll().size();
        oHLCVT5m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT5mMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(oHLCVT5m)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT5m in the database
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOHLCVT5m() throws Exception {
        // Initialize the database
        oHLCVT5mRepository.saveAndFlush(oHLCVT5m);

        int databaseSizeBeforeDelete = oHLCVT5mRepository.findAll().size();

        // Delete the oHLCVT5m
        restOHLCVT5mMockMvc
            .perform(delete(ENTITY_API_URL_ID, oHLCVT5m.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OHLCVT5m> oHLCVT5mList = oHLCVT5mRepository.findAll();
        assertThat(oHLCVT5mList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
