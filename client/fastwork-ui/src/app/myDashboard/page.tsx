"use client";

import React, { useState } from "react";
import MyServiceCard from "@/components/MyServiceCard";
import CurrentlyEngagedCard from "@/components/CurrentlyEngagedCard";
import AppliedCard from "@/components/AppliedCard";
import CompletedFindServiceCard from "@/components/CompletedFindServiceCard";
import ToReviewCard from "@/components/ToReviewCard";
import CurrentlyEngagedOfferServicesCard from "@/components/CurrentlyEngagedOfferServicesCard";
import MyServiceRequestsCard from "@/components/MyServiceRequestsCard";
import CompletedOfferServiceCard from "@/components/CompletedOfferServiceCard";

const MyDashboard = () => {
  const [activeTab, setActiveTab] = useState<"offerServices" | "findServices">(
      "offerServices"
  );
  const [showMyServices, setShowMyServices] = useState(true);
  const [showEngagedJobs, setShowEngagedJobs] = useState(true);
  const [showAppliedJobs, setShowAppliedJobs] = useState(true);
  const [showCompletedJobs, setShowCompletedJobs] = useState(true);
  const [showServiceRequests, setShowServiceRequests] = useState(true);
  const [showFavourites, setShowFavourites] = useState(true);
  const [showToReview, setShowToReview] = useState(true);

  const engagedServicesJobs = [
    {
      title: "Web Developer",
      earned: "Earned: $500 / 10 hours",
      description: [
        {
          avatar: "group-image.jpg", // Replace with actual image URL
          username: "john_doe",
          review:
              "John did an excellent job building our website. Highly recommend!",
        },
      ],
      details: [
        "Full Stack Development",
        "Experience with React and Node.js",
        "Remote work",
        "Budget: $50/hr",
      ],
    },
  ];

  const myServices = [
    {
      title: "CS Goat",
      name: "Jeremy",
      description: [
        "Finds bugs and destroys them",
        "Runs faster than your grandmother",
        "Is a GOAT",
      ],
      image: "/group-image.jpg",
      rating: 4.5,
    },
    {
      title: "Plumber",
      name: "Jeremy",
      description: [
        "10 years of experience in plumbing",
        "Solve your water problems efficiently and effectively",
        "Top-quality service and reliable results",
      ],
      image: "/group-image.jpg",
      rating: 3.2,
    },
    {
      title: "Accountant",
      name: "Jeremy",
      description: [
        "20 years of counting money",
        "Personalize your accounts with expert guidance from me",
        "Yolo",
      ],
      image: "/group-image.jpg",
      rating: 4.8,
    },
    {
      title: "Accountant",
      name: "Jeremy",
      description: [
        "20 years of counting money",
        "Personalize your accounts with expert guidance from me",
        "Yolo",
      ],
      image: "/group-image.jpg",
      rating: 2.7,
    },
    {
      title: "Accountant",
      name: "Jeremy",
      description: [
        "20 years of counting money",
        "Personalize your accounts with expert guidance from me",
        "Yolo",
      ],
      image: "/group-image.jpg",
      rating: 5.0,
    },
  ];

  const favourites = [
    {
      title: "CS Goat",
      name: "Jeremy",
      description: [
        "Finds bugs and destroys them",
        "Runs faster than your grandmother",
        "Is a GOAT",
      ],
      image: "/group-image.jpg",
      rating: 4.2,
    },
    {
      title: "Plumber",
      name: "Jeremy",
      description: [
        "10 years of experience in plumbing",
        "Solve your water problems efficiently and effectively",
        "Top-quality service and reliable results",
      ],
      image: "/group-image.jpg",
      rating: 4.0,
    },
    {
      title: "Accountant",
      name: "Jeremy",
      description: [
        "20 years of counting money",
        "Personalize your accounts with expert guidance from me",
        "Yolo",
      ],
      image: "/group-image.jpg",
      rating: 3.8,
    },
  ];

  const engagedJobs = [
    {
      title: "Math Tutor",
      earned: "Earned: $80 / 3 hours",
      description: [
        {
          avatar: "/group-image.jpg",
          username: "taytayxy",
          review:
              "Jeremy was an excellent GOAT at teaching. My kid got an A for his test!!!!",
        },
      ],
    },
  ];

  const appliedJobs = [
    {
      title: "Math Tutor",
      description: [
        "Middle School",
        "Familiar with OCE O Levels",
        "Travel to my house",
        "Budget: $30/hr",
      ],
      avatar: "/group-image.jpg",
      username: "taytayxy",
    },
    {
      title: "Accountant",
      description: [
        "Middle School",
        "Familiar with OCE O Levels",
        "Travel to my house",
        "Budget: $30/hr",
      ],
      avatar: "/group-image.jpg",
      username: "jennyxy",
    },
    {
      title: "Accountant",
      description: [
        "Middle School",
        "Familiar with OCE O Levels",
        "Travel to my house",
        "Budget: $30/hr",
      ],
      avatar: "/group-image.jpg",
      username: "jennyxy",
    },
    {
      title: "Accountant",
      description: [
        "Middle School",
        "Familiar with OCE O Levels",
        "Travel to my house",
        "Budget: $30/hr",
      ],
      avatar: "/group-image.jpg",
      username: "jennyxy",
    },
    {
      title: "Accountant",
      description: [
        "Middle School",
        "Familiar with OCE O Levels",
        "Travel to my house",
        "Budget: $30/hr",
      ],
      avatar: "/group-image.jpg",
      username: "jennyxy",
    },
  ];

  const completedJobs = [
    {
      title: "Math Tutor",
      earned: "Earned: $80 / 3 hours",
      description: [
        {
          avatar: "/group-image.jpg",
          username: "taytayxy",
          review:
              "Jeremy was an excellent GOAT at teaching. My kid got an A for his test!!!!",
        },
      ],
    },
  ];

  return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <div className="container mx-auto">
          <div className="flex justify-center mb-4">
            <button
                className={`px-4 py-2 mx-2 ${
                    activeTab === "findServices" ? "bg-[#D0693B] text-white" : "bg-orange-300 text-gray-200"
                } rounded-lg font-semibold`}
                onClick={() => setActiveTab("findServices")}
            >
              Find Services
            </button>
            <button
                className={`px-4 py-2 mx-2 ${
                    activeTab === "offerServices" ? "bg-[#D0693B] text-white" : "bg-orange-300 text-gray-200"
                } rounded-lg font-semibold`}
                onClick={() => setActiveTab("offerServices")}
            >
              Offer Services
            </button>
          </div>

          {activeTab === "offerServices" && (
              <>
                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowMyServices(!showMyServices)}
                  >
                    <h2 className="text-xl font-bold text-left">My Services Offered</h2>
                    <button>{showMyServices ? "▲" : "▼"}</button>
                  </div>
                  {showMyServices && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {myServices.map((service, index) => (
                            <MyServiceCard
                                key={index}
                                title={service.title}
                                name={service.name}
                                description={service.description}
                                image={service.image}
                                rating={service.rating}
                            />
                        ))}
                      </div>
                  )}
                </div>

                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowAppliedJobs(!showAppliedJobs)}
                  >
                    <h2 className="text-xl font-bold text-left">Jobs Applied</h2>
                    <button>{showAppliedJobs ? "▲" : "▼"}</button>
                  </div>
                  {showAppliedJobs && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {appliedJobs.map((job, index) => (
                            <AppliedCard
                                key={index}
                                title={job.title}
                                description={job.description}
                                avatar={job.avatar}
                                username={job.username}
                            />
                        ))}
                      </div>
                  )}
                </div>

                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowEngagedJobs(!showEngagedJobs)}
                  >
                    <h2 className="text-xl font-bold text-left">Currently Engaged</h2>
                    <button>{showEngagedJobs ? "▲" : "▼"}</button>
                  </div>
                  {showEngagedJobs && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {engagedServicesJobs.map((job, index) => (
                            <CurrentlyEngagedOfferServicesCard
                                key={index}
                                title={job.title}
                                earned={job.earned}
                                description={job.description}
                                details={job.details}
                            />
                        ))}
                      </div>
                  )}
                </div>

                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowCompletedJobs(!showCompletedJobs)}
                  >
                    <h2 className="text-xl font-bold text-left">Completed</h2>
                    <button>{showCompletedJobs ? "▲" : "▼"}</button>
                  </div>
                  {showCompletedJobs && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {completedJobs.map((job, index) => (
                            <CompletedOfferServiceCard
                                key={index}
                                title={job.title}
                                earned={job.earned}
                                description={job.description}
                            />
                        ))}
                      </div>
                  )}
                </div>
              </>
          )}

          {activeTab === "findServices" && (
              <>
                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowFavourites(!showFavourites)}
                  >
                    <h2 className="text-xl font-bold text-left">My Favourites</h2>
                    <button>{showFavourites ? "▲" : "▼"}</button>
                  </div>
                  {showFavourites && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {favourites.map((service, index) => (
                            <MyServiceCard
                                key={index}
                                title={service.title}
                                name={service.name}
                                description={service.description}
                                image={service.image}
                                rating={service.rating}
                            />
                        ))}
                      </div>
                  )}
                </div>

                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowServiceRequests(!showServiceRequests)}
                  >
                    <h2 className="text-xl font-bold text-left">My Service Requests</h2>
                    <button>{showServiceRequests ? "▲" : "▼"}</button>
                  </div>
                  {showServiceRequests && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {appliedJobs.map((job, index) => (
                            <MyServiceRequestsCard
                                key={index}
                                title={job.title}
                                description={job.description}
                            />
                        ))}
                      </div>
                  )}
                </div>

                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowEngagedJobs(!showEngagedJobs)}
                  >
                    <h2 className="text-xl font-bold text-left">Currently Engaged</h2>
                    <button>{showEngagedJobs ? "▲" : "▼"}</button>
                  </div>
                  {showEngagedJobs && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {engagedJobs.map((job, index) => (
                            <CurrentlyEngagedCard
                                key={index}
                                title={job.title}
                                earned={job.earned}
                                description={job.description}
                            />
                        ))}
                      </div>
                  )}
                </div>

                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowToReview(!showToReview)}
                  >
                    <h2 className="text-xl font-bold text-left">To Review</h2>
                    <button>{showToReview ? "▲" : "▼"}</button>
                  </div>
                  {showToReview && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {completedJobs.map((job, index) => (
                            <ToReviewCard
                                key={index}
                                title={job.title}
                                earned={job.earned}
                                description={job.description}
                            />
                        ))}
                      </div>
                  )}
                </div>

                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowCompletedJobs(!showCompletedJobs)}
                  >
                    <h2 className="text-xl font-bold text-left">Completed</h2>
                    <button>{showCompletedJobs ? "▲" : "▼"}</button>
                  </div>
                  {showCompletedJobs && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {completedJobs.map((job, index) => (
                            <CompletedFindServiceCard
                                key={index}
                                title={job.title}
                                earned={job.earned}
                                description={job.description}
                            />
                        ))}
                      </div>
                  )}
                </div>
              </>
          )}
        </div>
      </div>
  );
};

export default MyDashboard;
