package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.PaymentOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IPaymentOutRepo extends JpaRepository<PaymentOut, UUID> {
    List<PaymentOut> findByContractId(UUID contractId);

}
