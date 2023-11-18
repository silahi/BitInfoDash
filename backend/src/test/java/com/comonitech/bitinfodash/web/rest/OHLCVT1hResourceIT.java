package com.comonitech.bitinfodash.web.rest;

import static com.comonitech.bitinfodash.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.comonitech.bitinfodash.IntegrationTest;
import com.comonitech.bitinfodash.domain.OHLCVT1h;
import com.comonitech.bitinfodash.repository.OHLCVT1hRepository;
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
 * Integration tests for the {@link OHLCVT1hResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OHLCVT1hResourceIT {

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

    private static final String ENTITY_API_URL = "/api/ohlcvt-1-hs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OHLCVT1hRepository oHLCVT1hRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOHLCVT1hMockMvc;

    private OHLCVT1h oHLCVT1h;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT1h createEntity(EntityManager em) {
        OHLCVT1h oHLCVT1h = new OHLCVT1h()
            .timestamp(DEFAULT_TIMESTAMP)
            .open(DEFAULT_OPEN)
            .high(DEFAULT_HIGH)
            .low(DEFAULT_LOW)
            .close(DEFAULT_CLOSE)
            .volume(DEFAULT_VOLUME)
            .trades(DEFAULT_TRADES);
        return oHLCVT1h;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OHLCVT1h createUpdatedEntity(EntityManager em) {
        OHLCVT1h oHLCVT1h = new OHLCVT1h()
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);
        return oHLCVT1h;
    }

    @BeforeEach
    public void initTest() {
        oHLCVT1h = createEntity(em);
    }

    @Test
    @Transactional
    void createOHLCVT1h() throws Exception {
        int databaseSizeBeforeCreate = oHLCVT1hRepository.findAll().size();
        // Create the OHLCVT1h
        restOHLCVT1hMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT1h)))
            .andExpect(status().isCreated());

        // Validate the OHLCVT1h in the database
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeCreate + 1);
        OHLCVT1h testOHLCVT1h = oHLCVT1hList.get(oHLCVT1hList.size() - 1);
        assertThat(testOHLCVT1h.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testOHLCVT1h.getOpen()).isEqualTo(DEFAULT_OPEN);
        assertThat(testOHLCVT1h.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testOHLCVT1h.getLow()).isEqualTo(DEFAULT_LOW);
        assertThat(testOHLCVT1h.getClose()).isEqualTo(DEFAULT_CLOSE);
        assertThat(testOHLCVT1h.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testOHLCVT1h.getTrades()).isEqualTo(DEFAULT_TRADES);
    }

    @Test
    @Transactional
    void createOHLCVT1hWithExistingId() throws Exception {
        // Create the OHLCVT1h with an existing ID
        oHLCVT1h.setId(1L);

        int databaseSizeBeforeCreate = oHLCVT1hRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOHLCVT1hMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT1h)))
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1h in the database
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOHLCVT1hs() throws Exception {
        // Initialize the database
        oHLCVT1hRepository.saveAndFlush(oHLCVT1h);

        // Get all the oHLCVT1hList
        restOHLCVT1hMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oHLCVT1h.getId().intValue())))
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
    void getOHLCVT1h() throws Exception {
        // Initialize the database
        oHLCVT1hRepository.saveAndFlush(oHLCVT1h);

        // Get the oHLCVT1h
        restOHLCVT1hMockMvc
            .perform(get(ENTITY_API_URL_ID, oHLCVT1h.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oHLCVT1h.getId().intValue()))
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
    void getNonExistingOHLCVT1h() throws Exception {
        // Get the oHLCVT1h
        restOHLCVT1hMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOHLCVT1h() throws Exception {
        // Initialize the database
        oHLCVT1hRepository.saveAndFlush(oHLCVT1h);

        int databaseSizeBeforeUpdate = oHLCVT1hRepository.findAll().size();

        // Update the oHLCVT1h
        OHLCVT1h updatedOHLCVT1h = oHLCVT1hRepository.findById(oHLCVT1h.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedOHLCVT1h are not directly saved in db
        em.detach(updatedOHLCVT1h);
        updatedOHLCVT1h
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT1hMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOHLCVT1h.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOHLCVT1h))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT1h in the database
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT1h testOHLCVT1h = oHLCVT1hList.get(oHLCVT1hList.size() - 1);
        assertThat(testOHLCVT1h.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT1h.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT1h.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT1h.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT1h.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT1h.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT1h.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void putNonExistingOHLCVT1h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1hRepository.findAll().size();
        oHLCVT1h.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT1hMockMvc
            .perform(
                put(ENTITY_API_URL_ID, oHLCVT1h.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1h))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1h in the database
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOHLCVT1h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1hRepository.findAll().size();
        oHLCVT1h.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1hMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1h))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1h in the database
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOHLCVT1h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1hRepository.findAll().size();
        oHLCVT1h.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1hMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oHLCVT1h)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT1h in the database
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOHLCVT1hWithPatch() throws Exception {
        // Initialize the database
        oHLCVT1hRepository.saveAndFlush(oHLCVT1h);

        int databaseSizeBeforeUpdate = oHLCVT1hRepository.findAll().size();

        // Update the oHLCVT1h using partial update
        OHLCVT1h partialUpdatedOHLCVT1h = new OHLCVT1h();
        partialUpdatedOHLCVT1h.setId(oHLCVT1h.getId());

        partialUpdatedOHLCVT1h.low(UPDATED_LOW).volume(UPDATED_VOLUME).trades(UPDATED_TRADES);

        restOHLCVT1hMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT1h.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT1h))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT1h in the database
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT1h testOHLCVT1h = oHLCVT1hList.get(oHLCVT1hList.size() - 1);
        assertThat(testOHLCVT1h.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testOHLCVT1h.getOpen()).isEqualTo(DEFAULT_OPEN);
        assertThat(testOHLCVT1h.getHigh()).isEqualTo(DEFAULT_HIGH);
        assertThat(testOHLCVT1h.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT1h.getClose()).isEqualTo(DEFAULT_CLOSE);
        assertThat(testOHLCVT1h.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT1h.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void fullUpdateOHLCVT1hWithPatch() throws Exception {
        // Initialize the database
        oHLCVT1hRepository.saveAndFlush(oHLCVT1h);

        int databaseSizeBeforeUpdate = oHLCVT1hRepository.findAll().size();

        // Update the oHLCVT1h using partial update
        OHLCVT1h partialUpdatedOHLCVT1h = new OHLCVT1h();
        partialUpdatedOHLCVT1h.setId(oHLCVT1h.getId());

        partialUpdatedOHLCVT1h
            .timestamp(UPDATED_TIMESTAMP)
            .open(UPDATED_OPEN)
            .high(UPDATED_HIGH)
            .low(UPDATED_LOW)
            .close(UPDATED_CLOSE)
            .volume(UPDATED_VOLUME)
            .trades(UPDATED_TRADES);

        restOHLCVT1hMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOHLCVT1h.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOHLCVT1h))
            )
            .andExpect(status().isOk());

        // Validate the OHLCVT1h in the database
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeUpdate);
        OHLCVT1h testOHLCVT1h = oHLCVT1hList.get(oHLCVT1hList.size() - 1);
        assertThat(testOHLCVT1h.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testOHLCVT1h.getOpen()).isEqualTo(UPDATED_OPEN);
        assertThat(testOHLCVT1h.getHigh()).isEqualTo(UPDATED_HIGH);
        assertThat(testOHLCVT1h.getLow()).isEqualTo(UPDATED_LOW);
        assertThat(testOHLCVT1h.getClose()).isEqualTo(UPDATED_CLOSE);
        assertThat(testOHLCVT1h.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testOHLCVT1h.getTrades()).isEqualTo(UPDATED_TRADES);
    }

    @Test
    @Transactional
    void patchNonExistingOHLCVT1h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1hRepository.findAll().size();
        oHLCVT1h.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOHLCVT1hMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, oHLCVT1h.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1h))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1h in the database
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOHLCVT1h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1hRepository.findAll().size();
        oHLCVT1h.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1hMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oHLCVT1h))
            )
            .andExpect(status().isBadRequest());

        // Validate the OHLCVT1h in the database
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOHLCVT1h() throws Exception {
        int databaseSizeBeforeUpdate = oHLCVT1hRepository.findAll().size();
        oHLCVT1h.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOHLCVT1hMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(oHLCVT1h)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OHLCVT1h in the database
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOHLCVT1h() throws Exception {
        // Initialize the database
        oHLCVT1hRepository.saveAndFlush(oHLCVT1h);

        int databaseSizeBeforeDelete = oHLCVT1hRepository.findAll().size();

        // Delete the oHLCVT1h
        restOHLCVT1hMockMvc
            .perform(delete(ENTITY_API_URL_ID, oHLCVT1h.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OHLCVT1h> oHLCVT1hList = oHLCVT1hRepository.findAll();
        assertThat(oHLCVT1hList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
