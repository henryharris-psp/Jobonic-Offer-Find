package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepo extends JpaRepository<Profile, Long>, JpaSpecificationExecutor<Profile> {
    Profile findByUserId(Long userId);
}
