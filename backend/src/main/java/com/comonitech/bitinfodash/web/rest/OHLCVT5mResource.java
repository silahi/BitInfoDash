package com.comonitech.bitinfodash.web.rest;

import com.comonitech.bitinfodash.domain.OHLCVT5m;
import com.comonitech.bitinfodash.repository.OHLCVT5mRepository;
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
 * REST controller for managing {@link com.comonitech.bitinfodash.domain.OHLCVT5m}.
 */
@RestController
@RequestMapping("/api/ohlcvt-5-ms")
@Transactional
public class OHLCVT5mResource {

    private final Logger log = LoggerFactory.getLogger(OHLCVT5mResource.class);

    private static final String ENTITY_NAME = "oHLCVT5m";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OHLCVT5mRepository oHLCVT5mRepository;

    public OHLCVT5mResource(OHLCVT5mRepository oHLCVT5mRepository) {
        this.oHLCVT5mRepository = oHLCVT5mRepository;
    }

    /**
     * {@code POST  /ohlcvt-5-ms} : Create a new oHLCVT5m.
     *
     * @param oHLCVT5m the oHLCVT5m to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oHLCVT5m, or with status {@code 400 (Bad Request)} if the oHLCVT5m has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<OHLCVT5m> createOHLCVT5m(@RequestBody OHLCVT5m oHLCVT5m) throws URISyntaxException {
        log.debug("REST request to save OHLCVT5m : {}", oHLCVT5m);
        if (oHLCVT5m.getId() != null) {
            throw new BadRequestAlertException("A new oHLCVT5m cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OHLCVT5m result = oHLCVT5mRepository.save(oHLCVT5m);
        return ResponseEntity
            .created(new URI("/api/ohlcvt-5-ms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ohlcvt-5-ms/:id} : Updates an existing oHLCVT5m.
     *
     * @param id the id of the oHLCVT5m to save.
     * @param oHLCVT5m the oHLCVT5m to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT5m,
     * or with status {@code 400 (Bad Request)} if the oHLCVT5m is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT5m couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<OHLCVT5m> updateOHLCVT5m(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT5m oHLCVT5m
    ) throws URISyntaxException {
        log.debug("REST request to update OHLCVT5m : {}, {}", id, oHLCVT5m);
        if (oHLCVT5m.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT5m.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT5mRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OHLCVT5m result = oHLCVT5mRepository.save(oHLCVT5m);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT5m.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ohlcvt-5-ms/:id} : Partial updates given fields of an existing oHLCVT5m, field will ignore if it is null
     *
     * @param id the id of the oHLCVT5m to save.
     * @param oHLCVT5m the oHLCVT5m to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT5m,
     * or with status {@code 400 (Bad Request)} if the oHLCVT5m is not valid,
     * or with status {@code 404 (Not Found)} if the oHLCVT5m is not found,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT5m couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OHLCVT5m> partialUpdateOHLCVT5m(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT5m oHLCVT5m
    ) throws URISyntaxException {
        log.debug("REST request to partial update OHLCVT5m partially : {}, {}", id, oHLCVT5m);
        if (oHLCVT5m.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT5m.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT5mRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OHLCVT5m> result = oHLCVT5mRepository
            .findById(oHLCVT5m.getId())
            .map(existingOHLCVT5m -> {
                if (oHLCVT5m.getTimestamp() != null) {
                    existingOHLCVT5m.setTimestamp(oHLCVT5m.getTimestamp());
                }
                if (oHLCVT5m.getOpen() != null) {
                    existingOHLCVT5m.setOpen(oHLCVT5m.getOpen());
                }
                if (oHLCVT5m.getHigh() != null) {
                    existingOHLCVT5m.setHigh(oHLCVT5m.getHigh());
                }
                if (oHLCVT5m.getLow() != null) {
                    existingOHLCVT5m.setLow(oHLCVT5m.getLow());
                }
                if (oHLCVT5m.getClose() != null) {
                    existingOHLCVT5m.setClose(oHLCVT5m.getClose());
                }
                if (oHLCVT5m.getVolume() != null) {
                    existingOHLCVT5m.setVolume(oHLCVT5m.getVolume());
                }
                if (oHLCVT5m.getTrades() != null) {
                    existingOHLCVT5m.setTrades(oHLCVT5m.getTrades());
                }

                return existingOHLCVT5m;
            })
            .map(oHLCVT5mRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT5m.getId().toString())
        );
    }

    /**
     * {@code GET  /ohlcvt-5-ms} : get all the oHLCVT5ms.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of oHLCVT5ms in body.
     */
    @GetMapping("")
    public List<OHLCVT5m> getAllOHLCVT5ms() {
        log.debug("REST request to get all OHLCVT5ms");
        return oHLCVT5mRepository.findAll();
    }

    /**
     * {@code GET  /ohlcvt-5-ms/:id} : get the "id" oHLCVT5m.
     *
     * @param id the id of the oHLCVT5m to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oHLCVT5m, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OHLCVT5m> getOHLCVT5m(@PathVariable Long id) {
        log.debug("REST request to get OHLCVT5m : {}", id);
        Optional<OHLCVT5m> oHLCVT5m = oHLCVT5mRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(oHLCVT5m);
    }

    /**
     * {@code DELETE  /ohlcvt-5-ms/:id} : delete the "id" oHLCVT5m.
     *
     * @param id the id of the oHLCVT5m to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOHLCVT5m(@PathVariable Long id) {
        log.debug("REST request to delete OHLCVT5m : {}", id);
        oHLCVT5mRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
