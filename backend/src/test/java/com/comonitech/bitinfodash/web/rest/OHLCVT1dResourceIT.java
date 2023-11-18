package com.comonitech.bitinfodash.web.rest;

import static com.comonitech.bitinfodash.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.comonitech.bitinfodash.IntegrationTest;
import com.comonitech.bitinfodash.domain.OHLCVT1d;
import com.comonitech.bitinfodash.repository.OHLCVT1dRepository;
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
 * Integration tests for the {@link OHLCVT1dResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OHLCVT1dResourceIT {

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

    private static final String ENTITY_API_URL = "/api/ohlcvt-1-ds";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OHLCVT1dRepository oHLCVT1dRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOHLCVT1dMockMvc;

    private OHLCVT1d oHLCVT1d;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT1d createEntity(EntityManager em) {
        OHLCVT1d oHLCVT1d = new OHLCVT1d()
            .timestamp(DEFAULT_TIMESTAMP)
            .open(DEFAULT_OPEN)
            .high(DEFAULT_HIGH)
            .low(DEFAULT_LOW)
            .close(DEFAULT_CLOSE)
            .volume(DEFAULT_VOLUME)
            .trades(DEFAULT_TRADES);
        return oHLCVT1d;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT1d createUpdatedEntity(EntityManager em) {
        OHLCVT1d oHLCVT1d = new OHLCVT1d()
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);
        return oHLCVT1d;
    }

    @BeforeEach
    public void initTest() {
        oHLCVT1d = createEntity(em);
    }

    @Test
    @Transactional
    void createOHLCVT1d() throws Exception {
        int databaseSizeBeforeCreate = oHLCVT1dRepository.findAll().size();
        // Create the OHLCVT1d
        restOHLCVT1dMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT1d)))
            .andExpect(status().isCreated());

        // Validate the OHLCVT1d in the database
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeCreate + 1);
        OHLCVT1d testOHLCVT1d = oHLCVT1dList.get(oHLCVT1dList.size() - 1);
        assertThat(testOHLCVT1d.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testOHLCVT1d.getOpen()).isEqualTo(DEFAULT_OPEN);
        assertThat(testOHLCVT1d.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testOHLCVT1d.getLow()).isEqualTo(DEFAULT_LOW);
        assertThat(testOHLCVT1d.getClose()).isEqualTo(DEFAULT_CLOSE);
        assertThat(testOHLCVT1d.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testOHLCVT1d.getTrades()).isEqualTo(DEFAULT_TRADES);
    }

    @Test
    @Transactional
    void createOHLCVT1dWithExistingId() throws Exception {
        // Create the OHLCVT1d with an existing ID
        oHLCVT1d.setId(1L);

        int databaseSizeBeforeCreate = oHLCVT1dRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOHLCVT1dMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT1d)))
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1d in the database
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOHLCVT1ds() throws Exception {
        // Initialize the database
        oHLCVT1dRepository.saveAndFlush(oHLCVT1d);

        // Get all the oHLCVT1dList
        restOHLCVT1dMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oHLCVT1d.getId().intValue())))
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
    void getOHLCVT1d() throws Exception {
        // Initialize the database
        oHLCVT1dRepository.saveAndFlush(oHLCVT1d);

        // Get the oHLCVT1d
        restOHLCVT1dMockMvc
            .perform(get(ENTITY_API_URL_ID, oHLCVT1d.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oHLCVT1d.getId().intValue()))
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
    void getNonExistingOHLCVT1d() throws Exception {
        // Get the oHLCVT1d
        restOHLCVT1dMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOHLCVT1d() throws Exception {
        // Initialize the database
        oHLCVT1dRepository.saveAndFlush(oHLCVT1d);

        int databaseSizeBeforeUpdate = oHLCVT1dRepository.findAll().size();

        // Update the oHLCVT1d
        OHLCVT1d updatedOHLCVT1d = oHLCVT1dRepository.findById(oHLCVT1d.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedOHLCVT1d are not directly saved in db
        em.detach(updatedOHLCVT1d);
        updatedOHLCVT1d
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT1dMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOHLCVT1d.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOHLCVT1d))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT1d in the database
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT1d testOHLCVT1d = oHLCVT1dList.get(oHLCVT1dList.size() - 1);
        assertThat(testOHLCVT1d.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT1d.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT1d.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT1d.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT1d.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT1d.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT1d.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void putNonExistingOHLCVT1d() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1dRepository.findAll().size();
        oHLCVT1d.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT1dMockMvc
            .perform(
                put(ENTITY_API_URL_ID, oHLCVT1d.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1d))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1d in the database
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOHLCVT1d() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1dRepository.findAll().size();
        oHLCVT1d.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1dMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1d))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1d in the database
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOHLCVT1d() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1dRepository.findAll().size();
        oHLCVT1d.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1dMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT1d)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT1d in the database
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOHLCVT1dWithPatch() throws Exception {
        // Initialize the database
        oHLCVT1dRepository.saveAndFlush(oHLCVT1d);

        int databaseSizeBeforeUpdate = oHLCVT1dRepository.findAll().size();

        // Update the oHLCVT1d using partial update
        OHLCVT1d partialUpdatedOHLCVT1d = new OHLCVT1d();
        partialUpdatedOHLCVT1d.setId(oHLCVT1d.getId());

        partialUpdatedOHLCVT1d.timestamp(UPDATED_TIMESTAMP).open(UPDATED_OPEN).trades(UPDATED_TRADES);

        restOHLCVT1dMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT1d.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT1d))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT1d in the database
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT1d testOHLCVT1d = oHLCVT1dList.get(oHLCVT1dList.size() - 1);
        assertThat(testOHLCVT1d.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT1d.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT1d.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testOHLCVT1d.getLow()).isEqualTo(DEFAULT_LOW);
        assertThat(testOHLCVT1d.getClose()).isEqualTo(DEFAULT_CLOSE);
        assertThat(testOHLCVT1d.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testOHLCVT1d.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void fullUpdateOHLCVT1dWithPatch() throws Exception {
        // Initialize the database
        oHLCVT1dRepository.saveAndFlush(oHLCVT1d);

        int databaseSizeBeforeUpdate = oHLCVT1dRepository.findAll().size();

        // Update the oHLCVT1d using partial update
        OHLCVT1d partialUpdatedOHLCVT1d = new OHLCVT1d();
        partialUpdatedOHLCVT1d.setId(oHLCVT1d.getId());

        partialUpdatedOHLCVT1d
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT1dMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT1d.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT1d))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT1d in the database
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT1d testOHLCVT1d = oHLCVT1dList.get(oHLCVT1dList.size() - 1);
        assertThat(testOHLCVT1d.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT1d.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT1d.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT1d.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT1d.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT1d.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT1d.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void patchNonExistingOHLCVT1d() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1dRepository.findAll().size();
        oHLCVT1d.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT1dMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, oHLCVT1d.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1d))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1d in the database
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOHLCVT1d() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1dRepository.findAll().size();
        oHLCVT1d.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1dMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1d))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1d in the database
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOHLCVT1d() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1dRepository.findAll().size();
        oHLCVT1d.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1dMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(oHLCVT1d)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT1d in the database
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOHLCVT1d() throws Exception {
        // Initialize the database
        oHLCVT1dRepository.saveAndFlush(oHLCVT1d);

        int databaseSizeBeforeDelete = oHLCVT1dRepository.findAll().size();

        // Delete the oHLCVT1d
        restOHLCVT1dMockMvc
            .perform(delete(ENTITY_API_URL_ID, oHLCVT1d.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OHLCVT1d> oHLCVT1dList = oHLCVT1dRepository.findAll();
        assertThat(oHLCVT1dList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
