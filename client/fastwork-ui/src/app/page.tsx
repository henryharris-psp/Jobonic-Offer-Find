"use client";
import TopSection from "../components/home/TopSection";
import SatisfiedCollaborators from "../components/SatisfiedCollaborators";
import Link from "next/link"; // Import Link from next/link
import CanvasComponent from "../components/HomeAniBG";
import FindingServiceSection from "@/components/home/FindingServiceSection";
import OfferingServiceSection from "@/components/home/OfferingServiceSection";
import "./globals.css";

const testimonials = [
    {
        quote: "Zach was a brilliant plumber! He fixed all my pipes and water doesn’t leak out anymore!",
        name: "Tommy",
        image: "/group-image.jpg",
        description:
            "Has been facing a water leakage issue and used Jobonic to find someone to fix the water leakage in his toilet",
    },
    {
        quote: "Nancy efficiently gave out 1000 flyers in a day to students and 100 of them turned up for my event",
        name: "Naam",
        image: "/group-image.jpg",
        description:
            "Wanted to publicize an outreach event and used Jobonic to find people to give out flyers to students",
    },
    {
        quote: "Maria designed an amazing logo for my new business. Her creativity and professionalism were outstanding!",
        name: "Sarah",
        image: "/group-image.jpg",
        description:
            "A small business owner who used Jobonic to find a talented graphic designer for her startup",
    },
    {
        quote: "James edited my entire manuscript in just two weeks, and the quality was top-notch!",
        name: "Max",
        image: "/group-image.jpg",
        description:
            "An author who needed fast and professional editing services and found James on Jobonic",
    },
    {
        quote: "Oliver provided excellent tutoring for my son, and his grades improved significantly in just a month.",
        name: "John",
        image: "/group-image.jpg",
        description:
            "A parent who found a qualified tutor for his child through Jobonic",
    },
    {
        quote: "David developed my website from scratch, and now my online store looks fantastic and runs smoothly.",
        name: "Emma",
        image: "/group-image.jpg",
        description:
            "An entrepreneur who needed a skilled web developer and found David on Jobonic",
    },
];

const Home = () => {
    return (
        <div className="mx-5 sm:mx-16">
            {/* Top Section */}
            <TopSection />

            <FindingServiceSection />

            <CanvasComponent />

            <OfferingServiceSection />

            {/* Satisfied Collaborators Section */}
            <section className="text-center pt-64 pb-16">
                <SatisfiedCollaborators testimonials={testimonials} />
            </section>

            {/* Join Now Button */}
            <section className="text-center py-16 -mt-32">
                <Link href="/register">
                    <button className="bg-[#D0693B] text-white py-3 px-8 rounded-lg text-md font-semibold hover:bg-[#a8562e]">
                        Join now
                    </button>
                </Link>
            </section>

            {/*<ChatBox />*/}
        </div>
    );
}

export default Home;
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
