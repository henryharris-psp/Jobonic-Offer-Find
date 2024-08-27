package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.dto.ExtendedServiceRequestDTO;
import com.laconic.fastworkapi.entity.ServiceRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IServiceRequestRepo extends JpaRepository<ServiceRequest, UUID>, JpaSpecificationExecutor<ServiceRequest> {

    /**
     * @Author : soe
     * @CreatedAt : Aug 27, 2024
     * @Note : select all of service requests and their related entities details with pagination and sorting.
     */
    public static final String FIND_ALL_SERVICE_REQUEST = "SELECT new com.laconic.fastworkapi.dto.ExtendedServiceRequestDTO(" +
            "sr.id AS id, sr.submissionDeadline AS submissionDeadline, sr.workExample AS workExample, sr.profile.id AS profileId, " +
            "sm.description AS description, sm.description1 AS description1, sm.description2 AS description2, sm.description3 AS description3, " +
            "sm.employmentType AS employmentType, sm.languageSpoken AS languageSpoken, sm.location AS location, sm.price AS price, " +
            "sm.priceUnit AS priceUnit, sm.title AS title, sm.category.id AS categoryId, u.address AS address, u.cardExpiryDate AS cardExpiryDate, " +
            "u.cardNumber AS cardNumber, u.companyName AS companyName, u.email AS email, u.firstName AS firstName, u.image AS image, " +
            "u.lastName AS lastName, u.phoneNumber AS phoneNumber, u.review AS review, u.userId AS userId, u.username AS username, " +
            "u.walletAddress AS walletAddress) " +
            "FROM ServiceRequest sr " +
            "JOIN sr.serviceManagement sm " +
            "JOIN sm.profile u";

    @Query(FIND_ALL_SERVICE_REQUEST)
    Page<ExtendedServiceRequestDTO> findAllExtendedServiceRequestDetails(Pageable pageable);
}
