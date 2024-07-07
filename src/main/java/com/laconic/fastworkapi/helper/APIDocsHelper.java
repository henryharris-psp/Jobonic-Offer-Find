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
        public static final String GET_USER = "Get single user by id";
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

    @UtilityClass
    public static class SkillAPI {
        public static final String SAVE_SKILL = "Saves and returns a skill";
        public static final String UPDATE_SKILL = "Updates and returns a skill";
        public static final String GET_ALL_SKILLS = "Get all skills with pagination and sorting. Filters " +
                "skill by name";
        public static final String GET_ALL_SKILL = "Get all skills without pagination and sorting.";
        public static final String DELETE_SKILL = "Removes a skill";
    }

    @UtilityClass
    public static class UserEducationAPI {
        public static final String SAVE_USER_EDUCATION = "Saves and returns a user education";
        public static final String UPDATE_USER_EDUCATION = "Updates and returns a user education";
        public static final String GET_ALL_USER_EDUCATION = "Get all user education without pagination and sorting.";
        public static final String DELETE_USER_EDUCATION = "Removes a user education";
    }

    @UtilityClass
    public static class UserExperienceAPI {
        public static final String SAVE_USER_EXPERIENCE = "Saves and returns a user experience";
        public static final String UPDATE_USER_EXPERIENCE = "Updates and returns a user experience";
        public static final String GET_ALL_USER_EXPERIENCE = "Get all user experience without pagination and sorting.";
        public static final String DELETE_USER_EXPERIENCE = "Removes a user experience";
    }

}
