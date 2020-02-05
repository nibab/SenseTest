import React, { Fragment, useState, useEffect, useRef, useCallback } from "react"
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import TestExecution from '../components/TestExecution';
import { TestCaseExecutionsClient, TestCaseExecution } from '../clients/TestCaseExecutionsClient';
import { UploadFile } from 'antd/lib/upload/interface';
import { Card, Button, List, Icon } from 'antd';
import { StyleSheet }  from '../../src/GlobalTypes'
import { AnnotationCanvas } from '../components/AnnotationCanvas';
import Meta from "antd/lib/card/Meta";

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

  const renderAnnotationMessageColumn = () => {
    return (
        <div style={{ marginLeft: '20px', height: `${HEIGHT}px`, backgroundColor: 'white', flex: '1'}}> 
            <List
                itemLayout="vertical"
                size="large"
                style={{padding: '10px'}}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={annotationMessages}
                footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                }
                renderItem={item => (
                <List.Item
                    key={item.title}
                    style={{padding: '5px'}}
                    extra={
                        <img
                            height={272}
                            alt="logo"
                            src={item.img}
                        />
                    }
                >
                    <List.Item.Meta title={<a>{item.title}</a>}/>
                    {item.text}
                    <div style={{bottom: 10, position: 'absolute'}}>
                        <IconText type="star-o" text="156" key="list-vertical-star-o" /> | 
                        <IconText type="like-o" text="156" key="list-vertical-like-o" /> | 
                        <IconText type="message" text="2" key="list-vertical-message" />
                    </div>
                </List.Item>
                )}
            />
        </div>    


        // <div style={{ marginLeft: '20px', height: `${HEIGHT}px`, backgroundColor: 'white', flex: '1'}}> 
        //     {/* <Card style={{ width: '250px', height: `${HEIGHT}px` }} cover={<img src={annotationMessageSectionImg} />} /> */}
            
        //     {annotationMessages.map((message: AnnotationMessage) => (
        //         <div>
        //             <Card
        //                 hoverable
        //                 style={{ width: 120, height: 'auto' }}
        //                 cover={<img alt="example" src={message.img} />}
        //             >
        //                 <Meta title={message.message} description="@cezbabin" />
        //             </Card>
        //         </div>
                
        //     ))}
        // </div>
    )
  }

 
    return (
        //<Container style={{ paddingTop: 30 }}>
        <div>
<h3>Annotation </h3>
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
