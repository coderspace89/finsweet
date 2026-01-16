import React from "react";
import Hero from "./components/Hero";
import BlogSection from "./components/BlogSection";
import AboutSection from "./components/AboutSection";
import CategorySection from "./components/CategorySection";

const page = () => {
  return (
    <div>
      <Hero />
      <BlogSection />
      <AboutSection />
      <CategorySection />
    </div>
  );
};

export default page;
