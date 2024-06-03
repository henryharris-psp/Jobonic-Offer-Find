package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.User;
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
public class UserDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = -4565041716760088438L;
    private UUID id;
    private String username;
    private String email;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }

    public User updateUser(User user) {
        user.setUsername(this.username);
        user.setEmail(this.email);
        return user;
    }
}
