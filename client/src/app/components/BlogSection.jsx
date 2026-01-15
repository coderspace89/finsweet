"use client";

import React, { useEffect, useState } from "react";
import blogStyles from "./BlogSection.module.css";
import qs from "qs";

const BlogSection = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  const query = qs.stringify({
    filters: {
      featured: true,
    },
    populate: ["image"],
  });

  useEffect(() => {
    // Fetch featured post
    fetch(`http://localhost:1337/api/posts?${query}`)
      .then((response) => response.json())
      .then((data) => {
        setFeaturedPost(data.data[0]);
        console.log("Featured Post:", data.data[0]);
      })
      .catch((error) => console.error("Error fetching featured post:", error));

    // Fetch all posts
    fetch("http://localhost:1337/api/posts?_sort=date:desc")
      .then((response) => response.json())
      .then((data) => {
        setAllPosts(data.data);
        console.log("All Posts:", data.data);
      })
      .catch((error) => console.error("Error fetching all posts:", error));
  }, []);

  return (
    <div className={blogStyles.blogSection}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h2>Featured Post</h2>
            {featuredPost && (
              <div className={blogStyles.featuredPost}>
                <img
                  src={`http://localhost:1337${featuredPost.image.url}`}
                  alt={featuredPost.title}
                  className="img-fluid"
                />
                <h3>{featuredPost.title}</h3>
                <p className={blogStyles.meta}>
                  By {featuredPost.author} | {featuredPost.date}
                </p>
                <p>{featuredPost.excerpt}</p>
                <button className={blogStyles.btnYellow}>Read More</button>
              </div>
            )}
          </div>
          <div className="col-lg-6">
            <h2>All Posts</h2>
            {allPosts.map((post) => (
              <div key={post.id} className={blogStyles.postItem}>
                <h3>{post.title}</h3>
                <p className={blogStyles.meta}>
                  By {post.author} | {post.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
