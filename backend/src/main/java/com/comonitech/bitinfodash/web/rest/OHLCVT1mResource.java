package com.comonitech.bitinfodash.web.rest;

import com.comonitech.bitinfodash.domain.OHLCVT1m;
import com.comonitech.bitinfodash.repository.OHLCVT1mRepository;
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
 * REST controller for managing {@link com.comonitech.bitinfodash.domain.OHLCVT1m}.
 */
@RestController
@RequestMapping("/api/ohlcvt-1-ms")
@Transactional
public class OHLCVT1mResource {

    private final Logger log = LoggerFactory.getLogger(OHLCVT1mResource.class);

    private static final String ENTITY_NAME = "oHLCVT1m";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OHLCVT1mRepository oHLCVT1mRepository;

    public OHLCVT1mResource(OHLCVT1mRepository oHLCVT1mRepository) {
        this.oHLCVT1mRepository = oHLCVT1mRepository;
    }

    /**
     * {@code POST  /ohlcvt-1-ms} : Create a new oHLCVT1m.
     *
     * @param oHLCVT1m the oHLCVT1m to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oHLCVT1m, or with status {@code 400 (Bad Request)} if the oHLCVT1m has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<OHLCVT1m> createOHLCVT1m(@RequestBody OHLCVT1m oHLCVT1m) throws URISyntaxException {
        log.debug("REST request to save OHLCVT1m : {}", oHLCVT1m);
        if (oHLCVT1m.getId() != null) {
            throw new BadRequestAlertException("A new oHLCVT1m cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OHLCVT1m result = oHLCVT1mRepository.save(oHLCVT1m);
        return ResponseEntity
            .created(new URI("/api/ohlcvt-1-ms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ohlcvt-1-ms/:id} : Updates an existing oHLCVT1m.
     *
     * @param id the id of the oHLCVT1m to save.
     * @param oHLCVT1m the oHLCVT1m to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT1m,
     * or with status {@code 400 (Bad Request)} if the oHLCVT1m is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT1m couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<OHLCVT1m> updateOHLCVT1m(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT1m oHLCVT1m
    ) throws URISyntaxException {
        log.debug("REST request to update OHLCVT1m : {}, {}", id, oHLCVT1m);
        if (oHLCVT1m.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT1m.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT1mRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OHLCVT1m result = oHLCVT1mRepository.save(oHLCVT1m);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT1m.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ohlcvt-1-ms/:id} : Partial updates given fields of an existing oHLCVT1m, field will ignore if it is null
     *
     * @param id the id of the oHLCVT1m to save.
     * @param oHLCVT1m the oHLCVT1m to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT1m,
     * or with status {@code 400 (Bad Request)} if the oHLCVT1m is not valid,
     * or with status {@code 404 (Not Found)} if the oHLCVT1m is not found,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT1m couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OHLCVT1m> partialUpdateOHLCVT1m(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT1m oHLCVT1m
    ) throws URISyntaxException {
        log.debug("REST request to partial update OHLCVT1m partially : {}, {}", id, oHLCVT1m);
        if (oHLCVT1m.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT1m.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT1mRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OHLCVT1m> result = oHLCVT1mRepository
            .findById(oHLCVT1m.getId())
            .map(existingOHLCVT1m -> {
                if (oHLCVT1m.getTimestamp() != null) {
                    existingOHLCVT1m.setTimestamp(oHLCVT1m.getTimestamp());
                }
                if (oHLCVT1m.getOpen() != null) {
                    existingOHLCVT1m.setOpen(oHLCVT1m.getOpen());
                }
                if (oHLCVT1m.getHigh() != null) {
                    existingOHLCVT1m.setHigh(oHLCVT1m.getHigh());
                }
                if (oHLCVT1m.getLow() != null) {
                    existingOHLCVT1m.setLow(oHLCVT1m.getLow());
                }
                if (oHLCVT1m.getClose() != null) {
                    existingOHLCVT1m.setClose(oHLCVT1m.getClose());
                }
                if (oHLCVT1m.getVolume() != null) {
                    existingOHLCVT1m.setVolume(oHLCVT1m.getVolume());
                }
                if (oHLCVT1m.getTrades() != null) {
                    existingOHLCVT1m.setTrades(oHLCVT1m.getTrades());
                }

                return existingOHLCVT1m;
            })
            .map(oHLCVT1mRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT1m.getId().toString())
        );
    }

    /**
     * {@code GET  /ohlcvt-1-ms} : get all the oHLCVT1ms.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of oHLCVT1ms in body.
     */
    @GetMapping("")
    public List<OHLCVT1m> getAllOHLCVT1ms() {
        log.debug("REST request to get all OHLCVT1ms");
        return oHLCVT1mRepository.findAll();
    }

    /**
     * {@code GET  /ohlcvt-1-ms/:id} : get the "id" oHLCVT1m.
     *
     * @param id the id of the oHLCVT1m to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oHLCVT1m, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OHLCVT1m> getOHLCVT1m(@PathVariable Long id) {
        log.debug("REST request to get OHLCVT1m : {}", id);
        Optional<OHLCVT1m> oHLCVT1m = oHLCVT1mRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(oHLCVT1m);
    }

    /**
     * {@code DELETE  /ohlcvt-1-ms/:id} : delete the "id" oHLCVT1m.
     *
     * @param id the id of the oHLCVT1m to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOHLCVT1m(@PathVariable Long id) {
        log.debug("REST request to delete OHLCVT1m : {}", id);
        oHLCVT1mRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
