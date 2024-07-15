package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.UserRole;
import com.laconic.fastworkapi.entity.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUserRoleRepo extends JpaRepository<UserRole, UserRoleId> {
    List<UserRole> findAllByUserId(Long id);
}
