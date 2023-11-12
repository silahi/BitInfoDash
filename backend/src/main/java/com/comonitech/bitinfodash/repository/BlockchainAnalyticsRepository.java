package com.comonitech.bitinfodash.repository;

import com.comonitech.bitinfodash.domain.BlockchainAnalytics;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the BlockchainAnalytics entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlockchainAnalyticsRepository extends JpaRepository<BlockchainAnalytics, Long> {}
