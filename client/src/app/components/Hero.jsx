"use client";

import React, { useState, useEffect } from "react";
import homeStyles from "./Hero.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getStrapiMedia } from "@/lib/utils";

const Hero = () => {
  const [homePageData, sethomePageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = qs.stringify({
    populate: {
      Hero: {
        populate: ["image"],
      },
    },
  });

  async function fetchData() {
    try {
      const response = await fetch(`/api/home-page?${query}`);
      const data = await response.json();
      console.log(data);
      sethomePageData(data.data);
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
  if (!homePageData) return <div>No data found</div>;

  const heroImageUrl = getStrapiMedia(homePageData?.Hero?.image?.url);

  return (
    <section
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25)), url(${heroImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "720px",
        width: "100%",
      }}
    >
      <Container className={homeStyles.container}>
        <Row>
          <Col>
            {heroImageUrl && (
              <div>
                <div className="text-white text-start w-75">
                  <p className={homeStyles.categoryText}>
                    posted on <span>{homePageData.Hero.categoryText}</span>
                  </p>
                  <p className={homeStyles.title}>
                    {homePageData.Hero.headline}
                  </p>
                  <p>
                    By{" "}
                    <span className={homeStyles.authorText}>
                      {homePageData.Hero.author}
                    </span>{" "}
                    | {homePageData.Hero.dateText}
                  </p>
                  <p className={homeStyles.descriptionText}>
                    {homePageData.Hero.description}
                  </p>
                  <div>
                    <Button variant="warning" className={homeStyles.heroBtn}>
                      {homePageData.Hero.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
