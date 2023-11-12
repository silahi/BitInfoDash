package com.comonitech.bitinfodash.repository;

import com.comonitech.bitinfodash.domain.NetworkSecurity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the NetworkSecurity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NetworkSecurityRepository extends JpaRepository<NetworkSecurity, Long> {}
