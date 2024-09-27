package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Payment;
import com.laconic.fastworkapi.enums.PayableType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, UUID> {

    Page<Payment> findPaymentByPayableIdAndPayableTypeContainingIgnoreCase(UUID payableId, PayableType payableType, Pageable pageable);
}
