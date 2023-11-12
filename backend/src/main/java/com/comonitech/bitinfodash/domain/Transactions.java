package com.comonitech.bitinfodash.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Transactions.
 */
@Entity
@Table(name = "transactions")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Transactions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "transaction_date")
    private Instant transactionDate;

    @Column(name = "sender_address")
    private String senderAddress;

    @Column(name = "recipient_address")
    private String recipientAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "transactions" }, allowSetters = true)
    private BitcoinAddress bitcoinAddress;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Transactions id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return this.amount;
    }

    public Transactions amount(Double amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Instant getTransactionDate() {
        return this.transactionDate;
    }

    public Transactions transactionDate(Instant transactionDate) {
        this.setTransactionDate(transactionDate);
        return this;
    }

    public void setTransactionDate(Instant transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getSenderAddress() {
        return this.senderAddress;
    }

    public Transactions senderAddress(String senderAddress) {
        this.setSenderAddress(senderAddress);
        return this;
    }

    public void setSenderAddress(String senderAddress) {
        this.senderAddress = senderAddress;
    }

    public String getRecipientAddress() {
        return this.recipientAddress;
    }

    public Transactions recipientAddress(String recipientAddress) {
        this.setRecipientAddress(recipientAddress);
        return this;
    }

    public void setRecipientAddress(String recipientAddress) {
        this.recipientAddress = recipientAddress;
    }

    public BitcoinAddress getBitcoinAddress() {
        return this.bitcoinAddress;
    }

    public void setBitcoinAddress(BitcoinAddress bitcoinAddress) {
        this.bitcoinAddress = bitcoinAddress;
    }

    public Transactions bitcoinAddress(BitcoinAddress bitcoinAddress) {
        this.setBitcoinAddress(bitcoinAddress);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transactions)) {
            return false;
        }
        return getId() != null && getId().equals(((Transactions) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Transactions{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", transactionDate='" + getTransactionDate() + "'" +
            ", senderAddress='" + getSenderAddress() + "'" +
            ", recipientAddress='" + getRecipientAddress() + "'" +
            "}";
    }
}
