package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.dto.ClientDTO;
import com.laconic.fastworkapi.entity.audit.Auditable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SQLRestriction("is_active = true")
public class Client extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String firstName;
    private String lastName;
    private boolean isVerified = false;
    private double rating = 0;
    private String accountNumber;
    private String bankName;
    private String company;
    private boolean isActive = true;

    public Client(ClientDTO clientDTO) {
        this.id = clientDTO.getId();
        this.firstName = clientDTO.getFirstName();
        this.lastName = clientDTO.getLastName();
        this.isVerified = clientDTO.isVerified();
        this.rating = clientDTO.getRating();
        this.accountNumber = clientDTO.getAccountNumber();
        this.bankName = clientDTO.getBankName();
        this.company = clientDTO.getCompany();
    }
}
