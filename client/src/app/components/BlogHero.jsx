"use client";

import React, { useState, useEffect } from "react";
import blogHeroStyles from "./BlogHero.module.css";
import qs from "qs";

const BlogHero = () => {
  const queryObj = {
    populate: {
      featuredPost: {
        populate: {
          image: true,
        },
      },
    },
  };
  const queryString = qs.stringify(queryObj, { encodeValuesOnly: true });

  useEffect(() => {
    const fetchBlogHero = async () => {
      const apiUrl = `http://localhost:1337/api/blog-page?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data?.featuredPost);
    };
    fetchBlogHero();
  }, []);

  return <div>BlogHero</div>;
};

export default BlogHero;
