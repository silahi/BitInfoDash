package com.comonitech.bitinfodash.web.rest;

import com.comonitech.bitinfodash.domain.BlockchainAnalytics;
import com.comonitech.bitinfodash.repository.BlockchainAnalyticsRepository;
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
 * REST controller for managing {@link com.comonitech.bitinfodash.domain.BlockchainAnalytics}.
 */
@RestController
@RequestMapping("/api/blockchain-analytics")
@Transactional
public class BlockchainAnalyticsResource {

    private final Logger log = LoggerFactory.getLogger(BlockchainAnalyticsResource.class);

    private static final String ENTITY_NAME = "blockchainAnalytics";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BlockchainAnalyticsRepository blockchainAnalyticsRepository;

    public BlockchainAnalyticsResource(BlockchainAnalyticsRepository blockchainAnalyticsRepository) {
        this.blockchainAnalyticsRepository = blockchainAnalyticsRepository;
    }

    /**
     * {@code POST  /blockchain-analytics} : Create a new blockchainAnalytics.
     *
     * @param blockchainAnalytics the blockchainAnalytics to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new blockchainAnalytics, or with status {@code 400 (Bad Request)} if the blockchainAnalytics has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<BlockchainAnalytics> createBlockchainAnalytics(@RequestBody BlockchainAnalytics blockchainAnalytics)
        throws URISyntaxException {
        log.debug("REST request to save BlockchainAnalytics : {}", blockchainAnalytics);
        if (blockchainAnalytics.getId() != null) {
            throw new BadRequestAlertException("A new blockchainAnalytics cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlockchainAnalytics result = blockchainAnalyticsRepository.save(blockchainAnalytics);
        return ResponseEntity
            .created(new URI("/api/blockchain-analytics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /blockchain-analytics/:id} : Updates an existing blockchainAnalytics.
     *
     * @param id the id of the blockchainAnalytics to save.
     * @param blockchainAnalytics the blockchainAnalytics to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated blockchainAnalytics,
     * or with status {@code 400 (Bad Request)} if the blockchainAnalytics is not valid,
     * or with status {@code 500 (Internal Server Error)} if the blockchainAnalytics couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BlockchainAnalytics> updateBlockchainAnalytics(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BlockchainAnalytics blockchainAnalytics
    ) throws URISyntaxException {
        log.debug("REST request to update BlockchainAnalytics : {}, {}", id, blockchainAnalytics);
        if (blockchainAnalytics.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, blockchainAnalytics.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!blockchainAnalyticsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        BlockchainAnalytics result = blockchainAnalyticsRepository.save(blockchainAnalytics);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, blockchainAnalytics.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /blockchain-analytics/:id} : Partial updates given fields of an existing blockchainAnalytics, field will ignore if it is null
     *
     * @param id the id of the blockchainAnalytics to save.
     * @param blockchainAnalytics the blockchainAnalytics to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated blockchainAnalytics,
     * or with status {@code 400 (Bad Request)} if the blockchainAnalytics is not valid,
     * or with status {@code 404 (Not Found)} if the blockchainAnalytics is not found,
     * or with status {@code 500 (Internal Server Error)} if the blockchainAnalytics couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BlockchainAnalytics> partialUpdateBlockchainAnalytics(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BlockchainAnalytics blockchainAnalytics
    ) throws URISyntaxException {
        log.debug("REST request to partial update BlockchainAnalytics partially : {}, {}", id, blockchainAnalytics);
        if (blockchainAnalytics.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, blockchainAnalytics.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!blockchainAnalyticsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BlockchainAnalytics> result = blockchainAnalyticsRepository
            .findById(blockchainAnalytics.getId())
            .map(existingBlockchainAnalytics -> {
                if (blockchainAnalytics.getTransactionCount() != null) {
                    existingBlockchainAnalytics.setTransactionCount(blockchainAnalytics.getTransactionCount());
                }
                if (blockchainAnalytics.getAverageTransactionFee() != null) {
                    existingBlockchainAnalytics.setAverageTransactionFee(blockchainAnalytics.getAverageTransactionFee());
                }
                if (blockchainAnalytics.getHashrateDistribution() != null) {
                    existingBlockchainAnalytics.setHashrateDistribution(blockchainAnalytics.getHashrateDistribution());
                }
                if (blockchainAnalytics.getTimestamp() != null) {
                    existingBlockchainAnalytics.setTimestamp(blockchainAnalytics.getTimestamp());
                }
                if (blockchainAnalytics.getDifficulty() != null) {
                    existingBlockchainAnalytics.setDifficulty(blockchainAnalytics.getDifficulty());
                }
                if (blockchainAnalytics.getNetworkHashrate() != null) {
                    existingBlockchainAnalytics.setNetworkHashrate(blockchainAnalytics.getNetworkHashrate());
                }

                return existingBlockchainAnalytics;
            })
            .map(blockchainAnalyticsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, blockchainAnalytics.getId().toString())
        );
    }

    /**
     * {@code GET  /blockchain-analytics} : get all the blockchainAnalytics.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blockchainAnalytics in body.
     */
    @GetMapping("")
    public List<BlockchainAnalytics> getAllBlockchainAnalytics() {
        log.debug("REST request to get all BlockchainAnalytics");
        return blockchainAnalyticsRepository.findAll();
    }

    /**
     * {@code GET  /blockchain-analytics/:id} : get the "id" blockchainAnalytics.
     *
     * @param id the id of the blockchainAnalytics to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the blockchainAnalytics, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BlockchainAnalytics> getBlockchainAnalytics(@PathVariable Long id) {
        log.debug("REST request to get BlockchainAnalytics : {}", id);
        Optional<BlockchainAnalytics> blockchainAnalytics = blockchainAnalyticsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(blockchainAnalytics);
    }

    /**
     * {@code DELETE  /blockchain-analytics/:id} : delete the "id" blockchainAnalytics.
     *
     * @param id the id of the blockchainAnalytics to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlockchainAnalytics(@PathVariable Long id) {
        log.debug("REST request to delete BlockchainAnalytics : {}", id);
        blockchainAnalyticsRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
