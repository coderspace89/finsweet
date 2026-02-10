"use client";

import React, { useState, useEffect } from "react";
import privacyPolicyStyles from "./PrivacyPolicy.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactMarkdown from "react-markdown";

const PrivacyPolicy = () => {
  const [privacyPolicyData, setPrivacyPolicyData] = useState(null);

  useEffect(() => {
    const fetchPrivacyPolicyData = async () => {
      const apiUrl = `/api/privacy-policy`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data);
      setPrivacyPolicyData(data?.data);
    };
    fetchPrivacyPolicyData();
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
    <div>
      <section className={privacyPolicyStyles.container}>
        <Container>
          <Row>
            <Col>
              <div className="text-center">
                <h2 className={privacyPolicyStyles.title}>Privacy Policy</h2>
                <span className={privacyPolicyStyles.updateText}>
                  Last Updated on {formatDate(privacyPolicyData?.date)}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={privacyPolicyStyles.policyContainer}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className={privacyPolicyStyles.markdownContainer}>
                <ReactMarkdown>{privacyPolicyData?.content}</ReactMarkdown>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
