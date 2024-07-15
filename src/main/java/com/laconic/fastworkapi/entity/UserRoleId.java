package com.laconic.fastworkapi.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@EqualsAndHashCode
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleId implements Serializable {
    @Serial
    private static final long serialVersionUID = 361150452106709213L;
    private Long userId;
    private UUID roleId;
}
