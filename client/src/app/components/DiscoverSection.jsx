"use client";

import React, { useState, useEffect } from "react";
import discoverStyles from "./DiscoverSection.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";

const DiscoverSection = () => {
  const query = qs.stringify({
    populate: {
      Discover: {
        populate: ["image"],
      },
    },
  });

  const [discoverSection, setDiscoverSection] = useState(null);

  useEffect(() => {
    const fetchDiscoverSection = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/home-page?${query}`
        );
        const data = await response.json();
        console.log(data);
        setDiscoverSection(data.data.Discover);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiscoverSection();
  }, []);

  if (!discoverSection) return <div>Loading...</div>;

  const imageUrl = `http://localhost:1337${discoverSection.image[0].url}`;

  return (
    <section className={discoverStyles.discoverSection}>
      <Container>
        <Row className="align-items-center position-relative">
          <Col
            lg={7}
            style={{
              background: `url(${imageUrl}) left no-repeat`,
              backgroundSize: "contain",
              height: "705px",
              width: "100%",
              objectFit: "cover",
            }}
            className={discoverStyles.colBg}
          ></Col>
          <Col lg={5}>
            <div
              className={`position-absolute top-50 start-50 translate-middle-y ${discoverStyles.textColBg}`}
            >
              <p className={discoverStyles.blockTitle}>
                {discoverSection.blockTitle}
              </p>
              <h3 className={discoverStyles.title}>{discoverSection.title}</h3>
              <p className={discoverStyles.description}>
                {discoverSection.description}
              </p>
              <Link
                href={discoverSection.buttonLink}
                className={discoverStyles.btnYellow}
              >
                {discoverSection.buttonText}
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DiscoverSection;
