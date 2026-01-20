import React from "react";
import Hero from "./components/Hero";
import BlogSection from "./components/BlogSection";
import AboutSection from "./components/AboutSection";
import CategorySection from "./components/CategorySection";
import DiscoverSection from "./components/DiscoverSection";
import AuthorsList from "./components/AuthorsList";
import FeaturedSection from "./components/FeaturedSection";

const page = () => {
  return (
    <div>
      <Hero />
      <BlogSection />
      <AboutSection />
      <CategorySection />
      <DiscoverSection />
      <AuthorsList />
      <FeaturedSection />
    </div>
  );
};

export default page;
