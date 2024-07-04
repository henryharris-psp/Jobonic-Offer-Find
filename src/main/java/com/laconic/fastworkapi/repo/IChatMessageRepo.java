package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IChatMessageRepo extends JpaRepository<ChatMessage, UUID> {
}
