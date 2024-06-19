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
    <div className="min-h-screen m-16">
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
            <div className="flex flex-col items-center mb-4">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-bold mb-2 text-left text-black flex items-center">
                  My Services Offered
                  <button
                    className="ml-2 text-black"
                    onClick={() => setShowMyServices(!showMyServices)}
                  >
                    {showMyServices ? "▲" : "▼"}
                  </button>
                </h2>
              </div>
              {showMyServices && (
                <div className="overflow-x-auto py-4 w-full">
                  <div className="flex space-x-4">
                    {myServices.map((service, index) => (
                      <MyServiceCard
                        key={index}
                        title={service.title}
                        name={service.name}
                        description={service.description}
                        image={service.image}
                        rating={service.rating}
                        style={{ width: '288px' }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-bold mb-2 text-left text-black flex items-center">
                  Currently Engaged
                  <button
                    className="ml-2 text-black"
                    onClick={() => setShowEngagedJobs(!showEngagedJobs)}
                  >
                    {showEngagedJobs ? "▲" : "▼"}
                  </button>
                </h2>
              </div>
              {showEngagedJobs && (
                <div className="overflow-x-auto py-4 w-full">
                  <div className="flex space-x-4">
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
                </div>
              )}
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-bold mb-2 text-left text-black flex items-center">
                  Jobs Applied
                  <button
                    className="ml-2 text-black"
                    onClick={() => setShowAppliedJobs(!showAppliedJobs)}
                  >
                    {showAppliedJobs ? "▲" : "▼"}
                  </button>
                </h2>
              </div>
              {showAppliedJobs && (
                <div className="overflow-x-auto py-4 w-full">
                  <div className="flex space-x-4">
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
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-bold mb-2 text-left text-black flex items-center">
                  Completed
                  <button
                    className="ml-2 text-black"
                    onClick={() => setShowCompletedJobs(!showCompletedJobs)}
                  >
                    {showCompletedJobs ? "▲" : "▼"}
                  </button>
                </h2>
              </div>
              {showCompletedJobs && (
                <div className="overflow-x-auto pt-4 w-full">
                  <div className="flex space-x-4">
                    {completedJobs.map((job, index) => (
                      <CompletedOfferServiceCard
                        key={index}
                        title={job.title}
                        earned={job.earned}
                        description={job.description}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "findServices" && (
          <>
            <div className="flex flex-col items-center mb-4">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-bold mb-2 text-left text-black flex items-center">
                  My Service Requests
                  <button
                    className="ml-2 text-black"
                    onClick={() => setShowServiceRequests(!showServiceRequests)}
                  >
                    {showServiceRequests ? "▲" : "▼"}
                  </button>
                </h2>
              </div>
              {showServiceRequests && (
                <div className="overflow-x-auto py-4 w-full">
                  <div className="flex space-x-4">
                    {appliedJobs.map((job, index) => (
                      <MyServiceRequestsCard
                        key={index}
                        title={job.title}
                        description={job.description}
                        avatar={job.avatar}
                        username={job.username}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-bold mb-2 text-left text-black flex items-center">
                  My Favourites
                  <button
                    className="ml-2 text-black"
                    onClick={() => setShowFavourites(!showFavourites)}>
                    {showFavourites ? "▲" : "▼"}
                  </button>
                </h2>
              </div>
              {showFavourites && (
                <div className="overflow-x-auto py-4 w-full">
                  <div className="flex space-x-4">
                    {favourites.map((service, index) => (
                      <MyServiceCard
                        key={index}
                        title={service.title}
                        name={service.name}
                        description={service.description}
                        image={service.image}
                        rating={service.rating}
                        style={{ width: '288px' }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-bold mb-2 text-left text-black flex items-center">
                  Currently Engaged
                  <button
                    className="ml-2 text-black"
                    onClick={() => setShowEngagedJobs(!showEngagedJobs)}
                  >
                    {showEngagedJobs ? "▲" : "▼"}
                  </button>
                </h2>
              </div>
              {showEngagedJobs && (
                <div className="overflow-x-auto py-4 w-full">
                  <div className="flex space-x-4">
                    {engagedJobs.map((job, index) => (
                      <CurrentlyEngagedCard
                        key={index}
                        title={job.title}
                        earned={job.earned}
                        description={job.description}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-bold mb-2 text-left text-black flex items-center">
                  To Review
                  <button
                    className="ml-2 text-black"
                    onClick={() => setShowToReview(!showToReview)}
                  >
                    {showToReview ? "▲" : "▼"}
                  </button>
                </h2>
              </div>
              {showToReview && (
                <div className="overflow-x-auto py-4 w-full">
                  <div className="flex space-x-4">
                    {completedJobs.map((job, index) => (
                      <ToReviewCard
                        key={index}
                        title={job.title}
                        earned={job.earned}
                        description={job.description}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-bold mb-2 text-left text-black flex items-center">
                  Completed
                  <button
                    className="ml-2 text-black"
                    onClick={() => setShowCompletedJobs(!showCompletedJobs)}
                  >
                    {showCompletedJobs ? "▲" : "▼"}
                  </button>
                </h2>
              </div>
              {showCompletedJobs && (
                <div className="overflow-x-auto pt-4 w-full">
                  <div className="flex space-x-4 px-4">
                    {completedJobs.map((job, index) => (
                      <CompletedFindServiceCard
                        key={index}
                        title={job.title}
                        earned={job.earned}
                        description={job.description}
                      />
                    ))}
                  </div>
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
