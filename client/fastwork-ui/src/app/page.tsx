import TopSection from "./section/TopSection";
import SearchBar from "./section/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import NavBar from "./section/navBar/NavBar";

import ai from "@/../public/ai.svg";
import hr from "@/../public/hr.svg";
import design from "@/../public/design.svg";
import marketing from "@/../public/marketing.svg";
import prog from "@/../public/prog.svg";
import translate from "@/../public/translate.svg";

export default function Home() {
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
  ]

  return (
    <div
    style={{
      background: 'linear-gradient( 89.5deg,  rgba(66,144,251,1) 0.4%, rgba(131,204,255,1) 100.3% )',
    }}
    >
      {/* Navbar */}
     <NavBar></NavBar>
     
      {/* Hero Section */}
     <TopSection></TopSection>

      {/* Search Bar */}
     <SearchBar></SearchBar>

      {/* Featured Job Listings */}
     <CategoryCard categories={categories}></CategoryCard>
    </div>
  );
}

