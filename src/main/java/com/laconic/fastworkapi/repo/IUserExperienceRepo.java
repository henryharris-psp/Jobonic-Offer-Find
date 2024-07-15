package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.UserExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IUserExperienceRepo extends JpaRepository<UserExperience, UUID> {
    List<UserExperience> findAllByProfile_Id(Long profileId);
}
