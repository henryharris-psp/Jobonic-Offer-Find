package com.laconic.fastworkapi.helper;

import lombok.experimental.UtilityClass;

@UtilityClass
public class APIDocsHelper {
    @UtilityClass
    public static class UserAPI {
        public static final String SAVE_USER = "Saves and returns a user";
        public static final String UPDATE_USER = "Updates and returns a user";
        public static final String GET_USERS = "Get all users with sorting and pagination";
        public static final String GET_ALL_USERS = "Get all users";
        public static final String DELETE_USER = "Removes a user";
    }
}
