package com.laconic.fastworkapi.helper;

import lombok.experimental.UtilityClass;

@UtilityClass
public class APIDocsHelper {
    @UtilityClass
    public static class UserAPI {
        public static final String SAVE_USER = "Saves and returns a profile";
        public static final String UPDATE_USER = "Updates and returns a profile";
        public static final String GET_USERS = "Get all profiles with sorting and pagination. Filters user by username " +
                "and email";
        public static final String GET_ALL_USERS = "Get all profiles";
        public static final String GET_USER = "Get single profile by profileId";
        public static final String DELETE_USER = "Removes a profile";
        public static final String GET_PROFILE = "Get profile by userId";
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
    public static class AttachmentAPI {
        public static final String SAVE_ATTACHMENT = "Saves and returns an attachment";
        public static final String GET_USER_ATTACHMENTS = "Returns a list of attachments for a user";
        public static final String GET_SERVICE_ATTACHMENTS = "Returns a list of attachments for a service";
        public static final String GET_PROPOSAL_ATTACHMENTS = "Returns a list of attachments for a service";
        public static final String REMOVE_ATTACHMENT = "Removes an attachment";
        public static final String DOWNLOAD_ATTACHMENT = "Downloads an attachment";
        public static final String SHOW_ATTACHMENT = "Show/Preview an attachment";
    }

    @UtilityClass
    public static class ServiceAPI {
        public static final String SAVE_SERVICE = "Saves and returns a service";
        public static final String DELETE_SERVICE = "Removes a service";
        public static final String GET_ALL = "Get all services with pagination and sorting";
        public static final String GET_ALL_REQUEST_SERVICE = "Get all request service with pagination and sorting";
        public static final String FILTER_SERVICES = "Get services with pagination and sorting.Filter services using categoryId, minPrice and maxPrice";
        public static final String GET_ALL_BY_USER = "List all services by user id";
        public static final String GET_ALL_BY_ID = "List all services by service id";
        public static final String UPDATE_REQUEST = "Updates service request";
        public static final String UPDATE_OFFER = "Updates service offer";
        public static final String DELETE_REQUEST = "Deletes service request";
        public static final String DELETE_OFFER = "Deletes service offer";
        public static final String FILTER_SERVICE = "Filter Services";
    }

    @UtilityClass
    public static class ProposalAPI {
        public static final String SAVE_PROPOSAL = "Saves and returns a proposal with user and service";
        public static final String REMOVE_PROPOSAL = "Removes a proposal";
        public static final String GET_SERVICE_PROPOSALS = "Returns all proposals for a service";
        public static final String GET_USER_PROPOSALS = "Returns all proposals for a user";
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
    public static class FreelancerReceiptAPI {
        public static final String GET_ALL_FREELANCER_RECEIPT = "Get all freelancer receipts with pagination and sorting. Filters " +
                "freelancer receipts by release date";
        public static final String GET_FREELANCER_RECEIPT = "Get single freelancer receipt by id";

    }

    @UtilityClass
    public static class EmployerPaymentAPI {
        public static final String GET_ALL_EMPLOYER_PAYMENT = "Get all employer payments with pagination and sorting. Filters " +
                "payments by payment date";
        public static final String GET_EMPLOYER_PAYMENT = "Get single employer payment by id";

    }


    @UtilityClass
    public static class SkillAPI {
        public static final String SAVE_SKILL = "Saves and returns a skill";
        public static final String UPDATE_SKILL = "Updates and returns a skill";
        public static final String GET_ALL_SKILLS = "Get all skills with pagination and sorting. Filters " +
                "skill by name";
        public static final String GET_ALL_SKILL = "Get all skills without pagination and sorting.";
        public static final String DELETE_SKILL = "Removes a skill";

        public static final String ADD_SKILL = "Adds skills to user";

        public static final String GET_ALL_USER_SKILL = "Get all user skills without pagination and sorting.";
        public static final String DELETE_USER_SKILL = "Removes a user skill";
    }

    @UtilityClass
    public static class RoleAPI {
        public static final String SAVE_ROLE = "Saves and returns a role";
        public static final String DELETE_SKILL = "Removes a role";
    }

    @UtilityClass
    public static class UserEducationAPI {
        public static final String SAVE_USER_EDUCATION = "Saves and returns a user education";
        public static final String UPDATE_USER_EDUCATION = "Updates and returns a user education";
        public static final String GET_ALL_USER_EDUCATION = "Get all user education without pagination and sorting.";
        public static final String DELETE_USER_EDUCATION = "Removes a user education";
        public static final String ADD_USER_EDUCATION = "Adds and returns a user education";
    }

    @UtilityClass
    public static class UserExperienceAPI {
        public static final String SAVE_USER_EXPERIENCE = "Saves and returns a user experience";
        public static final String UPDATE_USER_EXPERIENCE = "Updates and returns a user experience";
        public static final String GET_ALL_USER_EXPERIENCE = "Get all user experience without pagination and sorting.";
        public static final String DELETE_USER_EXPERIENCE = "Removes a user experience";
        public static final String ADD_USER_EXPERIENCE = "Adds and returns a user experience";
    }

    @UtilityClass
    public static class MatchesAPI {
        public static final String SAVE_MATCHES = "Saves and returns a match";
        public static final String UPDATE_MATCHES = "Updates and returns a match";
        public static final String GET_ALL_MATCHES = "Get all matches";
        public static final String GET_MATCHES = "Get single match";
        public static final String DELETE_MATCHES = "Removes a match";
    }

    @UtilityClass
    public static class CheckpointAPI {
        public static final String SAVE_CHECKPOINT = "Saves and returns a checkpoint";
        public static final String UPDATE_CHECKPOINT = "Updates and returns a checkpoint";
        public static final String GET_ALL_CHECKPOINT = "Get all checkpoints.";
        public static final String GET_CHECKPOINT = "Get single checkpoint";
        public static final String DELETE_CHECKPOINT = "Removes a checkpoint";
    }
}
