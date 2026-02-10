"use client";

import React, { useState, useEffect } from "react";
import allpostsStyles from "./AllPosts.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Link from "next/link";

const AllPosts = () => {
  const [allPostsData, setAllPostsData] = useState([]);

  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const [pageCount, setPageCount] = useState(1);

  const queryObj = {
    populate: {
      image: true,
      category: true,
    },
    pagination: {
      page: currentPage,
      pageSize: PAGE_SIZE,
    },
    sort: ["publishedAt:desc"],
  };
  const queryString = qs.stringify(queryObj, { encodeValuesOnly: true });

  useEffect(() => {
    const fetchAllPosts = async () => {
      const apiUrl = `${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}/api/posts?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setAllPostsData(data?.data);
      setCurrentPage(data?.meta?.pagination?.page);
      setPageCount(data?.meta?.pagination?.pageCount);
    };
    fetchAllPosts();
  }, [currentPage]);

  return (
    <section className={allpostsStyles.container}>
      <Container>
        <div className={allpostsStyles.headingContainer}>
          <h2 className={allpostsStyles.heading}>All posts</h2>
        </div>
        {allPostsData?.map((post) => (
          <Link
            href={`/blog/${post?.slug}`}
            key={post.id}
            className="text-decoration-none"
          >
            <Row className={allpostsStyles.postsContainer}>
              <Col lg={5}>
                {post?.image && (
                  <Image
                    src={`${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}${post?.image?.url}`}
                    width={post?.image.width}
                    height={post?.image?.height}
                    alt={post?.image?.name}
                    className="img-fluid mb-lg-0 mb-3"
                  />
                )}
              </Col>
              <Col lg={7}>
                <div>
                  <p className={allpostsStyles.categoryTitle}>
                    {post?.category?.name}
                  </p>
                  <h2 className={allpostsStyles.postTitle}>{post?.title}</h2>
                  <p className={allpostsStyles.postContent}>{post?.content}</p>
                </div>
              </Col>
            </Row>
          </Link>
        ))}
        <div className="text-center">
          <Link
            href="/blog"
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
            }
            className={allpostsStyles.previousLink}
          >
            Previous
          </Link>
          <Link
            href="/blog"
            onClick={() =>
              setCurrentPage(
                currentPage < pageCount ? currentPage + 1 : currentPage,
              )
            }
            className={allpostsStyles.nextLink}
          >
            Next
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default AllPosts;
