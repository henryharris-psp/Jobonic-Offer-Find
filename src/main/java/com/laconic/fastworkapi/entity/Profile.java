package com.laconic.fastworkapi.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.laconic.fastworkapi.entity.audit.Auditable;
import com.laconic.fastworkapi.enums.PaymentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SQLRestriction("is_active=true")
public class Profile extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String companyName;

    private String phoneNumber;

    // either location or byte
    private String image;

    private String cardNumber;

    private LocalDate cardExpiryDate;

    private String walletAddress;

    private double review = 0;

    private boolean isActive = true;

    @Column(unique = true)
    private Long userId;

    private String position;

    @Column(unique = true)
    private String bankAccountNumber;

    private String cryptoType;

    private PaymentType paymentMethod;

    private PaymentType receivePaymentMethod;

    @Lob
    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "profile", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<UserExperience> userExperienceList = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "profile", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<UserEducation> userEducationList = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "profile", orphanRemoval = true, fetch = FetchType.EAGER)
    private List<CustomerReview> customerReviews = new ArrayList<>();

    @OneToMany(mappedBy = "senderId", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference("payment-sent")
    private Set<Payment> sentPayments = new HashSet<>();

    @OneToMany(mappedBy = "receiverId", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference("payment-received")
    private Set<Payment> receivedPayments = new HashSet<>();

    public void addEducation(UserEducation education) {
        this.userEducationList.add(education);
        education.setProfile(this);
    }

    public void addExperience(UserExperience experience) {
        this.userExperienceList.add(experience);
        experience.setProfile(this);
    }
}
