package com.requirementyogi.cloud.confluence.repositories;

import com.requirementyogi.cloud.confluence.entities.Requirement;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequirementRepository extends JpaRepository<Requirement, Long> {

    Page<Requirement> findAllByClientKeyAndSpaceId(String clientKey, Long spaceId, Pageable pageable);

    Optional<Requirement> findByClientKeyAndSpaceIdAndKey(String clientKey, Long spaceId, String key);

}
