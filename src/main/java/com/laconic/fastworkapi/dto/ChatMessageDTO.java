package com.laconic.fastworkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ChatMessageDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 8806492280759579636L;
    private UUID id;
    private ProfileDTO freelancer;
    private ProfileDTO client;
    private ServiceDTO serviceDTO;
}

