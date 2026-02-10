"use client";

import React, { useEffect, useState } from "react";
import blogStyles from "./BlogSection.module.css";
import qs from "qs";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";

const BlogSection = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  const query = qs.stringify({
    filters: {
      featured: true,
    },
    populate: ["image"],
  });

  const postsPerPage = 4;
  const currentPage = 1;
  const queryObj = {
    sort: ["date:asc"],
    filters: {
      featured: {
        $eq: false,
      },
    },
    pagination: {
      page: currentPage,
      pageSize: postsPerPage,
    },
    populate: {
      image: true,
    },
  };
  const queryString = qs.stringify(queryObj, { encodeValuesOnly: true });

  useEffect(() => {
    // Fetch featured post
    fetch(`/api/posts?${query}`)
      .then((response) => response.json())
      .then((data) => {
        setFeaturedPost(data.data[0]);
        console.log("Featured Post:", data.data[0]);
      })
      .catch((error) => console.error("Error fetching featured post:", error));

    // Fetch all posts
    fetch(`/api/posts?${queryString}`)
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
          <div className="col-lg-7 mb-4 mb-lg-0">
            <h2>Featured Post</h2>
            {featuredPost && (
              <div className={blogStyles.featuredPost}>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="text-decoration-none"
                >
                  <img
                    src={getStrapiMedia(featuredPost.image.url)}
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
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-decoration-none"
                >
                  <p className={blogStyles.meta}>
                    By{" "}
                    <span className={blogStyles.authorTitle}>
                      {post.author}
                    </span>{" "}
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
