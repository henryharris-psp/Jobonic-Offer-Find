package com.laconic.fastworkapi.repo.specification;

import com.laconic.fastworkapi.entity.Profile;
import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class UserSpecification {
    public static Specification<Profile> hasKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if(keyword == null || keyword.isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("username")), "%" + keyword.toLowerCase() +
                            "%"),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + keyword.toLowerCase() + "%")
            );
        };
    }
}
