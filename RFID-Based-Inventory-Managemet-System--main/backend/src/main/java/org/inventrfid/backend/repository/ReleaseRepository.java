package org.inventrfid.backend.repository;

import org.inventrfid.backend.entity.Release;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReleaseRepository extends JpaRepository<Release, Long> {

    Release findByTransactionId(Long transactionId);

    Release findTopByOrderByTimestampDesc();
}

