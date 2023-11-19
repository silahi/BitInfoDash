package com.comonitech.bitinfodash.web.rest;

import com.comonitech.bitinfodash.domain.BitcoinOverview;
import com.comonitech.bitinfodash.repository.BitcoinOverviewRepository;
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
 * REST controller for managing {@link com.comonitech.bitinfodash.domain.BitcoinOverview}.
 */
@RestController
@RequestMapping("/api/bitcoin-overviews")
@Transactional
public class BitcoinOverviewResource {

    private final Logger log = LoggerFactory.getLogger(BitcoinOverviewResource.class);

    private static final String ENTITY_NAME = "bitcoinOverview";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BitcoinOverviewRepository bitcoinOverviewRepository;

    public BitcoinOverviewResource(BitcoinOverviewRepository bitcoinOverviewRepository) {
        this.bitcoinOverviewRepository = bitcoinOverviewRepository;
    }

    /**
     * {@code POST  /bitcoin-overviews} : Create a new bitcoinOverview.
     *
     * @param bitcoinOverview the bitcoinOverview to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bitcoinOverview, or with status {@code 400 (Bad Request)} if the bitcoinOverview has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<BitcoinOverview> createBitcoinOverview(@RequestBody BitcoinOverview bitcoinOverview) throws URISyntaxException {
        log.debug("REST request to save BitcoinOverview : {}", bitcoinOverview);
        if (bitcoinOverview.getId() != null) {
            throw new BadRequestAlertException("A new bitcoinOverview cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BitcoinOverview result = bitcoinOverviewRepository.save(bitcoinOverview);
        return ResponseEntity
            .created(new URI("/api/bitcoin-overviews/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bitcoin-overviews/:id} : Updates an existing bitcoinOverview.
     *
     * @param id the id of the bitcoinOverview to save.
     * @param bitcoinOverview the bitcoinOverview to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bitcoinOverview,
     * or with status {@code 400 (Bad Request)} if the bitcoinOverview is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bitcoinOverview couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BitcoinOverview> updateBitcoinOverview(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BitcoinOverview bitcoinOverview
    ) throws URISyntaxException {
        log.debug("REST request to update BitcoinOverview : {}, {}", id, bitcoinOverview);
        if (bitcoinOverview.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bitcoinOverview.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bitcoinOverviewRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        BitcoinOverview result = bitcoinOverviewRepository.save(bitcoinOverview);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bitcoinOverview.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /bitcoin-overviews/:id} : Partial updates given fields of an existing bitcoinOverview, field will ignore if it is null
     *
     * @param id the id of the bitcoinOverview to save.
     * @param bitcoinOverview the bitcoinOverview to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bitcoinOverview,
     * or with status {@code 400 (Bad Request)} if the bitcoinOverview is not valid,
     * or with status {@code 404 (Not Found)} if the bitcoinOverview is not found,
     * or with status {@code 500 (Internal Server Error)} if the bitcoinOverview couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BitcoinOverview> partialUpdateBitcoinOverview(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BitcoinOverview bitcoinOverview
    ) throws URISyntaxException {
        log.debug("REST request to partial update BitcoinOverview partially : {}, {}", id, bitcoinOverview);
        if (bitcoinOverview.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bitcoinOverview.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bitcoinOverviewRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BitcoinOverview> result = bitcoinOverviewRepository
            .findById(bitcoinOverview.getId())
            .map(existingBitcoinOverview -> {
                if (bitcoinOverview.getBitcoinPrice() != null) {
                    existingBitcoinOverview.setBitcoinPrice(bitcoinOverview.getBitcoinPrice());
                }
                if (bitcoinOverview.getMarketCap() != null) {
                    existingBitcoinOverview.setMarketCap(bitcoinOverview.getMarketCap());
                }
                if (bitcoinOverview.getExchangeVolume() != null) {
                    existingBitcoinOverview.setExchangeVolume(bitcoinOverview.getExchangeVolume());
                }
                if (bitcoinOverview.getTimestamp() != null) {
                    existingBitcoinOverview.setTimestamp(bitcoinOverview.getTimestamp());
                }
                if (bitcoinOverview.getCurrency() != null) {
                    existingBitcoinOverview.setCurrency(bitcoinOverview.getCurrency());
                }
                if (bitcoinOverview.getVolumeChange24h() != null) {
                    existingBitcoinOverview.setVolumeChange24h(bitcoinOverview.getVolumeChange24h());
                }
                if (bitcoinOverview.getPercentChange1h() != null) {
                    existingBitcoinOverview.setPercentChange1h(bitcoinOverview.getPercentChange1h());
                }
                if (bitcoinOverview.getPercentChange24h() != null) {
                    existingBitcoinOverview.setPercentChange24h(bitcoinOverview.getPercentChange24h());
                }
                if (bitcoinOverview.getPercentChange7d() != null) {
                    existingBitcoinOverview.setPercentChange7d(bitcoinOverview.getPercentChange7d());
                }
                if (bitcoinOverview.getPercentChange30d() != null) {
                    existingBitcoinOverview.setPercentChange30d(bitcoinOverview.getPercentChange30d());
                }
                if (bitcoinOverview.getPercentChange60d() != null) {
                    existingBitcoinOverview.setPercentChange60d(bitcoinOverview.getPercentChange60d());
                }
                if (bitcoinOverview.getPercentChange90d() != null) {
                    existingBitcoinOverview.setPercentChange90d(bitcoinOverview.getPercentChange90d());
                }

                return existingBitcoinOverview;
            })
            .map(bitcoinOverviewRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bitcoinOverview.getId().toString())
        );
    }

    /**
     * {@code GET  /bitcoin-overviews} : get all the bitcoinOverviews.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bitcoinOverviews in body.
     */
    @GetMapping("")
    public List<BitcoinOverview> getAllBitcoinOverviews() {
        log.debug("REST request to get all BitcoinOverviews");
        return bitcoinOverviewRepository.findAll();
    }

    /**
     * {@code GET  /bitcoin-overviews/:id} : get the "id" bitcoinOverview.
     *
     * @param id the id of the bitcoinOverview to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bitcoinOverview, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BitcoinOverview> getBitcoinOverview(@PathVariable Long id) {
        log.debug("REST request to get BitcoinOverview : {}", id);
        Optional<BitcoinOverview> bitcoinOverview = bitcoinOverviewRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bitcoinOverview);
    }

    /**
     * {@code DELETE  /bitcoin-overviews/:id} : delete the "id" bitcoinOverview.
     *
     * @param id the id of the bitcoinOverview to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBitcoinOverview(@PathVariable Long id) {
        log.debug("REST request to delete BitcoinOverview : {}", id);
        bitcoinOverviewRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
