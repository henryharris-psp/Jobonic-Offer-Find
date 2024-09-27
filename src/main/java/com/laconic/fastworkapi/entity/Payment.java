package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import com.laconic.fastworkapi.enums.PayableType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "payment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Payment extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String paymentMethod;
    private Double amount;

    private Date paymentDate;

    @Enumerated(EnumType.STRING)
    private PayableType payableType;
    private UUID payableId;
    private String remarks;
    private Long senderId; // profile Id
    private Long receiverId; // profileId


}
