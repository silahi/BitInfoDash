package com.comonitech.bitinfodash.web.rest;

import static com.comonitech.bitinfodash.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.comonitech.bitinfodash.IntegrationTest;
import com.comonitech.bitinfodash.domain.OHLCVT1m;
import com.comonitech.bitinfodash.repository.OHLCVT1mRepository;
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
 * Integration tests for the {@link OHLCVT1mResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OHLCVT1mResourceIT {

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

    private static final String ENTITY_API_URL = "/api/ohlcvt-1-ms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OHLCVT1mRepository oHLCVT1mRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOHLCVT1mMockMvc;

    private OHLCVT1m oHLCVT1m;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT1m createEntity(EntityManager em) {
        OHLCVT1m oHLCVT1m = new OHLCVT1m()
            .timestamp(DEFAULT_TIMESTAMP)
            .open(DEFAULT_OPEN)
            .high(DEFAULT_HIGH)
            .low(DEFAULT_LOW)
            .close(DEFAULT_CLOSE)
            .volume(DEFAULT_VOLUME)
            .trades(DEFAULT_TRADES);
        return oHLCVT1m;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT1m createUpdatedEntity(EntityManager em) {
        OHLCVT1m oHLCVT1m = new OHLCVT1m()
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);
        return oHLCVT1m;
    }

    @BeforeEach
    public void initTest() {
        oHLCVT1m = createEntity(em);
    }

    @Test
    @Transactional
    void createOHLCVT1m() throws Exception {
        int databaseSizeBeforeCreate = oHLCVT1mRepository.findAll().size();
        // Create the OHLCVT1m
        restOHLCVT1mMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT1m)))
            .andExpect(status().isCreated());

        // Validate the OHLCVT1m in the database
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeCreate + 1);
        OHLCVT1m testOHLCVT1m = oHLCVT1mList.get(oHLCVT1mList.size() - 1);
        assertThat(testOHLCVT1m.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testOHLCVT1m.getOpen()).isEqualTo(DEFAULT_OPEN);
        assertThat(testOHLCVT1m.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testOHLCVT1m.getLow()).isEqualTo(DEFAULT_LOW);
        assertThat(testOHLCVT1m.getClose()).isEqualTo(DEFAULT_CLOSE);
        assertThat(testOHLCVT1m.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testOHLCVT1m.getTrades()).isEqualTo(DEFAULT_TRADES);
    }

    @Test
    @Transactional
    void createOHLCVT1mWithExistingId() throws Exception {
        // Create the OHLCVT1m with an existing ID
        oHLCVT1m.setId(1L);

        int databaseSizeBeforeCreate = oHLCVT1mRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOHLCVT1mMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT1m)))
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1m in the database
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOHLCVT1ms() throws Exception {
        // Initialize the database
        oHLCVT1mRepository.saveAndFlush(oHLCVT1m);

        // Get all the oHLCVT1mList
        restOHLCVT1mMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oHLCVT1m.getId().intValue())))
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
    void getOHLCVT1m() throws Exception {
        // Initialize the database
        oHLCVT1mRepository.saveAndFlush(oHLCVT1m);

        // Get the oHLCVT1m
        restOHLCVT1mMockMvc
            .perform(get(ENTITY_API_URL_ID, oHLCVT1m.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oHLCVT1m.getId().intValue()))
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
    void getNonExistingOHLCVT1m() throws Exception {
        // Get the oHLCVT1m
        restOHLCVT1mMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOHLCVT1m() throws Exception {
        // Initialize the database
        oHLCVT1mRepository.saveAndFlush(oHLCVT1m);

        int databaseSizeBeforeUpdate = oHLCVT1mRepository.findAll().size();

        // Update the oHLCVT1m
        OHLCVT1m updatedOHLCVT1m = oHLCVT1mRepository.findById(oHLCVT1m.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedOHLCVT1m are not directly saved in db
        em.detach(updatedOHLCVT1m);
        updatedOHLCVT1m
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT1mMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOHLCVT1m.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOHLCVT1m))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT1m in the database
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT1m testOHLCVT1m = oHLCVT1mList.get(oHLCVT1mList.size() - 1);
        assertThat(testOHLCVT1m.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT1m.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT1m.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT1m.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT1m.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT1m.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT1m.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void putNonExistingOHLCVT1m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1mRepository.findAll().size();
        oHLCVT1m.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT1mMockMvc
            .perform(
                put(ENTITY_API_URL_ID, oHLCVT1m.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1m in the database
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOHLCVT1m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1mRepository.findAll().size();
        oHLCVT1m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1mMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1m in the database
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOHLCVT1m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1mRepository.findAll().size();
        oHLCVT1m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1mMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT1m)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT1m in the database
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOHLCVT1mWithPatch() throws Exception {
        // Initialize the database
        oHLCVT1mRepository.saveAndFlush(oHLCVT1m);

        int databaseSizeBeforeUpdate = oHLCVT1mRepository.findAll().size();

        // Update the oHLCVT1m using partial update
        OHLCVT1m partialUpdatedOHLCVT1m = new OHLCVT1m();
        partialUpdatedOHLCVT1m.setId(oHLCVT1m.getId());

        partialUpdatedOHLCVT1m.open(UPDATED_OPEN).low(UPDATED_LOW).close(UPDATED_CLOSE).volume(UPDATED_VOLUME);

        restOHLCVT1mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT1m.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT1m))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT1m in the database
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT1m testOHLCVT1m = oHLCVT1mList.get(oHLCVT1mList.size() - 1);
        assertThat(testOHLCVT1m.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testOHLCVT1m.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT1m.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testOHLCVT1m.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT1m.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT1m.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT1m.getTrades()).isEqualTo(DEFAULT_TRADES);
    }

    @Test
    @Transactional
    void fullUpdateOHLCVT1mWithPatch() throws Exception {
        // Initialize the database
        oHLCVT1mRepository.saveAndFlush(oHLCVT1m);

        int databaseSizeBeforeUpdate = oHLCVT1mRepository.findAll().size();

        // Update the oHLCVT1m using partial update
        OHLCVT1m partialUpdatedOHLCVT1m = new OHLCVT1m();
        partialUpdatedOHLCVT1m.setId(oHLCVT1m.getId());

        partialUpdatedOHLCVT1m
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT1mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT1m.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT1m))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT1m in the database
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT1m testOHLCVT1m = oHLCVT1mList.get(oHLCVT1mList.size() - 1);
        assertThat(testOHLCVT1m.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT1m.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT1m.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT1m.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT1m.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT1m.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT1m.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void patchNonExistingOHLCVT1m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1mRepository.findAll().size();
        oHLCVT1m.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT1mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, oHLCVT1m.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1m in the database
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOHLCVT1m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1mRepository.findAll().size();
        oHLCVT1m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1mMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1m))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1m in the database
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOHLCVT1m() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1mRepository.findAll().size();
        oHLCVT1m.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1mMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(oHLCVT1m)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT1m in the database
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOHLCVT1m() throws Exception {
        // Initialize the database
        oHLCVT1mRepository.saveAndFlush(oHLCVT1m);

        int databaseSizeBeforeDelete = oHLCVT1mRepository.findAll().size();

        // Delete the oHLCVT1m
        restOHLCVT1mMockMvc
            .perform(delete(ENTITY_API_URL_ID, oHLCVT1m.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OHLCVT1m> oHLCVT1mList = oHLCVT1mRepository.findAll();
        assertThat(oHLCVT1mList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
