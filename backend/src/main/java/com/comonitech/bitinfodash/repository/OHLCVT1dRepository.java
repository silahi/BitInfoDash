package com.comonitech.bitinfodash.repository;

import com.comonitech.bitinfodash.domain.OHLCVT1d;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the OHLCVT1d entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OHLCVT1dRepository extends JpaRepository<OHLCVT1d, Long> {}
