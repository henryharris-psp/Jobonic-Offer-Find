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

//    public static final String FIND_ALL_SERVICE_REQUEST = "SELECT new com.laconic.fastworkapi.dto.ExtendedServiceRequestDTO(" +
//            "sr.id, sr.submissionDeadline, sr.workExample, sr.profile.id, " +
//            "sm.description, sm.description1, sm.description2, sm.description3, " +
//            "sm.employmentType, sm.languageSpoken, sm.location, sm.price, " +
//            "sm.priceUnit, sm.title, sm.category.id, u.address, u.cardExpiryDate, " +
//            "u.cardNumber, u.companyName, u.email, u.firstName, u.image, " +
//            "u.lastName, u.phoneNumber, u.review, u.userId, u.username, " +
//            "u.walletAddress) " +
//            "FROM ServiceRequest sr " +
//            "JOIN sr.serviceManagement sm " +
//            "JOIN sm.profile u";
//
//    @Query(FIND_ALL_SERVICE_REQUEST)
//    Page<ExtendedServiceRequestDTO> findAllExtendedServiceRequestDetails(Pageable pageable);
    public static final String FILTER_BY_PRICE_AND_DATE = "SELECT srm FROM ServiceRequest srm" +
            " LEFT JOIN srm.serviceManagement sr" +
            " WHERE (srm.price BETWEEN :minPrice AND :maxPrice)" +
            " AND (:submissionDeadline IS NULL OR sr.submissionDeadline = :submissionDeadline)";

    @Query("SELECT s FROM ServiceRequest s WHERE s.profile.id <> :authUserId")
    Page<ServiceRequest> findAllExceptAuthUser(Long authUserId, Pageable pageable);

}