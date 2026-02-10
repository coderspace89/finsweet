"use client";

import React, { useState, useEffect } from "react";
import aboutStyles from "./AboutSection.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";

const AboutSection = () => {
  const [aboutData, setAboutData] = useState(null);
  const [missionData, setMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = qs.stringify({
    populate: {
      About: true,
      Mission: true,
    },
  });

  async function fetchData() {
    try {
      const response = await fetch(
        `${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}/api/home-page?${query}`
      );
      const data = await response.json();
      console.log(data);
      setAboutData(data.data);
      setMissionData(data.data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!aboutData || !missionData) return <div>No data found</div>;

  return (
    <section>
      <Container>
        <Row className={`position-relative ${aboutStyles.sectionBg}`}>
          <div className="position-absolute top-0 start-0 translate-middle-y">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1061 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 23H843L842.094 0H0V23Z" fill="#FFD050" />
              <path d="M779 23H1061V0H779.303L779 23Z" fill="#592EA9" />
            </svg>
          </div>
          <Col lg={6} className="mb-4 mb-lg-0">
            <div>
              <p className={aboutStyles.blockTitle}>
                {aboutData.About.blockTitle}
              </p>
              <h2 className={aboutStyles.aboutTitle}>
                {aboutData.About.title}
              </h2>
              <p className={aboutStyles.aboutDescription}>
                {aboutData.About.description}
              </p>
              <Link href="/about" className={aboutStyles.aboutLink}>
                {aboutData.About.cta}
              </Link>
            </div>
          </Col>
          <Col lg={6}>
            <div>
              <p className={aboutStyles.blockTitle}>
                {missionData.Mission.blockTitle}
              </p>
              <h2 className={aboutStyles.missionTitle}>
                {missionData.Mission.title}
              </h2>
              <p className={aboutStyles.missionDescription}>
                {missionData.Mission.description}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
