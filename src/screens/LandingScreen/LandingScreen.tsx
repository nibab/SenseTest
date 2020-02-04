import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './LandingScreen.css';
import '../HomeScreen/HomeScreen.css';

const LandingScreen = () => (
  <Jumbotron>
    <Container>
      <Row style={{ minHeight: '30em' }}>
        <Col style={{ textAlign: 'left', alignItems: 'center', display: 'flex' }}>
          <h3 style={{ color: 'white' }}>Making quality assurance suck less</h3>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <Button size="lg">Join Waitlist</Button>
      </Row>
    </Container>
  </Jumbotron>
)

export default LandingScreen;
