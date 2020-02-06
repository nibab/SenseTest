import React, { Fragment, useState, useEffect, useRef, useCallback } from "react"
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import TestExecution from '../components/TestExecution';
import { TestCaseExecutionsClient, TestCaseExecution } from '../clients/TestCaseExecutionsClient';
import { UploadFile } from 'antd/lib/upload/interface';
import { Card, Button, List, Icon, Row, Col, Modal } from 'antd';
import { StyleSheet }  from '../../src/GlobalTypes'
import { AnnotationCanvas } from '../components/AnnotationCanvas';
import { EditableTagGroup } from '../components/EditableTagGroup'
import Meta from "antd/lib/card/Meta";
import { Typography } from 'antd';

const { Title } = Typography;

const HEIGHT = 544

type AnnotationMessage = {
    img: string
    text: string
    title: string
}

export const AnnotationScreen =  ({}) => {
    const [annotationMessageSectionImg, setAnnotationMessageSectionImg] = useState('');
    const [annotationCanvasHidden, setAnnotationCanvasHidden] = useState(true)
    const [annotationMessages, setAnnotationMessages] = useState<AnnotationMessage[]>([
    ])

    const onAnnotateScreenshotClick = () => {
        setAnnotationCanvasHidden(false)
    }

  const renderAppetizeScreen = () => {
    return (
        <div style={{ width: '250px', textAlign: 'center'}}> 
            <img style={{ width: '250px', height: `${HEIGHT}px` }} src="newsScreenshot.png" />
            <Button style={ styles.button } onClick={
                () => setAnnotationCanvasHidden(false)
            }>Annotate</Button>
        </div>
    )
  }

  const renderAnnotationCanvas = () => {
    if (!annotationCanvasHidden) {
        return (
            <Modal
                visible={true}
                centered={true}
                footer={null}
                onOk={(base64Image) => {
                    console.log("WAGWAN")
                    //setAnnotationMessageSectionImg("data:image/png;base64," + base64Image)
                    setAnnotationCanvasHidden(true)
                    const currentMessages = annotationMessages
                    currentMessages.push({
                        img: "data:image/png;base64," + base64Image,
                        text: "The font is not correct." ,
                        title: "Font"
                    })
                    setAnnotationMessages(currentMessages)
                }}
                onCancel={() => {
                    setAnnotationCanvasHidden(true)
                }}
            >
                <AnnotationCanvas 
                    backgroundImage={"newsScreenshot.png"} 
                    width={250} 
                    height={544} 
                    onPublishButtonClick={(base64Image) => {
                        console.log("WAGWAN")
                        //setAnnotationMessageSectionImg("data:image/png;base64," + base64Image)
                        setAnnotationCanvasHidden(true)
                        const currentMessages = annotationMessages
                        currentMessages.push({
                            img: "data:image/png;base64," + base64Image,
                            text: "The font is not correct." ,
                            title: "Font"
                        })
                        setAnnotationMessages(currentMessages)
                    }
                }/>
            </Modal>
            
        )
    }
    
  }

  type IconProps = {
      type: string
      text: string
  }

  const IconText = ({ type, text }: IconProps) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

    const renderTags = () => {

    }

    type AnnotationCardType = {
        img: string,
        title: string,
        description: string,
        tags: string[]
    }

    const AnnotationCard = ({img, title, description, tags}: AnnotationCardType) => {
        return (
            <Card hoverable={true} title={<EditableTagGroup/>} style={{marginBottom: '7px'}} bordered={false} actions={[
                <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
            ]}>
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden', margin: '-10px'}}>
                    <img
                        alt="logo"
                        src={img}
                        style={{ flex: 0.4, height: '272px', width: 'auto', objectFit:'contain'}}
                    />
                    <div style={{flex: 0.6, marginLeft: '10px'}}>
                        <Title level={4}>{title}</Title>
                        {description}
                    </div>
                </div>
            </Card>
        )
    }

  const renderAnnotationMessageColumn = () => {
    // Introducing a constraint of maximum 6 cards per page. The rest of the cards will be displayed on the other pages.
    if (annotationMessages.length === 0) {
        return
    }
    var nrOfRows = Math.ceil(annotationMessages.length / 2)
    if (nrOfRows > 3) {
        // Create multiple pages
        nrOfRows = 3
    }
    const items = []
    for (let i = 0; i < nrOfRows; i++) {
        if (annotationMessages.length - (i + 1) * 2 < 0) {
            const annotationMessage = annotationMessages[i * 2]
            items.push(
                <Row gutter={8}>
                    <Col span={12}>
                        <AnnotationCard img={annotationMessage.img} title={annotationMessage.title} tags={[]} description={annotationMessage.text}/>
                    </Col>
                </Row>
            )
        } else {
            const annotationMessage1 = annotationMessages[i * 2]
            const annotationMessage2 = annotationMessages[i * 2 + 1]
            items.push(
                <Row gutter={8}>
                    <Col span={12}>
                        <AnnotationCard img={annotationMessage1.img} title={annotationMessage1.title} tags={[]} description={annotationMessage1.text}/>
                    </Col>
                    <Col span={12}>
                        <AnnotationCard img={annotationMessage2.img} title={annotationMessage2.title} tags={[]} description={annotationMessage2.text}/>
                    </Col>
                </Row>
            ) 
        }
        
    }



    return (
        <div style={{ marginLeft: '20px', flex: '1'}}> 
            { items }
        </div>    
    )
  }

 
    return (
        //<Container style={{ paddingTop: 30 }}>
        <div>
        <h4>Annotation </h4>
        <div style={{ display: 'flex', width: '100%' }}>
            
        {renderAppetizeScreen()}
        {renderAnnotationCanvas()}
        {renderAnnotationMessageColumn()}
        {/* <Card style={{ width: '250px', height: '444px' }} cover={<img src="zeplin.png" />} />
        <Button style={{ float: 'right', marginTop: '10px' }}>Hello</Button> */}            
            
        </div>
        </div>
            
        //</Container>
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
