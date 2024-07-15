package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.UserSkill;
import com.laconic.fastworkapi.entity.UserSkillId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUserSkillRepo extends JpaRepository<UserSkill, UserSkillId> {
    List<UserSkill> findAllByUserId(Long id);
}
