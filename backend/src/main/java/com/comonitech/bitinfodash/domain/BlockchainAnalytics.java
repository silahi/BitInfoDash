package com.comonitech.bitinfodash.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A BlockchainAnalytics.
 */
@Entity
@Table(name = "blockchain_analytics")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BlockchainAnalytics implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "transaction_count")
    private Integer transactionCount;

    @Column(name = "average_transaction_fee")
    private Double averageTransactionFee;

    @Column(name = "hashrate_distribution")
    private String hashrateDistribution;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(name = "difficulty")
    private Double difficulty;

    @Column(name = "network_hashrate")
    private Double networkHashrate;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public BlockchainAnalytics id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTransactionCount() {
        return this.transactionCount;
    }

    public BlockchainAnalytics transactionCount(Integer transactionCount) {
        this.setTransactionCount(transactionCount);
        return this;
    }

    public void setTransactionCount(Integer transactionCount) {
        this.transactionCount = transactionCount;
    }

    public Double getAverageTransactionFee() {
        return this.averageTransactionFee;
    }

    public BlockchainAnalytics averageTransactionFee(Double averageTransactionFee) {
        this.setAverageTransactionFee(averageTransactionFee);
        return this;
    }

    public void setAverageTransactionFee(Double averageTransactionFee) {
        this.averageTransactionFee = averageTransactionFee;
    }

    public String getHashrateDistribution() {
        return this.hashrateDistribution;
    }

    public BlockchainAnalytics hashrateDistribution(String hashrateDistribution) {
        this.setHashrateDistribution(hashrateDistribution);
        return this;
    }

    public void setHashrateDistribution(String hashrateDistribution) {
        this.hashrateDistribution = hashrateDistribution;
    }

    public Instant getTimestamp() {
        return this.timestamp;
    }

    public BlockchainAnalytics timestamp(Instant timestamp) {
        this.setTimestamp(timestamp);
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Double getDifficulty() {
        return this.difficulty;
    }

    public BlockchainAnalytics difficulty(Double difficulty) {
        this.setDifficulty(difficulty);
        return this;
    }

    public void setDifficulty(Double difficulty) {
        this.difficulty = difficulty;
    }

    public Double getNetworkHashrate() {
        return this.networkHashrate;
    }

    public BlockchainAnalytics networkHashrate(Double networkHashrate) {
        this.setNetworkHashrate(networkHashrate);
        return this;
    }

    public void setNetworkHashrate(Double networkHashrate) {
        this.networkHashrate = networkHashrate;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BlockchainAnalytics)) {
            return false;
        }
        return getId() != null && getId().equals(((BlockchainAnalytics) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BlockchainAnalytics{" +
            "id=" + getId() +
            ", transactionCount=" + getTransactionCount() +
            ", averageTransactionFee=" + getAverageTransactionFee() +
            ", hashrateDistribution='" + getHashrateDistribution() + "'" +
            ", timestamp='" + getTimestamp() + "'" +
            ", difficulty=" + getDifficulty() +
            ", networkHashrate=" + getNetworkHashrate() +
            "}";
    }
}
