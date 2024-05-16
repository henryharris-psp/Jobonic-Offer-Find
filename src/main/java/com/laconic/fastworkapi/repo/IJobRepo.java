package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IJobRepo extends JpaRepository<Job, UUID> {
}
