"use client";

import React, { useState } from "react";
import MyServiceCard from "@/components/MyServiceCard";
import CurrentlyEngagedCard from "@/components/CurrentlyEngagedCard";
import AppliedCard from "@/components/AppliedCard";
import CompletedFindServiceCard from "@/components/CompletedFindServiceCard";
import ToReviewCard from "@/components/ToReviewCard";
import ToSubmitOfferServicesCard from "@/components/ToSubmitOfferServicesCard";
import MyServiceRequestsCard from "@/components/MyServiceRequestsCard";
import CompletedOfferServiceCard from "@/components/CompletedOfferServiceCard";
import ToApproveCard from "@/components/ToApproveCard";
import CancelledServiceCard from "@/components/CancelledServiceCard";
import ApplicantCard from "@/components/ApplicantCard";
import ToSubmitFindServicesCard from "@/components/ToSubmitFindServicesCard";
import ToApproveFindServicesCard from "@/components/ToApproveFindServicesCard";

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
  const [showToApprove, setShowToApprove] = useState(true);
  const [showCancelledServices, setShowCancelledServices] = useState(true);
  const [showApplicantCards, setShowApplicantCards] = useState(true);
  const [showPendingSubmission, setShowPendingSubmission] = useState(true);
  const [showToApproveFindServices, setShowToApproveFindServices] = useState(true);

  // Sample data for engaged services jobs
  const engagedServicesJobs = [
    {
      title: "Web Developer",
      earned: "Earned: $500 / 10 hours",
      description: [
        {
          avatar: "group-image.jpg", // Replace with actual image URL
          username: "john_doe",
          review: "John did an excellent job building our website. Highly recommend!",
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

  // Sample data for My Services
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

  // Sample data for Favourites
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

  // Sample data for Engaged Jobs
  const engagedJobs = [
    {
      title: "Math Tutor",
      earned: "Earned: $80 / 3 hours",
      description: [
        {
          avatar: "/group-image.jpg",
          username: "taytayxy",
          review: "Jeremy was an excellent GOAT at teaching. My kid got an A for his test!!!!",
        },
      ],
    },
  ];

  // Sample data for Applied Jobs
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

  // Sample data for Completed Jobs
  const completedJobs = [
    {
      title: "Math Tutor",
      earned: "Earned: $80 / 3 hours",
      description: [
        {
          avatar: "/group-image.jpg",
          username: "taytayxy",
          review: "Jeremy was an excellent GOAT at teaching. My kid got an A for his test!!!!",
        },
      ],
    },
  ];

  // Sample data for To Approve
  const toApproveJobs = [
    {
      title: "Software Developer",
      earned: "Earned: $1000 / 20 hours",
      description: [
        {
          avatar: "group-image.jpg", // Replace with actual image URL
          username: "alice_cooper",
          review: "Alice was fantastic in delivering the project on time!",
        },
      ],
      details: [
        "Web Development",
        "Experience with Python and Django",
        "Remote work",
        "Budget: $50/hr",
      ],
    },
  ];

  // Sample data for Cancelled Services
  const cancelledServices = [
    {
      title: "Graphic Designer",
      earned: "Cancelled: $0",
      description: [
        {
          avatar: "group-image.jpg", // Replace with actual image URL
          username: "charlie_design",
          review: "Service was cancelled before it started.",
        },
      ],
      details: [
        "Logo Design",
        "Experience with Adobe Illustrator",
        "Remote work",
        "Budget: $40/hr",
      ],
    },
  ];

  // Sample data for Applicant Cards
  const applicantCards = [
    {
      title: "Graphic Designer",
      description: [
        "Logo Design",
        "Experience with Adobe Illustrator",
        "Remote work",
        "Budget: $40/hr",
      ],
      avatar: "/group-image.jpg", // Replace with actual image URL
      username: "creative_anna",
    },
    {
      title: "Web Developer",
      description: [
        "Full Stack Development",
        "Experience with React and Node.js",
        "Remote work",
        "Budget: $50/hr",
      ],
      avatar: "/group-image.jpg", // Replace with actual image URL
      username: "dev_jake",
    },
  ];

  // Sample data for ToSubmitFindServicesCard
  const pendingSubmission = [
    {
      title: "Website Redesign",
      earned: "To be submitted",
      description: [
        {
          avatar: "/group-image.jpg", // Replace with actual image URL
          username: "client_john",
          review: "Looking forward to the new design!",
        },
      ],
      details: [
        "Redesign the homepage",
        "Improve UI/UX",
        "Remote work",
        "Budget: $150/hr",
      ],
    },
  ];

  // Sample data for ToApproveFindServicesCard
  const toApproveFindServices = [
    {
      title: "Mobile App Development",
      earned: "To be approved",
      description: [
        {
          avatar: "/group-image.jpg", // Replace with actual image URL
          username: "client_jane",
          review: "Ready to approve the final build!",
        },
      ],
      details: [
        "Develop a cross-platform mobile app",
        "Integrate with backend APIs",
        "Remote work",
        "Budget: $120/hr",
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
                    <h2 className="text-xl font-bold text-left">To Be Submitted</h2>
                    <button>{showEngagedJobs ? "▲" : "▼"}</button>
                  </div>
                  {showEngagedJobs && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {engagedServicesJobs.map((job, index) => (
                            <ToSubmitOfferServicesCard
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
                      onClick={() => setShowToApprove(!showToApprove)}
                  >
                    <h2 className="text-xl font-bold text-left">To Approve</h2>
                    <button>{showToApprove ? "▲" : "▼"}</button>
                  </div>
                  {showToApprove && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {toApproveJobs.map((job, index) => (
                            <ToApproveCard
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

                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowCancelledServices(!showCancelledServices)}
                  >
                    <h2 className="text-xl font-bold text-left">Cancelled Services</h2>
                    <button>{showCancelledServices ? "▲" : "▼"}</button>
                  </div>
                  {showCancelledServices && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {cancelledServices.map((service, index) => (
                            <CancelledServiceCard
                                key={index}
                                title={service.title}
                                earned={service.earned}
                                description={service.description}
                                details={service.details}
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
                      onClick={() => setShowApplicantCards(!showApplicantCards)}
                  >
                    <h2 className="text-xl font-bold text-left">Applicants</h2>
                    <button>{showApplicantCards ? "▲" : "▼"}</button>
                  </div>
                  {showApplicantCards && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {applicantCards.map((applicant, index) => (
                            <ApplicantCard
                                key={index}
                                title={applicant.title}
                                description={applicant.description}
                                avatar={applicant.avatar}
                                username={applicant.username}
                            />
                        ))}
                      </div>
                  )}
                </div>

                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowPendingSubmission(!showPendingSubmission)}
                  >
                    <h2 className="text-xl font-bold text-left">Pending Submission</h2>
                    <button>{showPendingSubmission ? "▲" : "▼"}</button>
                  </div>
                  {showPendingSubmission && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {pendingSubmission.map((service, index) => (
                            <ToSubmitFindServicesCard
                                key={index}
                                title={service.title}
                                earned={service.earned}
                                description={service.description}
                                details={service.details}
                            />
                        ))}
                      </div>
                  )}
                </div>

                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowToApproveFindServices(!showToApproveFindServices)}
                  >
                    <h2 className="text-xl font-bold text-left">To Approve</h2>
                    <button>{showToApproveFindServices ? "▲" : "▼"}</button>
                  </div>
                  {showToApproveFindServices && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {toApproveFindServices.map((service, index) => (
                            <ToApproveFindServicesCard
                                key={index}
                                title={service.title}
                                earned={service.earned}
                                description={service.description}
                                details={service.details}
                            />
                        ))}
                      </div>
                  )}
                </div>

                <div className="mb-4 w-full border-b border-gray-300">
                  <div
                      className="flex justify-between items-center mb-2 cursor-pointer"
                      onClick={() => setShowCancelledServices(!showCancelledServices)}
                  >
                    <h2 className="text-xl font-bold text-left">Cancelled Services</h2>
                    <button>{showCancelledServices ? "▲" : "▼"}</button>
                  </div>
                  {showCancelledServices && (
                      <div className="flex overflow-x-auto py-4 space-x-4">
                        {cancelledServices.map((service, index) => (
                            <CancelledServiceCard
                                key={index}
                                title={service.title}
                                earned={service.earned}
                                description={service.description}
                                details={service.details}
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
