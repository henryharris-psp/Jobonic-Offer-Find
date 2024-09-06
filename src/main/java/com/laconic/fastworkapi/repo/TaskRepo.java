package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepo extends JpaRepository<Task, UUID> {

    List<Task> findAllByCheckpoint_Id(UUID id);
}
