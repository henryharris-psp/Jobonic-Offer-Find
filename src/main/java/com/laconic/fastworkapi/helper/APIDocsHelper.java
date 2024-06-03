package com.laconic.fastworkapi.helper;

import lombok.experimental.UtilityClass;

@UtilityClass
public class APIDocsHelper {
    @UtilityClass
    public static class UserAPI {
        public static final String SAVE_USER = "Saves and returns a user";
        public static final String UPDATE_USER = "Updates and returns a user";
        public static final String GET_USERS = "Get all users with sorting and pagination. Filters user by username " +
                "and email";
        public static final String GET_ALL_USERS = "Get all users";
        public static final String DELETE_USER = "Removes a user";
    }

    @UtilityClass
    public static class CategoryAPI {
        public static final String SAVE_CATEGORY = "Saves and returns a category";
        public static final String UPDATE_CATEGORY = "Updates and returns a category";
        public static final String GET_ALL_CATEGORY = "Get all categories";
        public static final String GET_CATEGORY = "Get single category";
        public static final String DELETE_CATEGORY = "Removes a category";
    }

    @UtilityClass
    public static class JobAPI {
        public static final String SAVE_JOB = "Saves and returns a job";
        public static final String UPDATE_JOB = "Updates and returns a job";
        public static final String GET_ALL_JOB = "Get all job with pagination and sorting. Filters job by title, " +
                "location and description";
        public static final String GET_JOB = "Get single job";
        public static final String DELETE_JOB = "Removes a job";
        public static final String CHANGE_STATUS = "Change job status";
    }

    @UtilityClass
    public static class ClientAPI {
        public static final String SAVE_CLIENT = "Saves and returns a client";
        public static final String UPDATE_CLIENT = "Updates and returns a client";
        public static final String GET_ALL_CLIENT = "Get all clients with pagination and sorting. Filters client by " +
                "firstName, lastName and company";
        public static final String GET_CLIENT = "Get single client";
        public static final String DELETE_CLIENT = "Removes a client";
    }

    @UtilityClass
    public static class FreelancerAPI {
        public static final String SAVE_FREELANCER = "Saves and returns a freelancer";
        public static final String UPDATE_FREELANCER = "Updates and returns a freelancer";
        public static final String GET_ALL_FREELANCER = "Get all freelancers with pagination and sorting. Filters " +
                "freelancer by firstName, lastName, company and skills";
        public static final String GET_FREELANCER = "Get single freelancer";
        public static final String DELETE_FREELANCER = "Removes a freelancer";
    }

}
