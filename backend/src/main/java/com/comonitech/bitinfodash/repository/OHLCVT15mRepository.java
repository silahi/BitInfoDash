package com.comonitech.bitinfodash.repository;

import com.comonitech.bitinfodash.domain.OHLCVT15m;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the OHLCVT15m entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OHLCVT15mRepository extends JpaRepository<OHLCVT15m, Long> {}
