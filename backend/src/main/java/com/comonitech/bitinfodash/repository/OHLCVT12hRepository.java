package com.comonitech.bitinfodash.repository;

import com.comonitech.bitinfodash.domain.OHLCVT12h;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the OHLCVT12h entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OHLCVT12hRepository extends JpaRepository<OHLCVT12h, Long> {}
