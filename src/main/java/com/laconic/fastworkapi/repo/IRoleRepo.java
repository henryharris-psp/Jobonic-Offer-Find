package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IRoleRepo extends JpaRepository<Role, UUID> {
}
