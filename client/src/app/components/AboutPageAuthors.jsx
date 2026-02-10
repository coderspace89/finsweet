"use client";

import React, { useState, useEffect } from "react";
import authorsListStyles from "./AboutPageAuthors.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { getStrapiMedia } from "@/lib/utils";

library.add(fab);

const AboutPageAuthors = () => {
  const [authors, setAuthors] = useState([]);

  const query = qs.stringify({
    populate: {
      AuthorsList: {
        populate: {
          authors: {
            populate: ["image"],
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchAuthorsList = async () => {
      try {
        const response = await fetch(`/api/about-page?${query}`);
        const data = await response.json();
        console.log(data.data.AuthorsList.authors);
        setAuthors(data.data.AuthorsList.authors);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuthorsList();
  }, []);

  if (!authors) return <div>Loading...</div>;

  const imageUrls = authors?.map((author) =>
    getStrapiMedia(author?.image?.url),
  );
  return (
    <section className={authorsListStyles.authorSection}>
      <Container>
        <Row>
          <div className="text-center">
            <h2 className={authorsListStyles.sectionTitle}>List of Authors</h2>
          </div>
          {authors.map((author, index) => (
            <Col lg={3} key={index} className="mb-3 mb-lg-0">
              <div className={`text-center ${authorsListStyles.authorCard}`}>
                <img src={imageUrls[index]} alt={author.name} />
                <h2 className={authorsListStyles.authorTitle}>{author.name}</h2>
                <p className={authorsListStyles.authorRole}>{author.role}</p>
                <div>
                  {Object.keys(author.socialLinks).map((key, index) => (
                    <a
                      key={index}
                      href={author.socialLinks[key].url}
                      target="_blank"
                      className="me-3"
                    >
                      <FontAwesomeIcon
                        icon={["fab", author.socialLinks[key].icon]}
                        color="#232536"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AboutPageAuthors;
