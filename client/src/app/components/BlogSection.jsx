"use client";

import React, { useEffect, useState } from "react";
import blogStyles from "./BlogSection.module.css";
import qs from "qs";
import Link from "next/link";

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
    fetch(
      "http://localhost:1337/api/posts?_sort=date:desc&filters[featured][$eq]=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setAllPosts(data.data);
        console.log("All Posts:", data.data);
      })
      .catch((error) => console.error("Error fetching all posts:", error));
  }, []);

  function formatDate(dateString) {
    let date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className={blogStyles.blogSection}>
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <h2>Featured Post</h2>
            {featuredPost && (
              <div className={blogStyles.featuredPost}>
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="text-decoration-none"
                >
                  <img
                    src={`http://localhost:1337${featuredPost.image.url}`}
                    alt={featuredPost.title}
                    className="img-fluid"
                  />
                  <h3>{featuredPost.title}</h3>
                  <p className={blogStyles.meta}>
                    By{" "}
                    <span className={blogStyles.authorTitle}>
                      {featuredPost.author}
                    </span>{" "}
                    | {formatDate(featuredPost.date)}
                  </p>
                  <p className={blogStyles.featuredPostText}>
                    {featuredPost.content}
                  </p>
                  <button className={blogStyles.btnYellow}>
                    {featuredPost.cta}
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="col-lg-5">
            <div className="d-flex justify-content-between align-items-baseline">
              <h2>All Posts</h2>
              <Link href="/blog" className={blogStyles.viewAllLink}>
                View All
              </Link>
            </div>
            {allPosts.map((post) => (
              <div key={post.id} className={blogStyles.postItem}>
                <Link href={`/blog/${post.id}`} className="text-decoration-none">
                  <p className={blogStyles.meta}>
                    By{" "}
                    <span className={blogStyles.authorTitle}>{post.author}</span>{" "}
                    | {formatDate(post.date)}
                  </p>
                  <h3>{post.title}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
