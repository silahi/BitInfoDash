package com.comonitech.bitinfodash.web.rest;

import com.comonitech.bitinfodash.domain.MarketTrends;
import com.comonitech.bitinfodash.repository.MarketTrendsRepository;
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
 * REST controller for managing {@link com.comonitech.bitinfodash.domain.MarketTrends}.
 */
@RestController
@RequestMapping("/api/market-trends")
@Transactional
public class MarketTrendsResource {

    private final Logger log = LoggerFactory.getLogger(MarketTrendsResource.class);

    private static final String ENTITY_NAME = "marketTrends";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MarketTrendsRepository marketTrendsRepository;

    public MarketTrendsResource(MarketTrendsRepository marketTrendsRepository) {
        this.marketTrendsRepository = marketTrendsRepository;
    }

    /**
     * {@code POST  /market-trends} : Create a new marketTrends.
     *
     * @param marketTrends the marketTrends to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new marketTrends, or with status {@code 400 (Bad Request)} if the marketTrends has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<MarketTrends> createMarketTrends(@RequestBody MarketTrends marketTrends) throws URISyntaxException {
        log.debug("REST request to save MarketTrends : {}", marketTrends);
        if (marketTrends.getId() != null) {
            throw new BadRequestAlertException("A new marketTrends cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MarketTrends result = marketTrendsRepository.save(marketTrends);
        return ResponseEntity
            .created(new URI("/api/market-trends/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /market-trends/:id} : Updates an existing marketTrends.
     *
     * @param id the id of the marketTrends to save.
     * @param marketTrends the marketTrends to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated marketTrends,
     * or with status {@code 400 (Bad Request)} if the marketTrends is not valid,
     * or with status {@code 500 (Internal Server Error)} if the marketTrends couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<MarketTrends> updateMarketTrends(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MarketTrends marketTrends
    ) throws URISyntaxException {
        log.debug("REST request to update MarketTrends : {}, {}", id, marketTrends);
        if (marketTrends.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, marketTrends.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!marketTrendsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MarketTrends result = marketTrendsRepository.save(marketTrends);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, marketTrends.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /market-trends/:id} : Partial updates given fields of an existing marketTrends, field will ignore if it is null
     *
     * @param id the id of the marketTrends to save.
     * @param marketTrends the marketTrends to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated marketTrends,
     * or with status {@code 400 (Bad Request)} if the marketTrends is not valid,
     * or with status {@code 404 (Not Found)} if the marketTrends is not found,
     * or with status {@code 500 (Internal Server Error)} if the marketTrends couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MarketTrends> partialUpdateMarketTrends(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MarketTrends marketTrends
    ) throws URISyntaxException {
        log.debug("REST request to partial update MarketTrends partially : {}, {}", id, marketTrends);
        if (marketTrends.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, marketTrends.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!marketTrendsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MarketTrends> result = marketTrendsRepository
            .findById(marketTrends.getId())
            .map(existingMarketTrends -> {
                if (marketTrends.getTrendName() != null) {
                    existingMarketTrends.setTrendName(marketTrends.getTrendName());
                }
                if (marketTrends.getIndicatorValue() != null) {
                    existingMarketTrends.setIndicatorValue(marketTrends.getIndicatorValue());
                }
                if (marketTrends.getTimestamp() != null) {
                    existingMarketTrends.setTimestamp(marketTrends.getTimestamp());
                }
                if (marketTrends.getTrendType() != null) {
                    existingMarketTrends.setTrendType(marketTrends.getTrendType());
                }

                return existingMarketTrends;
            })
            .map(marketTrendsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, marketTrends.getId().toString())
        );
    }

    /**
     * {@code GET  /market-trends} : get all the marketTrends.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of marketTrends in body.
     */
    @GetMapping("")
    public List<MarketTrends> getAllMarketTrends() {
        log.debug("REST request to get all MarketTrends");
        return marketTrendsRepository.findAll();
    }

    /**
     * {@code GET  /market-trends/:id} : get the "id" marketTrends.
     *
     * @param id the id of the marketTrends to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the marketTrends, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<MarketTrends> getMarketTrends(@PathVariable Long id) {
        log.debug("REST request to get MarketTrends : {}", id);
        Optional<MarketTrends> marketTrends = marketTrendsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(marketTrends);
    }

    /**
     * {@code DELETE  /market-trends/:id} : delete the "id" marketTrends.
     *
     * @param id the id of the marketTrends to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMarketTrends(@PathVariable Long id) {
        log.debug("REST request to delete MarketTrends : {}", id);
        marketTrendsRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
