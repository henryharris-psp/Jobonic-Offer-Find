package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.ServiceManagement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface IServiceRepo extends JpaRepository<ServiceManagement, UUID>, JpaSpecificationExecutor<ServiceManagement> {

    public static final String FILTER_BY_PRICE_AND_DATE = "SELECT srm FROM ServiceManagement srm" +
            " LEFT JOIN srm.serviceRequest sr" +
            " WHERE (srm.price BETWEEN :minPrice AND :maxPrice)" +
            " AND (:submissionDeadline IS NULL OR sr.submissionDeadline = :submissionDeadline)";

    List<ServiceManagement> findAllByProfileId(Long profileId);

    @Query(FILTER_BY_PRICE_AND_DATE)
    List<ServiceManagement> findAndFilterByPriceAndDate(
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("submissionDeadline") LocalDate submissionDeadline);

    @Query("SELECT s FROM ServiceManagement s WHERE s.profile.id <> :authUserId")
    Page<ServiceManagement> findAllExceptAuthUser(@Param("authUserId") Long authUserId, Pageable pageable);

    @Query("SELECT s FROM ServiceManagement s WHERE s.serviceRequest.id = :serviceRequestId")
    ServiceManagement findAllByServiceRequestId(@Param("serviceRequestId") UUID serviceRequestId);

    @Query("SELECT s FROM ServiceManagement s WHERE s.serviceRequest.id = :serviceRequestId")
    ServiceManagement findByServiceRequestId(UUID serviceRequestId);
}
