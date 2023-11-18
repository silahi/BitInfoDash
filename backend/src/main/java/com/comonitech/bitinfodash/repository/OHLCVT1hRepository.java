package com.comonitech.bitinfodash.repository;

import com.comonitech.bitinfodash.domain.OHLCVT1h;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the OHLCVT1h entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OHLCVT1hRepository extends JpaRepository<OHLCVT1h, Long> {}
