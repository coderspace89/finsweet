"use client";

import React, { useState, useEffect } from "react";
import relatedContentStyles from "./RelatedContent.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Link from "next/link";

const RelatedContent = ({ slug }) => {
  const postSlug = slug;
  console.log(postSlug);

  const [relatedData, setRelatedData] = useState([]);

  const queryObj = {
    filters: {
      slug: {
        $eq: postSlug,
      },
    },
    populate: {
      RelatedContent: {
        on: {
          "blocks.related-articles-section": {
            // This targets the component type
            populate: {
              RelatedArticlesSection: {
                // This is the attribute name within blocks.related-articles-section
                populate: {
                  image: true,
                  author: true,
                  articleLink: true, // Simplified this!
                },
              },
            },
          },
        },
      },
      //   category: true,
      //   author: true,
    },
  };
  const queryString = qs.stringify(queryObj, {
    encodeValuesOnly: true,
    arrayFormat: "brackets",
  });

  useEffect(() => {
    const fetchRelatedContent = async () => {
      const apiUrl = `${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}/api/articles?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data[0].RelatedContent[0].RelatedArticlesSection);
      setRelatedData(data?.data[0].RelatedContent[0].RelatedArticlesSection);
    };
    fetchRelatedContent();
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
    <section className={relatedContentStyles.relatedContentContainer}>
      <Container>
        <Row className={relatedContentStyles.sectionRow}>
          <div>
            <h2 className={relatedContentStyles.sectionTitle}>
              What to read next
            </h2>
          </div>
          {relatedData?.map((content) => (
            <Col key={content.id} lg={4}>
              <Link
                href={`/blog/${content?.articleLink?.slug}`}
                className="text-decoration-none"
              >
                <div>
                  {content?.image && (
                    <div className={relatedContentStyles.imageContainer}>
                      <Image
                        src={`${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}${content?.image?.url}`}
                        width={content?.image?.width}
                        height={content?.image?.height}
                        alt={content?.image?.name}
                        className={relatedContentStyles.contentImage}
                      />
                    </div>
                  )}
                  <p className={relatedContentStyles.authorDate}>
                    By <span>{content?.author?.name}</span> |{" "}
                    {formatDate(content?.date)}
                  </p>
                  <h3 className={relatedContentStyles.contentTitle}>
                    {content?.title}
                  </h3>
                  <p className={relatedContentStyles.contentDescription}>
                    {content?.description}
                  </p>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default RelatedContent;
