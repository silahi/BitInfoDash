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

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(name = "currency")
    private String currency;

    @Column(name = "volume_change_24_h")
    private Double volumeChange24h;

    @Column(name = "percent_change_1_h")
    private Double percentChange1h;

    @Column(name = "percent_change_24_h")
    private Double percentChange24h;

    @Column(name = "percent_change_7_d")
    private Double percentChange7d;

    @Column(name = "percent_change_30_d")
    private Double percentChange30d;

    @Column(name = "percent_change_60_d")
    private Double percentChange60d;

    @Column(name = "percent_change_90_d")
    private Double percentChange90d;

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

    public Double getVolumeChange24h() {
        return this.volumeChange24h;
    }

    public BitcoinOverview volumeChange24h(Double volumeChange24h) {
        this.setVolumeChange24h(volumeChange24h);
        return this;
    }

    public void setVolumeChange24h(Double volumeChange24h) {
        this.volumeChange24h = volumeChange24h;
    }

    public Double getPercentChange1h() {
        return this.percentChange1h;
    }

    public BitcoinOverview percentChange1h(Double percentChange1h) {
        this.setPercentChange1h(percentChange1h);
        return this;
    }

    public void setPercentChange1h(Double percentChange1h) {
        this.percentChange1h = percentChange1h;
    }

    public Double getPercentChange24h() {
        return this.percentChange24h;
    }

    public BitcoinOverview percentChange24h(Double percentChange24h) {
        this.setPercentChange24h(percentChange24h);
        return this;
    }

    public void setPercentChange24h(Double percentChange24h) {
        this.percentChange24h = percentChange24h;
    }

    public Double getPercentChange7d() {
        return this.percentChange7d;
    }

    public BitcoinOverview percentChange7d(Double percentChange7d) {
        this.setPercentChange7d(percentChange7d);
        return this;
    }

    public void setPercentChange7d(Double percentChange7d) {
        this.percentChange7d = percentChange7d;
    }

    public Double getPercentChange30d() {
        return this.percentChange30d;
    }

    public BitcoinOverview percentChange30d(Double percentChange30d) {
        this.setPercentChange30d(percentChange30d);
        return this;
    }

    public void setPercentChange30d(Double percentChange30d) {
        this.percentChange30d = percentChange30d;
    }

    public Double getPercentChange60d() {
        return this.percentChange60d;
    }

    public BitcoinOverview percentChange60d(Double percentChange60d) {
        this.setPercentChange60d(percentChange60d);
        return this;
    }

    public void setPercentChange60d(Double percentChange60d) {
        this.percentChange60d = percentChange60d;
    }

    public Double getPercentChange90d() {
        return this.percentChange90d;
    }

    public BitcoinOverview percentChange90d(Double percentChange90d) {
        this.setPercentChange90d(percentChange90d);
        return this;
    }

    public void setPercentChange90d(Double percentChange90d) {
        this.percentChange90d = percentChange90d;
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
            ", timestamp='" + getTimestamp() + "'" +
            ", currency='" + getCurrency() + "'" +
            ", volumeChange24h=" + getVolumeChange24h() +
            ", percentChange1h=" + getPercentChange1h() +
            ", percentChange24h=" + getPercentChange24h() +
            ", percentChange7d=" + getPercentChange7d() +
            ", percentChange30d=" + getPercentChange30d() +
            ", percentChange60d=" + getPercentChange60d() +
            ", percentChange90d=" + getPercentChange90d() +
            "}";
    }
}
