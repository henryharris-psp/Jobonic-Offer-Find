package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Checkpoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ICheckpointRepo extends JpaRepository<Checkpoint, UUID>, JpaSpecificationExecutor<Checkpoint> {
}