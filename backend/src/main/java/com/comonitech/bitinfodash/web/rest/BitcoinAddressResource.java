package com.comonitech.bitinfodash.web.rest;

import com.comonitech.bitinfodash.domain.BitcoinAddress;
import com.comonitech.bitinfodash.repository.BitcoinAddressRepository;
import com.comonitech.bitinfodash.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.comonitech.bitinfodash.domain.BitcoinAddress}.
 */
@RestController
@RequestMapping("/api/bitcoin-addresses")
@Transactional
public class BitcoinAddressResource {

    private final Logger log = LoggerFactory.getLogger(BitcoinAddressResource.class);

    private static final String ENTITY_NAME = "bitcoinAddress";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BitcoinAddressRepository bitcoinAddressRepository;

    public BitcoinAddressResource(BitcoinAddressRepository bitcoinAddressRepository) {
        this.bitcoinAddressRepository = bitcoinAddressRepository;
    }

    /**
     * {@code POST  /bitcoin-addresses} : Create a new bitcoinAddress.
     *
     * @param bitcoinAddress the bitcoinAddress to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bitcoinAddress, or with status {@code 400 (Bad Request)} if the bitcoinAddress has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<BitcoinAddress> createBitcoinAddress(@RequestBody BitcoinAddress bitcoinAddress) throws URISyntaxException {
        log.debug("REST request to save BitcoinAddress : {}", bitcoinAddress);
        if (bitcoinAddress.getId() != null) {
            throw new BadRequestAlertException("A new bitcoinAddress cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BitcoinAddress result = bitcoinAddressRepository.save(bitcoinAddress);
        return ResponseEntity
            .created(new URI("/api/bitcoin-addresses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bitcoin-addresses/:id} : Updates an existing bitcoinAddress.
     *
     * @param id the id of the bitcoinAddress to save.
     * @param bitcoinAddress the bitcoinAddress to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bitcoinAddress,
     * or with status {@code 400 (Bad Request)} if the bitcoinAddress is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bitcoinAddress couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BitcoinAddress> updateBitcoinAddress(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BitcoinAddress bitcoinAddress
    ) throws URISyntaxException {
        log.debug("REST request to update BitcoinAddress : {}, {}", id, bitcoinAddress);
        if (bitcoinAddress.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bitcoinAddress.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bitcoinAddressRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        BitcoinAddress result = bitcoinAddressRepository.save(bitcoinAddress);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bitcoinAddress.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /bitcoin-addresses/:id} : Partial updates given fields of an existing bitcoinAddress, field will ignore if it is null
     *
     * @param id the id of the bitcoinAddress to save.
     * @param bitcoinAddress the bitcoinAddress to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bitcoinAddress,
     * or with status {@code 400 (Bad Request)} if the bitcoinAddress is not valid,
     * or with status {@code 404 (Not Found)} if the bitcoinAddress is not found,
     * or with status {@code 500 (Internal Server Error)} if the bitcoinAddress couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BitcoinAddress> partialUpdateBitcoinAddress(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BitcoinAddress bitcoinAddress
    ) throws URISyntaxException {
        log.debug("REST request to partial update BitcoinAddress partially : {}, {}", id, bitcoinAddress);
        if (bitcoinAddress.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bitcoinAddress.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bitcoinAddressRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BitcoinAddress> result = bitcoinAddressRepository
            .findById(bitcoinAddress.getId())
            .map(existingBitcoinAddress -> {
                if (bitcoinAddress.getAddress() != null) {
                    existingBitcoinAddress.setAddress(bitcoinAddress.getAddress());
                }
                if (bitcoinAddress.getBalance() != null) {
                    existingBitcoinAddress.setBalance(bitcoinAddress.getBalance());
                }
                if (bitcoinAddress.getLabel() != null) {
                    existingBitcoinAddress.setLabel(bitcoinAddress.getLabel());
                }
                if (bitcoinAddress.getSent() != null) {
                    existingBitcoinAddress.setSent(bitcoinAddress.getSent());
                }
                if (bitcoinAddress.getReceived() != null) {
                    existingBitcoinAddress.setReceived(bitcoinAddress.getReceived());
                }

                return existingBitcoinAddress;
            })
            .map(bitcoinAddressRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bitcoinAddress.getId().toString())
        );
    }

    /**
     * {@code GET  /bitcoin-addresses} : get all the bitcoinAddresses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bitcoinAddresses in body.
     */
    @GetMapping("")
    public List<BitcoinAddress> getAllBitcoinAddresses() {
        log.debug("REST request to get all BitcoinAddresses");
        return bitcoinAddressRepository.findAll();
    }

    /**
     * {@code GET  /bitcoin-addresses/:id} : get the "id" bitcoinAddress.
     *
     * @param id the id of the bitcoinAddress to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bitcoinAddress, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BitcoinAddress> getBitcoinAddress(@PathVariable Long id) {
        log.debug("REST request to get BitcoinAddress : {}", id);
        Optional<BitcoinAddress> bitcoinAddress = bitcoinAddressRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bitcoinAddress);
    }

    /**
     * {@code DELETE  /bitcoin-addresses/:id} : delete the "id" bitcoinAddress.
     *
     * @param id the id of the bitcoinAddress to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBitcoinAddress(@PathVariable Long id) {
        log.debug("REST request to delete BitcoinAddress : {}", id);
        bitcoinAddressRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
