package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.UserSkill;
import com.laconic.fastworkapi.entity.UserSkillId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IUserSkillRepo extends JpaRepository<UserSkill, UserSkillId> {
    List<UserSkill> findAllByUserId(UUID id);
}
