import React from "react";
import Header from "../header/Header";
import Body from "../body/Body";
import Footer from "../footer/Footer";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Header />
      <Body />
      <Footer />
    </Container>
  );
};

export default Home;
