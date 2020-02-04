import React, { Fragment, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ZeplinAuth from '../utils/ZeplinAuth';

const UserProfile = {
  name: 'John Appleseed',
  email: 'johnappleseed@gmail.com',
  role: 'Admin'
}

const SettingsScreen = () => {
  const enabled = false;
  const clientId = '5df1298dd0f7fb1a408d4ef1';
  const redirectURI = 'http://localhost:9090';
  const zeplinURL = `https://api.zeplin.dev/v1/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code`;

  const [isZeplinIntegrationActivated, setIsZeplinIntegrationActivated] = useState(false);

  useEffect(() => {
    async function setZeplinIntegrationStatus() {
      const activated = await ZeplinAuth.isZeplinIntegrationActivated()
      setIsZeplinIntegrationActivated(!!activated ? true : false)
    }
    setZeplinIntegrationStatus()
  }, [])

  return (
    <Container style={{ paddingTop: 30 }}>
      <h3>Settings</h3>
      <Card>
        <Card.Header>Account Details</Card.Header>
        <Card.Body>
          <p><b>Name</b>: {UserProfile.name}</p>
          <p><b>Email</b>: {UserProfile.email}</p>
          <p><b>Role</b>: {UserProfile.role}</p>
        </Card.Body>
      </Card>
      <br/>
      <h3>Integrations</h3>
      <CardDeck>
        <Card style={{ maxWidth: '250px', }}>
          <Card.Header>Zeplin</Card.Header>
          <Card.Img src='zeplin.png'/>
          <Card.Footer>
            {isZeplinIntegrationActivated ? (
              <p style={{ display: 'inline-block'}}>Enabled</p>
            ) : (
              <Fragment>
                <p style={{ display: 'inline-block'}}>Disabled</p>
                <Button style={{ float: 'right' }} variant='primary'
                  disabled={isZeplinIntegrationActivated}
                  href={zeplinURL}>Enable</Button>
              </Fragment>
            )}
          </Card.Footer>
        </Card>
      </CardDeck>
    </Container>
  )
}

export default SettingsScreen;