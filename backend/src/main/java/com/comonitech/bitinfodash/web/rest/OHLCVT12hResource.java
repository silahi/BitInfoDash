package com.comonitech.bitinfodash.web.rest;

import com.comonitech.bitinfodash.domain.OHLCVT12h;
import com.comonitech.bitinfodash.repository.OHLCVT12hRepository;
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
 * REST controller for managing {@link com.comonitech.bitinfodash.domain.OHLCVT12h}.
 */
@RestController
@RequestMapping("/api/ohlcvt-12-hs")
@Transactional
public class OHLCVT12hResource {

    private final Logger log = LoggerFactory.getLogger(OHLCVT12hResource.class);

    private static final String ENTITY_NAME = "oHLCVT12h";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OHLCVT12hRepository oHLCVT12hRepository;

    public OHLCVT12hResource(OHLCVT12hRepository oHLCVT12hRepository) {
        this.oHLCVT12hRepository = oHLCVT12hRepository;
    }

    /**
     * {@code POST  /ohlcvt-12-hs} : Create a new oHLCVT12h.
     *
     * @param oHLCVT12h the oHLCVT12h to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oHLCVT12h, or with status {@code 400 (Bad Request)} if the oHLCVT12h has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<OHLCVT12h> createOHLCVT12h(@RequestBody OHLCVT12h oHLCVT12h) throws URISyntaxException {
        log.debug("REST request to save OHLCVT12h : {}", oHLCVT12h);
        if (oHLCVT12h.getId() != null) {
            throw new BadRequestAlertException("A new oHLCVT12h cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OHLCVT12h result = oHLCVT12hRepository.save(oHLCVT12h);
        return ResponseEntity
            .created(new URI("/api/ohlcvt-12-hs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ohlcvt-12-hs/:id} : Updates an existing oHLCVT12h.
     *
     * @param id the id of the oHLCVT12h to save.
     * @param oHLCVT12h the oHLCVT12h to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT12h,
     * or with status {@code 400 (Bad Request)} if the oHLCVT12h is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT12h couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<OHLCVT12h> updateOHLCVT12h(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT12h oHLCVT12h
    ) throws URISyntaxException {
        log.debug("REST request to update OHLCVT12h : {}, {}", id, oHLCVT12h);
        if (oHLCVT12h.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT12h.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT12hRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OHLCVT12h result = oHLCVT12hRepository.save(oHLCVT12h);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT12h.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ohlcvt-12-hs/:id} : Partial updates given fields of an existing oHLCVT12h, field will ignore if it is null
     *
     * @param id the id of the oHLCVT12h to save.
     * @param oHLCVT12h the oHLCVT12h to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oHLCVT12h,
     * or with status {@code 400 (Bad Request)} if the oHLCVT12h is not valid,
     * or with status {@code 404 (Not Found)} if the oHLCVT12h is not found,
     * or with status {@code 500 (Internal Server Error)} if the oHLCVT12h couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OHLCVT12h> partialUpdateOHLCVT12h(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OHLCVT12h oHLCVT12h
    ) throws URISyntaxException {
        log.debug("REST request to partial update OHLCVT12h partially : {}, {}", id, oHLCVT12h);
        if (oHLCVT12h.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oHLCVT12h.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!oHLCVT12hRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OHLCVT12h> result = oHLCVT12hRepository
            .findById(oHLCVT12h.getId())
            .map(existingOHLCVT12h -> {
                if (oHLCVT12h.getTimestamp() != null) {
                    existingOHLCVT12h.setTimestamp(oHLCVT12h.getTimestamp());
                }
                if (oHLCVT12h.getOpen() != null) {
                    existingOHLCVT12h.setOpen(oHLCVT12h.getOpen());
                }
                if (oHLCVT12h.getHigh() != null) {
                    existingOHLCVT12h.setHigh(oHLCVT12h.getHigh());
                }
                if (oHLCVT12h.getLow() != null) {
                    existingOHLCVT12h.setLow(oHLCVT12h.getLow());
                }
                if (oHLCVT12h.getClose() != null) {
                    existingOHLCVT12h.setClose(oHLCVT12h.getClose());
                }
                if (oHLCVT12h.getVolume() != null) {
                    existingOHLCVT12h.setVolume(oHLCVT12h.getVolume());
                }
                if (oHLCVT12h.getTrades() != null) {
                    existingOHLCVT12h.setTrades(oHLCVT12h.getTrades());
                }

                return existingOHLCVT12h;
            })
            .map(oHLCVT12hRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oHLCVT12h.getId().toString())
        );
    }

    /**
     * {@code GET  /ohlcvt-12-hs} : get all the oHLCVT12hs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of oHLCVT12hs in body.
     */
    @GetMapping("")
    public List<OHLCVT12h> getAllOHLCVT12hs() {
        log.debug("REST request to get all OHLCVT12hs");
        return oHLCVT12hRepository.findAll();
    }

    /**
     * {@code GET  /ohlcvt-12-hs/:id} : get the "id" oHLCVT12h.
     *
     * @param id the id of the oHLCVT12h to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oHLCVT12h, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OHLCVT12h> getOHLCVT12h(@PathVariable Long id) {
        log.debug("REST request to get OHLCVT12h : {}", id);
        Optional<OHLCVT12h> oHLCVT12h = oHLCVT12hRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(oHLCVT12h);
    }

    /**
     * {@code DELETE  /ohlcvt-12-hs/:id} : delete the "id" oHLCVT12h.
     *
     * @param id the id of the oHLCVT12h to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOHLCVT12h(@PathVariable Long id) {
        log.debug("REST request to delete OHLCVT12h : {}", id);
        oHLCVT12hRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
