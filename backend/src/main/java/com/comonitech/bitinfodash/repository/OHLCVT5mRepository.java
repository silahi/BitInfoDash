package com.comonitech.bitinfodash.repository;

import com.comonitech.bitinfodash.domain.OHLCVT5m;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the OHLCVT5m entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OHLCVT5mRepository extends JpaRepository<OHLCVT5m, Long> {}
