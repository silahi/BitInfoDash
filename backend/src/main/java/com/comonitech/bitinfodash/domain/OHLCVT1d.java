package com.comonitech.bitinfodash.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A OHLCVT1d.
 */
@Entity
@Table(name = "ohlcvt_1_d")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OHLCVT1d implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "timestamp")
    private ZonedDateTime timestamp;

    @Column(name = "open")
    private Double open;

    @Column(name = "high")
    private Double high;

    @Column(name = "low")
    private Double low;

    @Column(name = "close")
    private Double close;

    @Column(name = "volume")
    private Long volume;

    @Column(name = "trades")
    private Integer trades;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public OHLCVT1d id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTimestamp() {
        return this.timestamp;
    }

    public OHLCVT1d timestamp(ZonedDateTime timestamp) {
        this.setTimestamp(timestamp);
        return this;
    }

    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Double getOpen() {
        return this.open;
    }

    public OHLCVT1d open(Double open) {
        this.setOpen(open);
        return this;
    }

    public void setOpen(Double open) {
        this.open = open;
    }

    public Double getHigh() {
        return this.high;
    }

    public OHLCVT1d high(Double high) {
        this.setHigh(high);
        return this;
    }

    public void setHigh(Double high) {
        this.high = high;
    }

    public Double getLow() {
        return this.low;
    }

    public OHLCVT1d low(Double low) {
        this.setLow(low);
        return this;
    }

    public void setLow(Double low) {
        this.low = low;
    }

    public Double getClose() {
        return this.close;
    }

    public OHLCVT1d close(Double close) {
        this.setClose(close);
        return this;
    }

    public void setClose(Double close) {
        this.close = close;
    }

    public Long getVolume() {
        return this.volume;
    }

    public OHLCVT1d volume(Long volume) {
        this.setVolume(volume);
        return this;
    }

    public void setVolume(Long volume) {
        this.volume = volume;
    }

    public Integer getTrades() {
        return this.trades;
    }

    public OHLCVT1d trades(Integer trades) {
        this.setTrades(trades);
        return this;
    }

    public void setTrades(Integer trades) {
        this.trades = trades;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OHLCVT1d)) {
            return false;
        }
        return getId() != null && getId().equals(((OHLCVT1d) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OHLCVT1d{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", open=" + getOpen() +
            ", high=" + getHigh() +
            ", low=" + getLow() +
            ", close=" + getClose() +
            ", volume=" + getVolume() +
            ", trades=" + getTrades() +
            "}";
    }
}
