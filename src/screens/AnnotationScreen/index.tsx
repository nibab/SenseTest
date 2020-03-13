import React, { useState, useRef, useEffect } from "react"
import { Card, Button, List, Icon, Row, Col, Modal } from 'antd';
import { StyleSheet } from '../../../src/GlobalTypes'
import { AnnotationCanvas } from '../../components/AnnotationCanvas'
import { EditableTagGroup } from '../../components/EditableTagGroup'
import { AppetizeMock } from '../../components/AppetizeMock'
import { Typography } from 'antd';
import TextArea from "antd/lib/input/TextArea";

const { Title } = Typography;

const HEIGHT = 544

type Annotation = {
    img: string
    description: string
    title: string
    tags: string[]
}

export const AnnotationScreen = ({ }) => {
    const [createAnnotationModalHidden, setCreateAnnotationModalHidden] = useState(true)
    const [annotations, setAnnotations] = useState<Annotation[]>([
    ])
    const [annotationCardDetailViewHidden, setAnnotationCardDetailViewHidden] = useState(true)
    const [annotationCardDetailViewId, setAnnotationCardDetailViewId] = useState<number | null>()
    const [imageToAnnotate, setImageToAnnotate] = useState("newsScreenshot.png")

    const onAnnotateScreenshotClick = () => {
        setCreateAnnotationModalHidden(false)
    }

    const renderAppetizeScreen = () => {
        return (
            <div>
                <AppetizeMock />
                <Button style={styles.button} onClick={() => {
                    setCreateAnnotationModalHidden(false)
                    setImageToAnnotate("newsScreenshot.png")
                }}>Annotate</Button>
            </div>
        )
    }

    const renderCreateAnnotationModal = () => {
        return (
            <Modal
                visible={!createAnnotationModalHidden}
                centered={true}
                footer={null}
                onCancel={() => {
                    setImageToAnnotate("")
                    setCreateAnnotationModalHidden(true)
                }}
            >
                <AnnotationCanvas
                    backgroundImage={imageToAnnotate}
                    width={250}
                    height={544}
                    onPublishButtonClick={(data) => {
                        setCreateAnnotationModalHidden(true)
                        const currentAnnotations = annotations
                        currentAnnotations.push({
                            img: "data:image/png;base64," + data.img,
                            description: "The font is not correct.",
                            title: "Font",
                            tags: []
                        })
                        setAnnotations(currentAnnotations)
                        setImageToAnnotate("")
                    }
                    } />
            </Modal>
        )
    }

    const renderAnnotationCardDetailView = () => {
        if (annotationCardDetailViewId === undefined || annotationCardDetailViewId === null) {
            // This is an error. A detail view should never have to display a non-existent annotation.
            return (<div></div>)
        } else {
            return (
                <Modal
                    // Make sure that there is an annotationCardDetailViewId to display, because once the modal
                    // becomes visible, it needs an Annotation (and id) to display.
                    visible={!annotationCardDetailViewHidden && annotationCardDetailViewId !== null}
                    centered={true}
                    footer={null}
                    onOk={(base64Image) => {
                        
                    }}
                    onCancel={() => {
                        setAnnotationCardDetailViewHidden(true)
                    }}
                >
                    <AnnotationDiscussion 
                        annotation={annotations[annotationCardDetailViewId]}
                        width={250}
                        height={544}
                    />
                </Modal>
            )
        }
        
    }

    type AnnotationCardProps = {
        annotation: Annotation,
        annotationIndex: number
    }

    const AnnotationCard = ({annotation, annotationIndex}: AnnotationCardProps) => {
        return (
            <Card hoverable={true}
                onClick={() => {
                    setAnnotationCardDetailViewHidden(false)
                    setAnnotationCardDetailViewId(annotationIndex)
                }}
                title={<EditableTagGroup />}
                style={{ marginBottom: '7px' }}
                bordered={false}
            >
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden', margin: '-10px' }}>
                    <img
                        alt="logo"
                        src={annotation.img}
                        style={{ flex: 0.4, height: '272px', width: 'auto', objectFit: 'contain' }}
                    />
                    <div style={{ flex: 0.6, marginLeft: '10px' }}>
                        <Title level={4}>{annotation.title}</Title>
                        {annotation.description}
                    </div>
                </div>
            </Card>
        )
    }

    const renderAnnotationMessageColumn = () => {
        // Introducing a constraint of maximum 6 cards per page. The rest of the cards will be displayed on the other pages.
        if (annotations.length === 0) {
            return
        }
        var nrOfRows = Math.ceil(annotations.length / 2)
        if (nrOfRows > 3) {
            // Create multiple pages
            nrOfRows = 3
        }
        const items = []
        for (let i = 0; i < nrOfRows; i++) {
            if (annotations.length - (i + 1) * 2 < 0) {
               
                items.push(
                    <Row gutter={8}>
                        <Col span={12}>
                            <AnnotationCard annotation={annotations[i * 2]} annotationIndex={i * 2}/>
                        </Col>
                    </Row>
                )
            } else {
                items.push(
                    <Row gutter={8}>
                        <Col span={12}>
                            <AnnotationCard annotation={annotations[i * 2]} annotationIndex={i * 2} />
                        </Col>
                        <Col span={12}>
                            <AnnotationCard annotation={annotations[i * 2 + 1]} annotationIndex={i * 2 + 1} />
                        </Col>
                    </Row>
                )
            }

        }

        return (
            <div style={{ marginLeft: '20px', flex: '1' }}>
                {items}
            </div>
        )
    }

    return (
        <div>
            <h4>Annotation </h4>
            <div style={{ display: 'flex', width: '100%' }}>
                {renderAppetizeScreen()}
                {renderCreateAnnotationModal()}
                {renderAnnotationMessageColumn()}
                {renderAnnotationCardDetailView()}
            </div>
        </div>
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

type AnnotationDiscussionProps = {
    annotation: Annotation
    height: number
    width: number
}

const AnnotationDiscussion = ({annotation, width, height}: AnnotationDiscussionProps) => {    
    const textAreaRef= useRef<TextArea>(null);

    return (
        <div style={{ display: 'flex'}}> 
            <div style={{ flex: 0.5 }}>
                <img src={annotation.img} height={height} width={width} />
            </div>
            <div style={{ flex: 0.5 }}>
                <TextArea ref={textAreaRef} rows={4} />
                <Button style={{marginTop: '5px', float: 'right'}} onClick={() => {
                    const text = textAreaRef.current === null ? "" : textAreaRef.current.state.value
                    // TODO: Make sure that comment is published.
                    console.log()
                }}>Publish</Button>
            </div>
        </div>
    )
}