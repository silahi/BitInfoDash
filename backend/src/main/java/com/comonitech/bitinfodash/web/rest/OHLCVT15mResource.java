package com.comonitech.bitinfodash.web.rest;

import com.comonitech.bitinfodash.domain.OHLCVT15m;
import com.comonitech.bitinfodash.repository.OHLCVT15mRepository;
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
 * REST controller for managing {@link com.comonitech.bitinfodash.domain.OHLCVT15m}.
 */
@RestController
@RequestMapping("/api/ohlcvt-15-ms")
@Transactional
public class OHLCVT15mResource {

    private final Logger log = LoggerFactory.getLogger(OHLCVT15mResource.class);

    private static final String ENTITY_NAME = "oHLCVT15m";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OHLCVT15mRepository oHLCVT15mRepository;

    public OHLCVT15mResource(OHLCVT15mRepository oHLCVT15mRepository) {
        this.oHLCVT15mRepository = oHLCVT15mRepository;
    }

    /**
     * {@code POST  /ohlcvt-15-ms} : Create a new oHLCVT15m.
     *
     * @param oHLCVT15m the oHLCVT15m to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oHLCVT15m, or with status {@code 400 (Bad Request)} if the oHLCVT15m has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<OHLCVT15m> createOHLCVT15m(@RequestBody OHLCVT15m oHLCVT15m) throws URISyntaxException {
        log.debug("REST request to save OHLCVT15m : {}", oHLCVT15m);
        if (oHLCVT15m.getId() != null) {
            throw new BadRequestAlertException("A new oHLCVT15m cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OHLCVT15m result = oHLCVT15mRepository.save(oHLCVT15m);
        return ResponseEntity
            .created(new URI("/api/ohlcvt-15-ms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ohlcvt-15-ms/:id} : Updates an existing oHLCVT15m.
     *
     * @param id the id of the oHLCVT15m to save.
     * @param oHLCVT15m the oHLCVT15m to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT15m,
     * or with status {@code 400 (Bad Request)} if the oHLCVT15m is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT15m couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<OHLCVT15m> updateOHLCVT15m(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT15m oHLCVT15m
    ) throws URISyntaxException {
        log.debug("REST request to update OHLCVT15m : {}, {}", id, oHLCVT15m);
        if (oHLCVT15m.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT15m.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT15mRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OHLCVT15m result = oHLCVT15mRepository.save(oHLCVT15m);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT15m.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ohlcvt-15-ms/:id} : Partial updates given fields of an existing oHLCVT15m, field will ignore if it is null
     *
     * @param id the id of the oHLCVT15m to save.
     * @param oHLCVT15m the oHLCVT15m to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT15m,
     * or with status {@code 400 (Bad Request)} if the oHLCVT15m is not valid,
     * or with status {@code 404 (Not Found)} if the oHLCVT15m is not found,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT15m couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OHLCVT15m> partialUpdateOHLCVT15m(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT15m oHLCVT15m
    ) throws URISyntaxException {
        log.debug("REST request to partial update OHLCVT15m partially : {}, {}", id, oHLCVT15m);
        if (oHLCVT15m.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT15m.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT15mRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OHLCVT15m> result = oHLCVT15mRepository
            .findById(oHLCVT15m.getId())
            .map(existingOHLCVT15m -> {
                if (oHLCVT15m.getTimestamp() != null) {
                    existingOHLCVT15m.setTimestamp(oHLCVT15m.getTimestamp());
                }
                if (oHLCVT15m.getOpen() != null) {
                    existingOHLCVT15m.setOpen(oHLCVT15m.getOpen());
                }
                if (oHLCVT15m.getHigh() != null) {
                    existingOHLCVT15m.setHigh(oHLCVT15m.getHigh());
                }
                if (oHLCVT15m.getLow() != null) {
                    existingOHLCVT15m.setLow(oHLCVT15m.getLow());
                }
                if (oHLCVT15m.getClose() != null) {
                    existingOHLCVT15m.setClose(oHLCVT15m.getClose());
                }
                if (oHLCVT15m.getVolume() != null) {
                    existingOHLCVT15m.setVolume(oHLCVT15m.getVolume());
                }
                if (oHLCVT15m.getTrades() != null) {
                    existingOHLCVT15m.setTrades(oHLCVT15m.getTrades());
                }

                return existingOHLCVT15m;
            })
            .map(oHLCVT15mRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT15m.getId().toString())
        );
    }

    /**
     * {@code GET  /ohlcvt-15-ms} : get all the oHLCVT15ms.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of oHLCVT15ms in body.
     */
    @GetMapping("")
    public List<OHLCVT15m> getAllOHLCVT15ms() {
        log.debug("REST request to get all OHLCVT15ms");
        return oHLCVT15mRepository.findAll();
    }

    /**
     * {@code GET  /ohlcvt-15-ms/:id} : get the "id" oHLCVT15m.
     *
     * @param id the id of the oHLCVT15m to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oHLCVT15m, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OHLCVT15m> getOHLCVT15m(@PathVariable Long id) {
        log.debug("REST request to get OHLCVT15m : {}", id);
        Optional<OHLCVT15m> oHLCVT15m = oHLCVT15mRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(oHLCVT15m);
    }

    /**
     * {@code DELETE  /ohlcvt-15-ms/:id} : delete the "id" oHLCVT15m.
     *
     * @param id the id of the oHLCVT15m to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOHLCVT15m(@PathVariable Long id) {
        log.debug("REST request to delete OHLCVT15m : {}", id);
        oHLCVT15mRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
