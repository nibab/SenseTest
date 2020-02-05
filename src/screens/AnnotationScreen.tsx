import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import TestExecution from '../components/TestExecution';
import { TestCaseExecutionsClient, TestCaseExecution } from '../clients/TestCaseExecutionsClient';
import { UploadFile } from 'antd/lib/upload/interface';
import { Card } from 'antd';
import { StyleSheet }  from '../../src/GlobalTypes'

class AnnotationScreen extends React.Component<RouteComponentProps, {}> {
  constructor(props: RouteComponentProps) {
    super(props)
  }

  renderAppetizeScreen = () => {
    return (
        <div style={{ width: '250px'}}> 
            <Card style={{ width: '250px', height: '444px' }} cover={<img src="zeplin.png" />} />
            <Button style={ styles.button }>Hello</Button>
        </div>
    )
  }

  renderAnnotationCanvas = () => {
    return (
        <div style={{ width: '250px', marginLeft: '20px'}}> 
            <Card style={{ width: '250px', height: '444px' }} cover={<img src="zeplin.png" />} />
            <Button style={ styles.button }>Hello</Button>
        </div>
    )
  }

  renderAnnotationMessageColumn = () => {
    return (
        <div style={{ marginLeft: '20px', height: '444px', backgroundColor: 'green', flex: '1'}}> 
            <div>ABC</div>
        </div>
    )
  }

  render() {
    return (
      <Container style={{ paddingTop: 30 }}>
          <h3>Annotation </h3>
        <div style={{ display: 'flex', width: '100%' }}>
          
        {this.renderAppetizeScreen()}
        {this.renderAnnotationCanvas()}
        {this.renderAnnotationMessageColumn()}
        {/* <Card style={{ width: '250px', height: '444px' }} cover={<img src="zeplin.png" />} />
        <Button style={{ float: 'right', marginTop: '10px' }}>Hello</Button> */}            
          
        </div>
      </Container>
    )
  }
}

const styles: StyleSheet = {
    button: {
        float: 'right', 
        marginTop: '10px', 
        marginRight: '3px',
        marginBottom: '3px'
    }
}

export default AnnotationScreen;
