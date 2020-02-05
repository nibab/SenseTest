import React, { Fragment, useState, useEffect, useRef, useCallback } from "react"
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import TestExecution from '../components/TestExecution';
import { TestCaseExecutionsClient, TestCaseExecution } from '../clients/TestCaseExecutionsClient';
import { UploadFile } from 'antd/lib/upload/interface';
import { Card, Button } from 'antd';
import { StyleSheet }  from '../../src/GlobalTypes'
import { AnnotationCanvas } from '../components/AnnotationCanvas';

const HEIGHT = 544

export const AnnotationScreen =  ({}) => {
    const [annotationMessageSectionImg, setAnnotationMessageSectionImg] = useState('');
    const [annotationCanvasHidden, setAnnotationCanvasHidden] = useState(true)

    const onAnnotateScreenshotClick = () => {
        setAnnotationCanvasHidden(false)
    }

  const renderAppetizeScreen = () => {
    return (
        <div style={{ width: '250px'}}> 
            <img style={{ width: '250px', height: `${HEIGHT}px` }} src="newsScreenshot.png" />
            <Button style={ styles.button } onClick={
                () => setAnnotationCanvasHidden(false)
            }>Annotate Screenshot</Button>
        </div>
    )
  }

  const renderAnnotationCanvas = () => {
    if (!annotationCanvasHidden) {
        return (
            <AnnotationCanvas 
                backgroundImage={"newsScreenshot.png"} 
                width={250} 
                height={544} 
                onPublishButtonClick={(base64Image) => {
                    console.log("WAGWAN")
                    setAnnotationMessageSectionImg("data:image/png;base64," + base64Image)
                    setAnnotationCanvasHidden(true)
                }
            }/>
        )
    }
    
  }

  const renderAnnotationMessageColumn = () => {
    return (
        <div style={{ marginLeft: '20px', height: `${HEIGHT}px`, backgroundColor: 'green', flex: '1'}}> 
            <Card style={{ width: '250px', height: `${HEIGHT}px` }} cover={<img src={annotationMessageSectionImg} />} />
            <div>ABC</div>
        </div>
    )
  }

 
    return (
        <Container style={{ paddingTop: 30 }}>
            <h3>Annotation </h3>
        <div style={{ display: 'flex', width: '100%' }}>
            
        {renderAppetizeScreen()}
        {renderAnnotationCanvas()}
        {renderAnnotationMessageColumn()}
        {/* <Card style={{ width: '250px', height: '444px' }} cover={<img src="zeplin.png" />} />
        <Button style={{ float: 'right', marginTop: '10px' }}>Hello</Button> */}            
            
        </div>
        </Container>
    )
  
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
