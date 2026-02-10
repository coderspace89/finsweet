"use client";

import React, { useState, useEffect } from "react";
import joinStyles from "./JoinSection.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import Link from "next/link";

const JoinSection = () => {
  const [joinData, setJoinData] = useState({});

  const query = qs.stringify({
    populate: {
      Join: true,
    },
  });

  useEffect(() => {
    const fetchJoinSection = async () => {
      try {
        const response = await fetch(`/api/home-page?${query}`);
        const data = await response.json();
        console.log(data.data.Join);
        setJoinData(data.data.Join);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJoinSection();
  }, []);

  return (
    <section className={joinStyles.joinSection}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6}>
            <div className="text-center">
              <div>
                <h2 className={joinStyles.title}>{joinData.title}</h2>
                <p className={joinStyles.description}>{joinData.description}</p>
              </div>
              <Link
                className={joinStyles.btnYellow}
                href={joinData.buttonLink || "#"}
              >
                {joinData.buttonText}
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default JoinSection;
