package com.comonitech.bitinfodash.web.rest;

import com.comonitech.bitinfodash.domain.OHLCVT1d;
import com.comonitech.bitinfodash.repository.OHLCVT1dRepository;
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
 * REST controller for managing {@link com.comonitech.bitinfodash.domain.OHLCVT1d}.
 */
@RestController
@RequestMapping("/api/ohlcvt-1-ds")
@Transactional
public class OHLCVT1dResource {

    private final Logger log = LoggerFactory.getLogger(OHLCVT1dResource.class);

    private static final String ENTITY_NAME = "oHLCVT1d";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OHLCVT1dRepository oHLCVT1dRepository;

    public OHLCVT1dResource(OHLCVT1dRepository oHLCVT1dRepository) {
        this.oHLCVT1dRepository = oHLCVT1dRepository;
    }

    /**
     * {@code POST  /ohlcvt-1-ds} : Create a new oHLCVT1d.
     *
     * @param oHLCVT1d the oHLCVT1d to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oHLCVT1d, or with status {@code 400 (Bad Request)} if the oHLCVT1d has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<OHLCVT1d> createOHLCVT1d(@RequestBody OHLCVT1d oHLCVT1d) throws URISyntaxException {
        log.debug("REST request to save OHLCVT1d : {}", oHLCVT1d);
        if (oHLCVT1d.getId() != null) {
            throw new BadRequestAlertException("A new oHLCVT1d cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OHLCVT1d result = oHLCVT1dRepository.save(oHLCVT1d);
        return ResponseEntity
            .created(new URI("/api/ohlcvt-1-ds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ohlcvt-1-ds/:id} : Updates an existing oHLCVT1d.
     *
     * @param id the id of the oHLCVT1d to save.
     * @param oHLCVT1d the oHLCVT1d to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT1d,
     * or with status {@code 400 (Bad Request)} if the oHLCVT1d is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT1d couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<OHLCVT1d> updateOHLCVT1d(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT1d oHLCVT1d
    ) throws URISyntaxException {
        log.debug("REST request to update OHLCVT1d : {}, {}", id, oHLCVT1d);
        if (oHLCVT1d.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT1d.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT1dRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OHLCVT1d result = oHLCVT1dRepository.save(oHLCVT1d);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT1d.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ohlcvt-1-ds/:id} : Partial updates given fields of an existing oHLCVT1d, field will ignore if it is null
     *
     * @param id the id of the oHLCVT1d to save.
     * @param oHLCVT1d the oHLCVT1d to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT1d,
     * or with status {@code 400 (Bad Request)} if the oHLCVT1d is not valid,
     * or with status {@code 404 (Not Found)} if the oHLCVT1d is not found,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT1d couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OHLCVT1d> partialUpdateOHLCVT1d(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT1d oHLCVT1d
    ) throws URISyntaxException {
        log.debug("REST request to partial update OHLCVT1d partially : {}, {}", id, oHLCVT1d);
        if (oHLCVT1d.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT1d.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT1dRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OHLCVT1d> result = oHLCVT1dRepository
            .findById(oHLCVT1d.getId())
            .map(existingOHLCVT1d -> {
                if (oHLCVT1d.getTimestamp() != null) {
                    existingOHLCVT1d.setTimestamp(oHLCVT1d.getTimestamp());
                }
                if (oHLCVT1d.getOpen() != null) {
                    existingOHLCVT1d.setOpen(oHLCVT1d.getOpen());
                }
                if (oHLCVT1d.getHigh() != null) {
                    existingOHLCVT1d.setHigh(oHLCVT1d.getHigh());
                }
                if (oHLCVT1d.getLow() != null) {
                    existingOHLCVT1d.setLow(oHLCVT1d.getLow());
                }
                if (oHLCVT1d.getClose() != null) {
                    existingOHLCVT1d.setClose(oHLCVT1d.getClose());
                }
                if (oHLCVT1d.getVolume() != null) {
                    existingOHLCVT1d.setVolume(oHLCVT1d.getVolume());
                }
                if (oHLCVT1d.getTrades() != null) {
                    existingOHLCVT1d.setTrades(oHLCVT1d.getTrades());
                }

                return existingOHLCVT1d;
            })
            .map(oHLCVT1dRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT1d.getId().toString())
        );
    }

    /**
     * {@code GET  /ohlcvt-1-ds} : get all the oHLCVT1ds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of oHLCVT1ds in body.
     */
    @GetMapping("")
    public List<OHLCVT1d> getAllOHLCVT1ds() {
        log.debug("REST request to get all OHLCVT1ds");
        return oHLCVT1dRepository.findAll();
    }

    /**
     * {@code GET  /ohlcvt-1-ds/:id} : get the "id" oHLCVT1d.
     *
     * @param id the id of the oHLCVT1d to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oHLCVT1d, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OHLCVT1d> getOHLCVT1d(@PathVariable Long id) {
        log.debug("REST request to get OHLCVT1d : {}", id);
        Optional<OHLCVT1d> oHLCVT1d = oHLCVT1dRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(oHLCVT1d);
    }

    /**
     * {@code DELETE  /ohlcvt-1-ds/:id} : delete the "id" oHLCVT1d.
     *
     * @param id the id of the oHLCVT1d to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOHLCVT1d(@PathVariable Long id) {
        log.debug("REST request to delete OHLCVT1d : {}", id);
        oHLCVT1dRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
