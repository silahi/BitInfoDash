package com.comonitech.bitinfodash.web.rest;

import static com.comonitech.bitinfodash.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.comonitech.bitinfodash.IntegrationTest;
import com.comonitech.bitinfodash.domain.OHLCVT12h;
import com.comonitech.bitinfodash.repository.OHLCVT12hRepository;
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
 * Integration tests for the {@link OHLCVT12hResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OHLCVT12hResourceIT {

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

    private static final String ENTITY_API_URL = "/api/ohlcvt-12-hs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OHLCVT12hRepository oHLCVT12hRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOHLCVT12hMockMvc;

    private OHLCVT12h oHLCVT12h;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT12h createEntity(EntityManager em) {
        OHLCVT12h oHLCVT12h = new OHLCVT12h()
            .timestamp(DEFAULT_TIMESTAMP)
            .open(DEFAULT_OPEN)
            .high(DEFAULT_HIGH)
            .low(DEFAULT_LOW)
            .close(DEFAULT_CLOSE)
            .volume(DEFAULT_VOLUME)
            .trades(DEFAULT_TRADES);
        return oHLCVT12h;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT12h createUpdatedEntity(EntityManager em) {
        OHLCVT12h oHLCVT12h = new OHLCVT12h()
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);
        return oHLCVT12h;
    }

    @BeforeEach
    public void initTest() {
        oHLCVT12h = createEntity(em);
    }

    @Test
    @Transactional
    void createOHLCVT12h() throws Exception {
        int databaseSizeBeforeCreate = oHLCVT12hRepository.findAll().size();
        // Create the OHLCVT12h
        restOHLCVT12hMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT12h)))
            .andExpect(status().isCreated());

        // Validate the OHLCVT12h in the database
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeCreate + 1);
        OHLCVT12h testOHLCVT12h = oHLCVT12hList.get(oHLCVT12hList.size() - 1);
        assertThat(testOHLCVT12h.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testOHLCVT12h.getOpen()).isEqualTo(DEFAULT_OPEN);
        assertThat(testOHLCVT12h.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testOHLCVT12h.getLow()).isEqualTo(DEFAULT_LOW);
        assertThat(testOHLCVT12h.getClose()).isEqualTo(DEFAULT_CLOSE);
        assertThat(testOHLCVT12h.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testOHLCVT12h.getTrades()).isEqualTo(DEFAULT_TRADES);
    }

    @Test
    @Transactional
    void createOHLCVT12hWithExistingId() throws Exception {
        // Create the OHLCVT12h with an existing ID
        oHLCVT12h.setId(1L);

        int databaseSizeBeforeCreate = oHLCVT12hRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOHLCVT12hMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT12h)))
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT12h in the database
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOHLCVT12hs() throws Exception {
        // Initialize the database
        oHLCVT12hRepository.saveAndFlush(oHLCVT12h);

        // Get all the oHLCVT12hList
        restOHLCVT12hMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oHLCVT12h.getId().intValue())))
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
    void getOHLCVT12h() throws Exception {
        // Initialize the database
        oHLCVT12hRepository.saveAndFlush(oHLCVT12h);

        // Get the oHLCVT12h
        restOHLCVT12hMockMvc
            .perform(get(ENTITY_API_URL_ID, oHLCVT12h.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oHLCVT12h.getId().intValue()))
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
    void getNonExistingOHLCVT12h() throws Exception {
        // Get the oHLCVT12h
        restOHLCVT12hMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOHLCVT12h() throws Exception {
        // Initialize the database
        oHLCVT12hRepository.saveAndFlush(oHLCVT12h);

        int databaseSizeBeforeUpdate = oHLCVT12hRepository.findAll().size();

        // Update the oHLCVT12h
        OHLCVT12h updatedOHLCVT12h = oHLCVT12hRepository.findById(oHLCVT12h.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedOHLCVT12h are not directly saved in db
        em.detach(updatedOHLCVT12h);
        updatedOHLCVT12h
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT12hMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOHLCVT12h.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOHLCVT12h))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT12h in the database
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT12h testOHLCVT12h = oHLCVT12hList.get(oHLCVT12hList.size() - 1);
        assertThat(testOHLCVT12h.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT12h.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT12h.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT12h.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT12h.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT12h.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT12h.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void putNonExistingOHLCVT12h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT12hRepository.findAll().size();
        oHLCVT12h.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT12hMockMvc
            .perform(
                put(ENTITY_API_URL_ID, oHLCVT12h.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT12h))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT12h in the database
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOHLCVT12h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT12hRepository.findAll().size();
        oHLCVT12h.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT12hMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT12h))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT12h in the database
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOHLCVT12h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT12hRepository.findAll().size();
        oHLCVT12h.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT12hMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT12h)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT12h in the database
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOHLCVT12hWithPatch() throws Exception {
        // Initialize the database
        oHLCVT12hRepository.saveAndFlush(oHLCVT12h);

        int databaseSizeBeforeUpdate = oHLCVT12hRepository.findAll().size();

        // Update the oHLCVT12h using partial update
        OHLCVT12h partialUpdatedOHLCVT12h = new OHLCVT12h();
        partialUpdatedOHLCVT12h.setId(oHLCVT12h.getId());

        partialUpdatedOHLCVT12h.open(UPDATED_OPEN).low(UPDATED_LOW).close(UPDATED_CLOSE).volume(UPDATED_VOLUME);

        restOHLCVT12hMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT12h.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT12h))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT12h in the database
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT12h testOHLCVT12h = oHLCVT12hList.get(oHLCVT12hList.size() - 1);
        assertThat(testOHLCVT12h.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testOHLCVT12h.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT12h.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testOHLCVT12h.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT12h.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT12h.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT12h.getTrades()).isEqualTo(DEFAULT_TRADES);
    }

    @Test
    @Transactional
    void fullUpdateOHLCVT12hWithPatch() throws Exception {
        // Initialize the database
        oHLCVT12hRepository.saveAndFlush(oHLCVT12h);

        int databaseSizeBeforeUpdate = oHLCVT12hRepository.findAll().size();

        // Update the oHLCVT12h using partial update
        OHLCVT12h partialUpdatedOHLCVT12h = new OHLCVT12h();
        partialUpdatedOHLCVT12h.setId(oHLCVT12h.getId());

        partialUpdatedOHLCVT12h
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT12hMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT12h.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT12h))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT12h in the database
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT12h testOHLCVT12h = oHLCVT12hList.get(oHLCVT12hList.size() - 1);
        assertThat(testOHLCVT12h.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT12h.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT12h.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT12h.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT12h.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT12h.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT12h.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void patchNonExistingOHLCVT12h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT12hRepository.findAll().size();
        oHLCVT12h.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT12hMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, oHLCVT12h.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT12h))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT12h in the database
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOHLCVT12h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT12hRepository.findAll().size();
        oHLCVT12h.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT12hMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT12h))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT12h in the database
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOHLCVT12h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT12hRepository.findAll().size();
        oHLCVT12h.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT12hMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(oHLCVT12h))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT12h in the database
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOHLCVT12h() throws Exception {
        // Initialize the database
        oHLCVT12hRepository.saveAndFlush(oHLCVT12h);

        int databaseSizeBeforeDelete = oHLCVT12hRepository.findAll().size();

        // Delete the oHLCVT12h
        restOHLCVT12hMockMvc
            .perform(delete(ENTITY_API_URL_ID, oHLCVT12h.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OHLCVT12h> oHLCVT12hList = oHLCVT12hRepository.findAll();
        assertThat(oHLCVT12hList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
