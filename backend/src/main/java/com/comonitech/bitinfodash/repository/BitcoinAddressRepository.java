package com.comonitech.bitinfodash.repository;

import com.comonitech.bitinfodash.domain.BitcoinAddress;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the BitcoinAddress entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BitcoinAddressRepository extends JpaRepository<BitcoinAddress, Long> {}
