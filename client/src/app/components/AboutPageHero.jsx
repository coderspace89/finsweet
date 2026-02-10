"use client";

import React, { useState, useEffect } from "react";
import aboutPageHeroStyles from "./AboutPageHero.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";

const AboutPageHero = () => {
  const [aboutHeroData, setAboutHeroData] = useState(null);

  const queryParams = {
    populate: {
      image: true,
      stats: {
        populate: {
          fields: ["value", "label"],
        },
      },
      missionVision: {
        populate: {
          fields: ["blockTitle", "title", "description"],
        },
      },
    },
  };
  const queryString = qs.stringify(queryParams, { encodeValuesOnly: true });

  useEffect(() => {
    const fetchAboutHero = async () => {
      const apiUrl = `${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}/api/about-page?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data);
      setAboutHeroData(data?.data);
    };
    fetchAboutHero();
  }, []);

  const heroImageUrl = aboutHeroData?.image?.url
    ? `${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}${aboutHeroData?.image?.url}`
    : null;

  return (
    <section className={aboutPageHeroStyles.container}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Row className="align-items-center">
              <Col lg={6}>
                <div>
                  <p className={aboutPageHeroStyles.heroTitle}>
                    {aboutHeroData?.heroTitle}
                  </p>
                  <h2 className={aboutPageHeroStyles.heading}>
                    {aboutHeroData?.heading}
                  </h2>
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <p className={aboutPageHeroStyles.description}>
                    {aboutHeroData?.description}
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row
          style={{
            backgroundImage: `url(${heroImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: aboutHeroData?.image?.height,
            width: "100%",
            position: "relative",
          }}
        >
          <Col lg={8}>
            <Row className={aboutPageHeroStyles.statsbg}>
              {aboutHeroData?.stats?.map((statItem) => (
                <Col lg={4} key={statItem.id}>
                  <div>
                    <h2 className={aboutPageHeroStyles.statsValue}>
                      {statItem.value}
                    </h2>
                    <span className={aboutPageHeroStyles.statsLabel}>
                      {statItem.label}
                    </span>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
          <div className={aboutPageHeroStyles.svgLine}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 862 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 23H311.477L311.142 0H0.334811L0 23Z" fill="#592EA9" />
              <rect x="311.906" width="550" height="23" fill="#FFD050" />
            </svg>
          </div>
        </Row>
      </Container>
      <Container className={aboutPageHeroStyles.missionVisionContainer}>
        <Row>
          {aboutHeroData?.missionVision?.map((data) => (
            <Col lg={6} key={data.id}>
              <div>
                <p className={aboutPageHeroStyles.missionBlockTitle}>
                  {data?.blockTitle}
                </p>
                <h3 className={aboutPageHeroStyles.missionTitle}>
                  {data?.title}
                </h3>
                <p className={aboutPageHeroStyles.missionDescription}>
                  {data?.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AboutPageHero;
