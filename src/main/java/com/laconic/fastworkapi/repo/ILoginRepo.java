package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ILoginRepo extends JpaRepository<Login, UUID> {
}
