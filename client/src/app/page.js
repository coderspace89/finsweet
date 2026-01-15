import React from "react";
import Hero from "./components/Hero";
import Header from "./components/layout/Header";
import BlogSection from "./components/BlogSection";

const page = () => {
  return (
    <div>
      <Header />
      <Hero />
      <BlogSection />
    </div>
  );
};

export default page;
