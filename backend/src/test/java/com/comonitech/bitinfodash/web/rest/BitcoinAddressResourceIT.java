package com.comonitech.bitinfodash.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.comonitech.bitinfodash.IntegrationTest;
import com.comonitech.bitinfodash.domain.BitcoinAddress;
import com.comonitech.bitinfodash.repository.BitcoinAddressRepository;
import jakarta.persistence.EntityManager;
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
 * Integration tests for the {@link BitcoinAddressResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BitcoinAddressResourceIT {

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final Double DEFAULT_BALANCE = 1D;
    private static final Double UPDATED_BALANCE = 2D;

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/bitcoin-addresses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BitcoinAddressRepository bitcoinAddressRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBitcoinAddressMockMvc;

    private BitcoinAddress bitcoinAddress;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BitcoinAddress createEntity(EntityManager em) {
        BitcoinAddress bitcoinAddress = new BitcoinAddress().address(DEFAULT_ADDRESS).balance(DEFAULT_BALANCE).label(DEFAULT_LABEL);
        return bitcoinAddress;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BitcoinAddress createUpdatedEntity(EntityManager em) {
        BitcoinAddress bitcoinAddress = new BitcoinAddress().address(UPDATED_ADDRESS).balance(UPDATED_BALANCE).label(UPDATED_LABEL);
        return bitcoinAddress;
    }

    @BeforeEach
    public void initTest() {
        bitcoinAddress = createEntity(em);
    }

    @Test
    @Transactional
    void createBitcoinAddress() throws Exception {
        int databaseSizeBeforeCreate = bitcoinAddressRepository.findAll().size();
        // Create the BitcoinAddress
        restBitcoinAddressMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bitcoinAddress))
            )
            .andExpect(status().isCreated());

        // Validate the BitcoinAddress in the database
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeCreate + 1);
        BitcoinAddress testBitcoinAddress = bitcoinAddressList.get(bitcoinAddressList.size() - 1);
        assertThat(testBitcoinAddress.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testBitcoinAddress.getBalance()).isEqualTo(DEFAULT_BALANCE);
        assertThat(testBitcoinAddress.getLabel()).isEqualTo(DEFAULT_LABEL);
    }

    @Test
    @Transactional
    void createBitcoinAddressWithExistingId() throws Exception {
        // Create the BitcoinAddress with an existing ID
        bitcoinAddress.setId(1L);

        int databaseSizeBeforeCreate = bitcoinAddressRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBitcoinAddressMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bitcoinAddress))
            )
            .andExpect(status().isBadRequest());

        // Validate the BitcoinAddress in the database
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBitcoinAddresses() throws Exception {
        // Initialize the database
        bitcoinAddressRepository.saveAndFlush(bitcoinAddress);

        // Get all the bitcoinAddressList
        restBitcoinAddressMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bitcoinAddress.getId().intValue())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)));
    }

    @Test
    @Transactional
    void getBitcoinAddress() throws Exception {
        // Initialize the database
        bitcoinAddressRepository.saveAndFlush(bitcoinAddress);

        // Get the bitcoinAddress
        restBitcoinAddressMockMvc
            .perform(get(ENTITY_API_URL_ID, bitcoinAddress.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bitcoinAddress.getId().intValue()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.balance").value(DEFAULT_BALANCE.doubleValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL));
    }

    @Test
    @Transactional
    void getNonExistingBitcoinAddress() throws Exception {
        // Get the bitcoinAddress
        restBitcoinAddressMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBitcoinAddress() throws Exception {
        // Initialize the database
        bitcoinAddressRepository.saveAndFlush(bitcoinAddress);

        int databaseSizeBeforeUpdate = bitcoinAddressRepository.findAll().size();

        // Update the bitcoinAddress
        BitcoinAddress updatedBitcoinAddress = bitcoinAddressRepository.findById(bitcoinAddress.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedBitcoinAddress are not directly saved in db
        em.detach(updatedBitcoinAddress);
        updatedBitcoinAddress.address(UPDATED_ADDRESS).balance(UPDATED_BALANCE).label(UPDATED_LABEL);

        restBitcoinAddressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBitcoinAddress.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBitcoinAddress))
            )
            .andExpect(status().isOk());

        // Validate the BitcoinAddress in the database
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeUpdate);
        BitcoinAddress testBitcoinAddress = bitcoinAddressList.get(bitcoinAddressList.size() - 1);
        assertThat(testBitcoinAddress.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testBitcoinAddress.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testBitcoinAddress.getLabel()).isEqualTo(UPDATED_LABEL);
    }

    @Test
    @Transactional
    void putNonExistingBitcoinAddress() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinAddressRepository.findAll().size();
        bitcoinAddress.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBitcoinAddressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bitcoinAddress.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(bitcoinAddress))
            )
            .andExpect(status().isBadRequest());

        // Validate the BitcoinAddress in the database
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBitcoinAddress() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinAddressRepository.findAll().size();
        bitcoinAddress.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBitcoinAddressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(bitcoinAddress))
            )
            .andExpect(status().isBadRequest());

        // Validate the BitcoinAddress in the database
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBitcoinAddress() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinAddressRepository.findAll().size();
        bitcoinAddress.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBitcoinAddressMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bitcoinAddress)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BitcoinAddress in the database
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBitcoinAddressWithPatch() throws Exception {
        // Initialize the database
        bitcoinAddressRepository.saveAndFlush(bitcoinAddress);

        int databaseSizeBeforeUpdate = bitcoinAddressRepository.findAll().size();

        // Update the bitcoinAddress using partial update
        BitcoinAddress partialUpdatedBitcoinAddress = new BitcoinAddress();
        partialUpdatedBitcoinAddress.setId(bitcoinAddress.getId());

        partialUpdatedBitcoinAddress.address(UPDATED_ADDRESS).balance(UPDATED_BALANCE).label(UPDATED_LABEL);

        restBitcoinAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBitcoinAddress.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBitcoinAddress))
            )
            .andExpect(status().isOk());

        // Validate the BitcoinAddress in the database
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeUpdate);
        BitcoinAddress testBitcoinAddress = bitcoinAddressList.get(bitcoinAddressList.size() - 1);
        assertThat(testBitcoinAddress.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testBitcoinAddress.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testBitcoinAddress.getLabel()).isEqualTo(UPDATED_LABEL);
    }

    @Test
    @Transactional
    void fullUpdateBitcoinAddressWithPatch() throws Exception {
        // Initialize the database
        bitcoinAddressRepository.saveAndFlush(bitcoinAddress);

        int databaseSizeBeforeUpdate = bitcoinAddressRepository.findAll().size();

        // Update the bitcoinAddress using partial update
        BitcoinAddress partialUpdatedBitcoinAddress = new BitcoinAddress();
        partialUpdatedBitcoinAddress.setId(bitcoinAddress.getId());

        partialUpdatedBitcoinAddress.address(UPDATED_ADDRESS).balance(UPDATED_BALANCE).label(UPDATED_LABEL);

        restBitcoinAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBitcoinAddress.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBitcoinAddress))
            )
            .andExpect(status().isOk());

        // Validate the BitcoinAddress in the database
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeUpdate);
        BitcoinAddress testBitcoinAddress = bitcoinAddressList.get(bitcoinAddressList.size() - 1);
        assertThat(testBitcoinAddress.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testBitcoinAddress.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testBitcoinAddress.getLabel()).isEqualTo(UPDATED_LABEL);
    }

    @Test
    @Transactional
    void patchNonExistingBitcoinAddress() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinAddressRepository.findAll().size();
        bitcoinAddress.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBitcoinAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, bitcoinAddress.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(bitcoinAddress))
            )
            .andExpect(status().isBadRequest());

        // Validate the BitcoinAddress in the database
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBitcoinAddress() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinAddressRepository.findAll().size();
        bitcoinAddress.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBitcoinAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(bitcoinAddress))
            )
            .andExpect(status().isBadRequest());

        // Validate the BitcoinAddress in the database
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBitcoinAddress() throws Exception {
        int databaseSizeBeforeUpdate = bitcoinAddressRepository.findAll().size();
        bitcoinAddress.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBitcoinAddressMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(bitcoinAddress))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the BitcoinAddress in the database
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBitcoinAddress() throws Exception {
        // Initialize the database
        bitcoinAddressRepository.saveAndFlush(bitcoinAddress);

        int databaseSizeBeforeDelete = bitcoinAddressRepository.findAll().size();

        // Delete the bitcoinAddress
        restBitcoinAddressMockMvc
            .perform(delete(ENTITY_API_URL_ID, bitcoinAddress.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BitcoinAddress> bitcoinAddressList = bitcoinAddressRepository.findAll();
        assertThat(bitcoinAddressList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
