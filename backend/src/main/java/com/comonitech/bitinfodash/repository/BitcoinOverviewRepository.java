package com.comonitech.bitinfodash.repository;

import com.comonitech.bitinfodash.domain.BitcoinOverview;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the BitcoinOverview entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BitcoinOverviewRepository extends JpaRepository<BitcoinOverview, Long> {}
