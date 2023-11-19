package com.comonitech.bitinfodash.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A BitcoinOverview.
 */
@Entity
@Table(name = "bitcoin_overview")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BitcoinOverview implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "bitcoin_price")
    private Double bitcoinPrice;

    @Column(name = "market_cap")
    private Double marketCap;

    @Column(name = "exchange_volume")
    private Double exchangeVolume;

    @Column(name = "recent_variation")
    private Double recentVariation;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(name = "currency")
    private String currency = "USD";

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public BitcoinOverview id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getBitcoinPrice() {
        return this.bitcoinPrice;
    }

    public BitcoinOverview bitcoinPrice(Double bitcoinPrice) {
        this.setBitcoinPrice(bitcoinPrice);
        return this;
    }

    public void setBitcoinPrice(Double bitcoinPrice) {
        this.bitcoinPrice = bitcoinPrice;
    }

    public Double getMarketCap() {
        return this.marketCap;
    }

    public BitcoinOverview marketCap(Double marketCap) {
        this.setMarketCap(marketCap);
        return this;
    }

    public void setMarketCap(Double marketCap) {
        this.marketCap = marketCap;
    }

    public Double getExchangeVolume() {
        return this.exchangeVolume;
    }

    public BitcoinOverview exchangeVolume(Double exchangeVolume) {
        this.setExchangeVolume(exchangeVolume);
        return this;
    }

    public void setExchangeVolume(Double exchangeVolume) {
        this.exchangeVolume = exchangeVolume;
    }

    public Double getRecentVariation() {
        return this.recentVariation;
    }

    public BitcoinOverview recentVariation(Double recentVariation) {
        this.setRecentVariation(recentVariation);
        return this;
    }

    public void setRecentVariation(Double recentVariation) {
        this.recentVariation = recentVariation;
    }

    public Instant getTimestamp() {
        return this.timestamp;
    }

    public BitcoinOverview timestamp(Instant timestamp) {
        this.setTimestamp(timestamp);
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getCurrency() {
        return this.currency;
    }

    public BitcoinOverview currency(String currency) {
        this.setCurrency(currency);
        return this;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BitcoinOverview)) {
            return false;
        }
        return getId() != null && getId().equals(((BitcoinOverview) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BitcoinOverview{" +
            "id=" + getId() +
            ", bitcoinPrice=" + getBitcoinPrice() +
            ", marketCap=" + getMarketCap() +
            ", exchangeVolume=" + getExchangeVolume() +
            ", recentVariation=" + getRecentVariation() +
            ", timestamp='" + getTimestamp() + "'" +
            ", currency='" + getCurrency() + "'" +
            "}";
    }
}
