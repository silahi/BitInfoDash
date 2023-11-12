package com.comonitech.bitinfodash.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A NetworkSecurity.
 */
@Entity
@Table(name = "network_security")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NetworkSecurity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "alert_type")
    private String alertType;

    @Column(name = "description")
    private String description;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(name = "severity")
    private String severity;

    @Column(name = "resolution")
    private String resolution;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public NetworkSecurity id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlertType() {
        return this.alertType;
    }

    public NetworkSecurity alertType(String alertType) {
        this.setAlertType(alertType);
        return this;
    }

    public void setAlertType(String alertType) {
        this.alertType = alertType;
    }

    public String getDescription() {
        return this.description;
    }

    public NetworkSecurity description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getTimestamp() {
        return this.timestamp;
    }

    public NetworkSecurity timestamp(Instant timestamp) {
        this.setTimestamp(timestamp);
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getSeverity() {
        return this.severity;
    }

    public NetworkSecurity severity(String severity) {
        this.setSeverity(severity);
        return this;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getResolution() {
        return this.resolution;
    }

    public NetworkSecurity resolution(String resolution) {
        this.setResolution(resolution);
        return this;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NetworkSecurity)) {
            return false;
        }
        return getId() != null && getId().equals(((NetworkSecurity) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NetworkSecurity{" +
            "id=" + getId() +
            ", alertType='" + getAlertType() + "'" +
            ", description='" + getDescription() + "'" +
            ", timestamp='" + getTimestamp() + "'" +
            ", severity='" + getSeverity() + "'" +
            ", resolution='" + getResolution() + "'" +
            "}";
    }
}
