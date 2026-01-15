import React from "react";
import Hero from "./components/Hero";
import Header from "./components/layout/Header";
import BlogSection from "./components/BlogSection";
import AboutSection from "./components/AboutSection";

const page = () => {
  return (
    <div>
      <Header />
      <Hero />
      <BlogSection />
      <AboutSection />
    </div>
  );
};

export default page;
