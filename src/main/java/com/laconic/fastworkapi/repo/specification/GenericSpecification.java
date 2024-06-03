package com.laconic.fastworkapi.repo.specification;

import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;

@UtilityClass
public class GenericSpecification {
    public static <T> Specification<T> hasKeyword(String keyword, Set<String> columns) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            String lowerKeyword = "%" + keyword.toLowerCase() + "%";

            // Create an array of predicates for each column
            var predicates = columns.stream()
                    .map(column -> criteriaBuilder.like(criteriaBuilder.lower(root.get(column)), lowerKeyword))
                    .toArray(jakarta.persistence.criteria.Predicate[]::new);

            // Combine the predicates using 'or'
            return criteriaBuilder.or(predicates);
        };
    }
}
