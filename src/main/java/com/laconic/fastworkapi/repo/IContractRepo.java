package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IContractRepo extends JpaRepository<Contract, UUID> {
    List<Contract>findAllByMatches_Id(UUID uuid);
}
