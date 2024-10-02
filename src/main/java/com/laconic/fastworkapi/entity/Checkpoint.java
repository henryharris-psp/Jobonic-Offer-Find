package com.laconic.fastworkapi.entity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.laconic.fastworkapi.entity.audit.Auditable;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SQLRestriction("is_active=true")
@Builder
public class Checkpoint extends Auditable<UUID> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private boolean isActive = true;

    private String title;

//    @Lob
//    @Column(name = "tasks", columnDefinition = "CLOB")
//    private String tasks; // JSON string to store the array

    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceManagement service;

    @Builder.Default
    private double price = 0;

    private int numberOfHoursCompleted;

    @Column(columnDefinition = "CLOB")
    private String description;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "match_id")
    private Matches matches;

    private static final ObjectMapper mapper = new ObjectMapper();

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @OneToMany(mappedBy = "checkpoint", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Task> tasks;

    @OneToMany(mappedBy = "checkPoint", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Attachment> attachments = new ArrayList<>();

    @OneToOne(mappedBy = "currentCheckpoint")
    private Contract currentContract;

//    public void setTasks(String[] tasks) throws IOException {
//        this.tasks = mapper.writeValueAsString(tasks); // Convert array to JSON
//    }
//
//    public String[] getTasks() throws IOException {
//        return mapper.readValue(this.tasks, new TypeReference<>() {
//        }); // Convert JSON back to array
//    }
}
