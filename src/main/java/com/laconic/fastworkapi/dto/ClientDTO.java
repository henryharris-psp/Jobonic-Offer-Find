package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Client;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ClientDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 339063703581809885L;
    private UUID id;
    private String firstName;
    private String lastName;
    private boolean isVerified;
    private double rating;
    private String accountNumber;
    private String bankName;
    private String company;

    public ClientDTO(Client client) {
        this.id = client.getId();
        this.firstName = client.getFirstName();
        this.lastName = client.getLastName();
        this.isVerified = client.isVerified();
        this.rating = client.getRating();
        this.accountNumber = client.getAccountNumber();
        this.bankName = client.getBankName();
        this.company = client.getCompany();
    }

    public Client updateClient(Client client) {
        client.setFirstName(this.getFirstName());
        client.setLastName(this.getLastName());
        client.setVerified(this.isVerified());
        client.setRating(this.getRating());
        client.setAccountNumber(this.getAccountNumber());
        client.setBankName(this.getBankName());
        client.setCompany(this.getCompany());
        return client;
    }
}
