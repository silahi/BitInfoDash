package com.comonitech.bitinfodash.repository;

import com.comonitech.bitinfodash.domain.MarketTrends;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the MarketTrends entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MarketTrendsRepository extends JpaRepository<MarketTrends, Long> {}
