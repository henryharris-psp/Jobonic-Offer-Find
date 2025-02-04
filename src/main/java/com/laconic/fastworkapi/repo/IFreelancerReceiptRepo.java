package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.FreelancerReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IFreelancerReceiptRepo extends JpaRepository<FreelancerReceipt, UUID>, JpaSpecificationExecutor<FreelancerReceipt> {

    List<FreelancerReceipt>findFreelancerReceiptByCheckPointId(UUID checkPointId);
}
