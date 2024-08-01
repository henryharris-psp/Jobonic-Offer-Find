package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Matches;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IMatchesRepo extends JpaRepository<Matches, UUID> {
    Matches findByServiceId(UUID serviceId);
}