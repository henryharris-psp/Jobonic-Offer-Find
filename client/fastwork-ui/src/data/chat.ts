import { ActiveChat } from "@/types/chat";

export const chatFilters = [
    "All", 
    "From clients", 
    "From service providers"
];

export const fromClientStatus = [
    "All",
    "Enquiring",
    "Applied",
    "To submit",
    "Waiting for review",
    "Waiting for final review",
    "Cancelled",
    "Completed",
];

export const fromServiceProviderStatus = [
    "All",
    "Enquiring",
    "Applicant",
    "Waiting for submission",
    "To review",
    "Waiting for final submission",
    "Rejected",
    "Completed",
];

export const people: ActiveChat[] = [
    {
        id: 1,
        fullName: "John Chamlington",
        avatar: "/avatar.svg",
        messages: [
            {
                id: 1,
                sender: "You",
                type: "message",
                avatar: "/avatar.svg",
                text: "Hello Google, I would like to apply for your service request below!",
                sentByCurrentUser: true,
            },
            {
                id: 2,
                sender: "You",
                type: "apply",
                avatar: "/avatar.svg",
                sentByCurrentUser: true,
            },
        ],
        type: "client",
        status: "Applied",
    },
    {
        id: 2,
        fullName: "Alice Brown",
        avatar: "/avatar.svg",
        messages: [
            {
                id: 1,
                sender: "Alice",
                type: "message",
                avatar: "/avatar.svg",
                text: "Hi, how are you?",
                sentByCurrentUser: false,
            },
            {
                id: 2,
                sender: "You",
                type: "message",
                avatar: "/avatar.svg",
                text: "I'm good, thanks!",
                sentByCurrentUser: true,
            },
        ],
        type: "service_provider",
        status: "Applicant",
    },
    {
        id: 3,
        fullName: "Bob Smith",
        avatar: "/avatar.svg",
        messages: [
            {
                id: 1,
                sender: "Bob",
                type: "message",
                avatar: "/avatar.svg",
                text: "Hello Ella, I am interested in your Middle School Math tutor service.",
                sentByCurrentUser: false,
            },
            {
                id: 2,
                sender: "Bob",
                type: "service offer",
                avatar: "/avatar.svg",
                sentByCurrentUser: false,
            },
            {
                id: 2,
                sender: "You",
                type: "message",
                avatar: "/avatar.svg",
                text: "Hi! Which deliverable are you looking for?",
                sentByCurrentUser: true,
            },
        ],
        type: "client",
        status: "Enquiring",
    },
];
