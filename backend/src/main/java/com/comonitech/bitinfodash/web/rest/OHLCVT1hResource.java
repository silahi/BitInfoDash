package com.comonitech.bitinfodash.web.rest;

import com.comonitech.bitinfodash.domain.OHLCVT1h;
import com.comonitech.bitinfodash.repository.OHLCVT1hRepository;
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
 * REST controller for managing {@link com.comonitech.bitinfodash.domain.OHLCVT1h}.
 */
@RestController
@RequestMapping("/api/ohlcvt-1-hs")
@Transactional
public class OHLCVT1hResource {

    private final Logger log = LoggerFactory.getLogger(OHLCVT1hResource.class);

    private static final String ENTITY_NAME = "oHLCVT1h";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OHLCVT1hRepository oHLCVT1hRepository;

    public OHLCVT1hResource(OHLCVT1hRepository oHLCVT1hRepository) {
        this.oHLCVT1hRepository = oHLCVT1hRepository;
    }

    /**
     * {@code POST  /ohlcvt-1-hs} : Create a new oHLCVT1h.
     *
     * @param oHLCVT1h the oHLCVT1h to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oHLCVT1h, or with status {@code 400 (Bad Request)} if the oHLCVT1h has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<OHLCVT1h> createOHLCVT1h(@RequestBody OHLCVT1h oHLCVT1h) throws URISyntaxException {
        log.debug("REST request to save OHLCVT1h : {}", oHLCVT1h);
        if (oHLCVT1h.getId() != null) {
            throw new BadRequestAlertException("A new oHLCVT1h cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OHLCVT1h result = oHLCVT1hRepository.save(oHLCVT1h);
        return ResponseEntity
            .created(new URI("/api/ohlcvt-1-hs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ohlcvt-1-hs/:id} : Updates an existing oHLCVT1h.
     *
     * @param id the id of the oHLCVT1h to save.
     * @param oHLCVT1h the oHLCVT1h to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT1h,
     * or with status {@code 400 (Bad Request)} if the oHLCVT1h is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT1h couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<OHLCVT1h> updateOHLCVT1h(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT1h oHLCVT1h
    ) throws URISyntaxException {
        log.debug("REST request to update OHLCVT1h : {}, {}", id, oHLCVT1h);
        if (oHLCVT1h.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT1h.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT1hRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OHLCVT1h result = oHLCVT1hRepository.save(oHLCVT1h);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT1h.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ohlcvt-1-hs/:id} : Partial updates given fields of an existing oHLCVT1h, field will ignore if it is null
     *
     * @param id the id of the oHLCVT1h to save.
     * @param oHLCVT1h the oHLCVT1h to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT1h,
     * or with status {@code 400 (Bad Request)} if the oHLCVT1h is not valid,
     * or with status {@code 404 (Not Found)} if the oHLCVT1h is not found,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT1h couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OHLCVT1h> partialUpdateOHLCVT1h(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT1h oHLCVT1h
    ) throws URISyntaxException {
        log.debug("REST request to partial update OHLCVT1h partially : {}, {}", id, oHLCVT1h);
        if (oHLCVT1h.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT1h.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT1hRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OHLCVT1h> result = oHLCVT1hRepository
            .findById(oHLCVT1h.getId())
            .map(existingOHLCVT1h -> {
                if (oHLCVT1h.getTimestamp() != null) {
                    existingOHLCVT1h.setTimestamp(oHLCVT1h.getTimestamp());
                }
                if (oHLCVT1h.getOpen() != null) {
                    existingOHLCVT1h.setOpen(oHLCVT1h.getOpen());
                }
                if (oHLCVT1h.getHigh() != null) {
                    existingOHLCVT1h.setHigh(oHLCVT1h.getHigh());
                }
                if (oHLCVT1h.getLow() != null) {
                    existingOHLCVT1h.setLow(oHLCVT1h.getLow());
                }
                if (oHLCVT1h.getClose() != null) {
                    existingOHLCVT1h.setClose(oHLCVT1h.getClose());
                }
                if (oHLCVT1h.getVolume() != null) {
                    existingOHLCVT1h.setVolume(oHLCVT1h.getVolume());
                }
                if (oHLCVT1h.getTrades() != null) {
                    existingOHLCVT1h.setTrades(oHLCVT1h.getTrades());
                }

                return existingOHLCVT1h;
            })
            .map(oHLCVT1hRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT1h.getId().toString())
        );
    }

    /**
     * {@code GET  /ohlcvt-1-hs} : get all the oHLCVT1hs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of oHLCVT1hs in body.
     */
    @GetMapping("")
    public List<OHLCVT1h> getAllOHLCVT1hs() {
        log.debug("REST request to get all OHLCVT1hs");
        return oHLCVT1hRepository.findAll();
    }

    /**
     * {@code GET  /ohlcvt-1-hs/:id} : get the "id" oHLCVT1h.
     *
     * @param id the id of the oHLCVT1h to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oHLCVT1h, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OHLCVT1h> getOHLCVT1h(@PathVariable Long id) {
        log.debug("REST request to get OHLCVT1h : {}", id);
        Optional<OHLCVT1h> oHLCVT1h = oHLCVT1hRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(oHLCVT1h);
    }

    /**
     * {@code DELETE  /ohlcvt-1-hs/:id} : delete the "id" oHLCVT1h.
     *
     * @param id the id of the oHLCVT1h to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOHLCVT1h(@PathVariable Long id) {
        log.debug("REST request to delete OHLCVT1h : {}", id);
        oHLCVT1hRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
