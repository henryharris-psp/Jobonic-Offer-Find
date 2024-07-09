package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IServiceRequestRepo extends JpaRepository<ServiceRequest, UUID> {
}
