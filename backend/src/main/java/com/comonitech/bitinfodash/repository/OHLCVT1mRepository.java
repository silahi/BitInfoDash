package com.comonitech.bitinfodash.repository;

import com.comonitech.bitinfodash.domain.OHLCVT1m;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the OHLCVT1m entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OHLCVT1mRepository extends JpaRepository<OHLCVT1m, Long> {}
