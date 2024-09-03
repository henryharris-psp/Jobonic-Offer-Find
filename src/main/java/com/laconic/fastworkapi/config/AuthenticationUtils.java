package com.laconic.fastworkapi.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
public class AuthenticationUtils {

    //    To get the keycloak id from the token
    public String getKeycloakId() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        if (authentication instanceof JwtAuthenticationToken jwtAuthentication) {
            Jwt jwt = (Jwt) jwtAuthentication.getPrincipal();

            // Extract the Keycloak ID from the token claims
            String keycloakId = jwt.getSubject();

            return keycloakId;

        }
        return null;

    }


    //    to get the user id from the token claims
    public Long getUserId() {
        return Long.parseLong(genericTokenValue("userid"));
    }

    public String getEmail() {
        return (genericTokenValue("email"));
    }



    public  String genericTokenValue(String type) {
        String data = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken jwtAuthentication) {
            Jwt jwt = jwtAuthentication.getToken();
            Map<String, Object> claims = jwt.getClaims();
            if (claims.containsKey(type)) {
                data = String.valueOf(claims.get(type));
            }
        }
        return data;
    }
}
