"use client";

import React, { useState, useEffect } from "react";
import authorPageStyles from "./AuthorPage.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthorPage = ({ slug }) => {
  const [authorData, setAuthorData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);

  const authorSlug = slug;
  const queryParams = {
    filters: {
      slug: {
        $eq: authorSlug,
      },
    },
    populate: {
      image: true,
      socialLinks: {
        populate: ["icon"],
      },
    },
  };

  const queryString = qs.stringify(queryParams, { encodeValuesOnly: true });

  useEffect(() => {
    const fetchAuthor = async () => {
      const apiUrl = `${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}/api/authors?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data);
      setAuthorData(data?.data);
    };
    fetchAuthor();
  }, []);

  const articlesQuery = {
    filters: {
      author: {
        slug: {
          $eq: authorSlug,
        },
      },
    },
    populate: {
      image: true,
      category: true,
    },
    sort: ["date:desc"],
  };

  const articlesQueryString = qs.stringify(articlesQuery, {
    encodeValuesOnly: true,
  });

  useEffect(() => {
    const fetchArticles = async () => {
      const apiUrl = `${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}/api/articles?${articlesQueryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data);
      setArticlesData(data?.data);
    };
    fetchArticles();
  }, []);

  const router = useRouter();
  const currentPath = router.asPath || "/blog";
  const cleanedPath = currentPath.replace("author", "/");

  return (
    <div>
      <section className={authorPageStyles.authorHeroContainer}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              {authorData?.map((author) => (
                <Row key={author.id}>
                  <Col lg={4}>
                    {author?.image && (
                      <Image
                        src={`${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}${author?.image?.url}`}
                        width={author?.image?.width}
                        height={author?.image?.height}
                        alt={author?.image?.name}
                        className={authorPageStyles.authorImage}
                      />
                    )}
                  </Col>
                  <Col lg={8}>
                    <div>
                      <h2 className={authorPageStyles.authorTitle}>
                        {author?.title}
                      </h2>
                      <p className={authorPageStyles.authorBio}>
                        {author?.bio}
                      </p>
                    </div>
                    <div className="d-flex">
                      {author?.socialLinks?.map((socialLink) => (
                        <div key={socialLink.id}>
                          <Link href={socialLink?.url}>
                            {socialLink?.icon && (
                              <Image
                                src={`${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}${socialLink?.icon?.url}`}
                                width={socialLink?.icon?.width}
                                height={socialLink?.icon?.height}
                                alt={socialLink?.icon?.name}
                                className={authorPageStyles.iconImage}
                              />
                            )}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </Container>
        <div className="position-absolute bottom-0 start-50 translate-middle-x w-75">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1024 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 24H813.693L812.818 0H0.874651L0 24Z" fill="#FFD050" />
            <path
              d="M752.066 24H1024L1023.71 0H752.359L752.066 24Z"
              fill="#592EA9"
            />
          </svg>
        </div>
      </section>
      <section className={authorPageStyles.authorPostsContainer}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div>
                <h2 className={authorPageStyles.authorPostsHeading}>
                  My Posts
                </h2>
              </div>
              {articlesData?.map((article) => (
                <Link
                  key={article.id}
                  href={`${cleanedPath}/${article?.slug}`}
                  className="text-decoration-none"
                >
                  <Row className="align-items-center">
                    <Col lg={5}>
                      <div className={authorPageStyles.articleImageContainer}>
                        {article?.image && (
                          <Image
                            src={`${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}${article?.image?.url}`}
                            width={article?.image.width}
                            height={article?.image?.height}
                            alt={article?.image?.name}
                            className={authorPageStyles.articleImage}
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg={7}>
                      <div>
                        <p className={authorPageStyles.categoryTitle}>
                          {article?.category?.name}
                        </p>
                        <h2 className={authorPageStyles.articleTitle}>
                          {article?.title}
                        </h2>
                        <p className={authorPageStyles.articleText}>
                          {article?.category?.description}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Link>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AuthorPage;
