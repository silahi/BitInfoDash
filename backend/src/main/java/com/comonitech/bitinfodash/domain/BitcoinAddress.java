package com.comonitech.bitinfodash.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A BitcoinAddress.
 */
@Entity
@Table(name = "bitcoin_address")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BitcoinAddress implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "address")
    private String address;

    @Column(name = "balance")
    private Double balance;

    @Column(name = "label")
    private String label;

    @Column(name = "sent")
    private Double sent;

    @Column(name = "received")
    private Double received;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "bitcoinAddress")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "bitcoinAddress" }, allowSetters = true)
    private Set<Transactions> transactions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public BitcoinAddress id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return this.address;
    }

    public BitcoinAddress address(String address) {
        this.setAddress(address);
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getBalance() {
        return this.balance;
    }

    public BitcoinAddress balance(Double balance) {
        this.setBalance(balance);
        return this;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getLabel() {
        return this.label;
    }

    public BitcoinAddress label(String label) {
        this.setLabel(label);
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Double getSent() {
        return this.sent;
    }

    public BitcoinAddress sent(Double sent) {
        this.setSent(sent);
        return this;
    }

    public void setSent(Double sent) {
        this.sent = sent;
    }

    public Double getReceived() {
        return this.received;
    }

    public BitcoinAddress received(Double received) {
        this.setReceived(received);
        return this;
    }

    public void setReceived(Double received) {
        this.received = received;
    }

    public Set<Transactions> getTransactions() {
        return this.transactions;
    }

    public void setTransactions(Set<Transactions> transactions) {
        if (this.transactions != null) {
            this.transactions.forEach(i -> i.setBitcoinAddress(null));
        }
        if (transactions != null) {
            transactions.forEach(i -> i.setBitcoinAddress(this));
        }
        this.transactions = transactions;
    }

    public BitcoinAddress transactions(Set<Transactions> transactions) {
        this.setTransactions(transactions);
        return this;
    }

    public BitcoinAddress addTransactions(Transactions transactions) {
        this.transactions.add(transactions);
        transactions.setBitcoinAddress(this);
        return this;
    }

    public BitcoinAddress removeTransactions(Transactions transactions) {
        this.transactions.remove(transactions);
        transactions.setBitcoinAddress(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BitcoinAddress)) {
            return false;
        }
        return getId() != null && getId().equals(((BitcoinAddress) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BitcoinAddress{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", balance=" + getBalance() +
            ", label='" + getLabel() + "'" +
            ", sent=" + getSent() +
            ", received=" + getReceived() +
            "}";
    }
}
