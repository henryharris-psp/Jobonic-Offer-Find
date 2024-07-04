package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.UserEducation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IUserEducationRepo extends JpaRepository<UserEducation, UUID> {
    List<UserEducation> findAllByProfile_Id(UUID profileId);
}
