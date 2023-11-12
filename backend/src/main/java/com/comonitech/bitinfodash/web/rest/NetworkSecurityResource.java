package com.comonitech.bitinfodash.web.rest;

import com.comonitech.bitinfodash.domain.NetworkSecurity;
import com.comonitech.bitinfodash.repository.NetworkSecurityRepository;
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
 * REST controller for managing {@link com.comonitech.bitinfodash.domain.NetworkSecurity}.
 */
@RestController
@RequestMapping("/api/network-securities")
@Transactional
public class NetworkSecurityResource {

    private final Logger log = LoggerFactory.getLogger(NetworkSecurityResource.class);

    private static final String ENTITY_NAME = "networkSecurity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NetworkSecurityRepository networkSecurityRepository;

    public NetworkSecurityResource(NetworkSecurityRepository networkSecurityRepository) {
        this.networkSecurityRepository = networkSecurityRepository;
    }

    /**
     * {@code POST  /network-securities} : Create a new networkSecurity.
     *
     * @param networkSecurity the networkSecurity to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new networkSecurity, or with status {@code 400 (Bad Request)} if the networkSecurity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<NetworkSecurity> createNetworkSecurity(@RequestBody NetworkSecurity networkSecurity) throws URISyntaxException {
        log.debug("REST request to save NetworkSecurity : {}", networkSecurity);
        if (networkSecurity.getId() != null) {
            throw new BadRequestAlertException("A new networkSecurity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NetworkSecurity result = networkSecurityRepository.save(networkSecurity);
        return ResponseEntity
            .created(new URI("/api/network-securities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /network-securities/:id} : Updates an existing networkSecurity.
     *
     * @param id the id of the networkSecurity to save.
     * @param networkSecurity the networkSecurity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated networkSecurity,
     * or with status {@code 400 (Bad Request)} if the networkSecurity is not valid,
     * or with status {@code 500 (Internal Server Error)} if the networkSecurity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<NetworkSecurity> updateNetworkSecurity(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NetworkSecurity networkSecurity
    ) throws URISyntaxException {
        log.debug("REST request to update NetworkSecurity : {}, {}", id, networkSecurity);
        if (networkSecurity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, networkSecurity.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!networkSecurityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NetworkSecurity result = networkSecurityRepository.save(networkSecurity);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, networkSecurity.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /network-securities/:id} : Partial updates given fields of an existing networkSecurity, field will ignore if it is null
     *
     * @param id the id of the networkSecurity to save.
     * @param networkSecurity the networkSecurity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated networkSecurity,
     * or with status {@code 400 (Bad Request)} if the networkSecurity is not valid,
     * or with status {@code 404 (Not Found)} if the networkSecurity is not found,
     * or with status {@code 500 (Internal Server Error)} if the networkSecurity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<NetworkSecurity> partialUpdateNetworkSecurity(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NetworkSecurity networkSecurity
    ) throws URISyntaxException {
        log.debug("REST request to partial update NetworkSecurity partially : {}, {}", id, networkSecurity);
        if (networkSecurity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, networkSecurity.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!networkSecurityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NetworkSecurity> result = networkSecurityRepository
            .findById(networkSecurity.getId())
            .map(existingNetworkSecurity -> {
                if (networkSecurity.getAlertType() != null) {
                    existingNetworkSecurity.setAlertType(networkSecurity.getAlertType());
                }
                if (networkSecurity.getDescription() != null) {
                    existingNetworkSecurity.setDescription(networkSecurity.getDescription());
                }
                if (networkSecurity.getTimestamp() != null) {
                    existingNetworkSecurity.setTimestamp(networkSecurity.getTimestamp());
                }
                if (networkSecurity.getSeverity() != null) {
                    existingNetworkSecurity.setSeverity(networkSecurity.getSeverity());
                }
                if (networkSecurity.getResolution() != null) {
                    existingNetworkSecurity.setResolution(networkSecurity.getResolution());
                }

                return existingNetworkSecurity;
            })
            .map(networkSecurityRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, networkSecurity.getId().toString())
        );
    }

    /**
     * {@code GET  /network-securities} : get all the networkSecurities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of networkSecurities in body.
     */
    @GetMapping("")
    public List<NetworkSecurity> getAllNetworkSecurities() {
        log.debug("REST request to get all NetworkSecurities");
        return networkSecurityRepository.findAll();
    }

    /**
     * {@code GET  /network-securities/:id} : get the "id" networkSecurity.
     *
     * @param id the id of the networkSecurity to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the networkSecurity, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<NetworkSecurity> getNetworkSecurity(@PathVariable Long id) {
        log.debug("REST request to get NetworkSecurity : {}", id);
        Optional<NetworkSecurity> networkSecurity = networkSecurityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(networkSecurity);
    }

    /**
     * {@code DELETE  /network-securities/:id} : delete the "id" networkSecurity.
     *
     * @param id the id of the networkSecurity to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNetworkSecurity(@PathVariable Long id) {
        log.debug("REST request to delete NetworkSecurity : {}", id);
        networkSecurityRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
