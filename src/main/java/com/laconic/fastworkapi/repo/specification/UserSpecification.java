package com.laconic.fastworkapi.repo.specification;

import com.laconic.fastworkapi.entity.User;
import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class UserSpecification {
    public static Specification<User> hasKeyword(String keyword) {
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
