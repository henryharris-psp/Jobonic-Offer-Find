'use client';

import React, { useEffect } from 'react';
import TopSection from "../components/TopSection";
import SatisfiedCollaborators from "../components/SatisfiedCollaborators";
import Link from "next/link"; // Import Link from next/link
import "./globals.css";
import CanvasComponent from "../components/HomeAniBG";
import ChatBox from "@/components/ChatBox";
import axios from "axios";
import {checkProfile, getProfileId} from "@/functions/helperFunctions";
import { token } from "@/baseURL";
import { useRouter } from "next/navigation";
import initialiseCategories from "../utils/initialiseCategories";
import initializeSkills from "../utils/initialiseSkills";
import { parseCSVFile } from "../utils/parseCSVFile";

export default function Home() {
  const router = useRouter();

  //sample data for testimonials section. need to be with actual data from API.
  const testimonials = [
    {
      quote: "Zach was a brilliant plumber! He fixed all my pipes and water doesn’t leak out anymore!",
      name: "Tommy",
      image: "/group-image.jpg",
      description: "Has been facing a water leakage issue and used Jobonic to find someone to fix the water leakage in his toilet",
    },
    {
      quote: "Nancy efficiently gave out 1000 flyers in a day to students and 100 of them turned up for my event",
      name: "Naam",
      image: "/group-image.jpg",
      description: "Wanted to publicize an outreach event and used Jobonic to find people to give out flyers to students",
    },
    {
      quote: "Maria designed an amazing logo for my new business. Her creativity and professionalism were outstanding!",
      name: "Sarah",
      image: "/group-image.jpg",
      description: "A small business owner who used Jobonic to find a talented graphic designer for her startup",
    },
    {
      quote: "James edited my entire manuscript in just two weeks, and the quality was top-notch!",
      name: "Max",
      image: "/group-image.jpg",
      description: "An author who needed fast and professional editing services and found James on Jobonic",
    },
    {
      quote: "Oliver provided excellent tutoring for my son, and his grades improved significantly in just a month.",
      name: "John",
      image: "/group-image.jpg",
      description: "A parent who found a qualified tutor for his child through Jobonic",
    },
    {
      quote: "David developed my website from scratch, and now my online store looks fantastic and runs smoothly.",
      name: "Emma",
      image: "/group-image.jpg",
      description: "An entrepreneur who needed a skilled web developer and found David on Jobonic",
    },
  ];

  const handleCreateServiceOffer = async (event: React.FormEvent) => {
    event.preventDefault();
    const profileId = await getProfileId();
    console.log(profileId);
    const profile = await checkProfile(profileId);
    console.log(profile);
    // if (profile) {
    //   router.push('/customiseService');
    // } else {
    //   router.push('/createProfile');
    // }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refreshToken = urlParams.get('refresh_token');
    const accessToken = urlParams.get('access_token');
    console.log('refreshToken = ', refreshToken);
    console.log('accessToken = ', accessToken);
    if (accessToken && refreshToken) {
      // Use access token for API calls in PMS
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('access_token', accessToken);
      window.location.href = '/';
    }

    // Initialize categories on app start. To be removed for production.
    initialiseCategories();

    // Load and initialize skills from CSV file. To be removed for production.
    const fetchAndInitializeSkills = async () => {
      try {
        const response = await fetch('/skillList.csv');
        const blob = await response.blob();
        const file = new File([blob], 'skills.csv');
        const skills = await parseCSVFile(file);
        await initializeSkills(skills);
      } catch (error) {
        console.error('Error initializing skills:', error);
      }
    };

    fetchAndInitializeSkills();
  }, []);

  return (
      <div>
        {/* Top Section */}
        <TopSection />

        {/* Finding Services Section */}
        <section className="py-16 flex justify-start items-center px-20">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-1" style={{ color: "#E1824F" }}>
              Looking for a service?
            </h2>
            <p className="mb-4" style={{ color: "#828282" }}>
              Meet your service needs with Jobonic
            </p>
            <div className="flex space-x-4">
              <Link href="/findServices">
                <button className="bg-[#71BAC7] text-white py-2 px-4 rounded-lg">
                  Find a service
                </button>
              </Link>
              <Link href="/serviceList">
                <button className="bg-[#71BAC7] text-white py-2 px-4 rounded-lg">
                  View service offers
                </button>
              </Link>
            </div>
          </div>
        </section>

        <CanvasComponent />

        {/* Offering Services Section */}
        <section className="py-16 flex justify-end items-center px-20">
          <div className="text-right">
            <h2 className="text-3xl md:text-5xl font-bold mb-1" style={{ color: "#E1824F" }}>
              Have a service to offer?
            </h2>
            <p className="mb-4" style={{ color: "#828282" }}>
              Offer your services at Jobonic at no cost!
            </p>
            <div className="flex space-x-4 justify-end">
              <button onClick={(e) => handleCreateServiceOffer(e)} className="bg-[#71BAC7] text-white py-2 px-4 rounded-lg">
                Offer a service
              </button>
              <Link href="/offerServices">
                <button className="bg-[#71BAC7] text-white py-2 px-4 rounded-lg">
                  View service requests
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Satisfied Collaborators Section */}
        <section className="text-center pt-64 pb-16">
          <SatisfiedCollaborators testimonials={testimonials} />
        </section>

        {/* Join Now Button */}
        <section className="text-center py-16 -mt-32">
          <Link href="/register">
            <button className="bg-[#D0693B] text-white py-4 px-8 rounded-lg text-xl hover:bg-[#a8562e]">
              Join now
            </button>
          </Link>
        </section>

        {/*<ChatBox />*/}
      </div>
  );
}





/*
import SearchBar from "../components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ai from "@/../public/ai.svg";
import hr from "@/../public/hr.svg";
import design from "@/../public/design.svg";
import marketing from "@/../public/marketing.svg";
import prog from "@/../public/prog.svg";
import translate from "@/../public/translate.svg";
import LoginPage from "./login/page";

const categories = [
  {
    category: 'Development and IT',
    image: prog,
    description: 'Empower innovation in Development and IT.'
  },
  {
    category: 'AI Services',
    image: ai,
    description: 'Explore exciting opportunities in AI services.'
  },
  {
    category: 'HR and Training',
    image: hr,
    description: 'Transform organizations through HR and Training.'
  },
  {
    category: 'Graphic and Design',
    image: design,
    description: 'Unlock your creative potential in Graphic Design.'
  },
  {
    category: 'Marketing and Advertising',
    image: marketing,
    description: 'Dive into the dynamic world of Marketing and Advertising.'
  },
  {
    category: 'Write and Translate',
    image: translate,
    description: 'Unlock your linguistic talents in Writing and Translation.'
  }
];

// Featured Job Listings
// <CategoryCard categories={categories}></CategoryCard>
*/
