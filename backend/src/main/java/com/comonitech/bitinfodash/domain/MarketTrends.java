package com.comonitech.bitinfodash.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MarketTrends.
 */
@Entity
@Table(name = "market_trends")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MarketTrends implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "trend_name")
    private String trendName;

    @Column(name = "indicator_value")
    private Double indicatorValue;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(name = "trend_type")
    private String trendType;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public MarketTrends id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrendName() {
        return this.trendName;
    }

    public MarketTrends trendName(String trendName) {
        this.setTrendName(trendName);
        return this;
    }

    public void setTrendName(String trendName) {
        this.trendName = trendName;
    }

    public Double getIndicatorValue() {
        return this.indicatorValue;
    }

    public MarketTrends indicatorValue(Double indicatorValue) {
        this.setIndicatorValue(indicatorValue);
        return this;
    }

    public void setIndicatorValue(Double indicatorValue) {
        this.indicatorValue = indicatorValue;
    }

    public Instant getTimestamp() {
        return this.timestamp;
    }

    public MarketTrends timestamp(Instant timestamp) {
        this.setTimestamp(timestamp);
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getTrendType() {
        return this.trendType;
    }

    public MarketTrends trendType(String trendType) {
        this.setTrendType(trendType);
        return this;
    }

    public void setTrendType(String trendType) {
        this.trendType = trendType;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MarketTrends)) {
            return false;
        }
        return getId() != null && getId().equals(((MarketTrends) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MarketTrends{" +
            "id=" + getId() +
            ", trendName='" + getTrendName() + "'" +
            ", indicatorValue=" + getIndicatorValue() +
            ", timestamp='" + getTimestamp() + "'" +
            ", trendType='" + getTrendType() + "'" +
            "}";
    }
}
