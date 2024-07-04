package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ISkillRepo extends JpaRepository<Skill, UUID>, JpaSpecificationExecutor<Skill> {
}
