package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.ServiceManagement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IServiceRepo extends JpaRepository<ServiceManagement, UUID>, JpaSpecificationExecutor<ServiceManagement> {
    List<ServiceManagement> findAllByProfileId(Long profileId);

}
