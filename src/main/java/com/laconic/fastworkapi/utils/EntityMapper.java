package com.laconic.fastworkapi.utils;

import lombok.experimental.UtilityClass;
import org.modelmapper.ModelMapper;

@UtilityClass
public class EntityMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static <T, U> U mapToRequest(T entity, Class<U> requestClass) {
        return modelMapper.map(entity, requestClass);
    }

    public static <T, U> U mapToResponse(T entity, Class<U> responseClass) {
        if(entity == null) return null;
        return modelMapper.map(entity, responseClass);
    }

    public static <T, U> U mapToEntity(T request, Class<U> entityClass) {
        return modelMapper.map(request, entityClass);
    }
}
