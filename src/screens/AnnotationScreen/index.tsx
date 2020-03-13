import React, { useState } from "react"
import { Card, Button, List, Icon, Row, Col, Modal } from 'antd';
import { StyleSheet } from '../../../src/GlobalTypes'
import { AnnotationCanvas } from '../../components/AnnotationCanvas'
import { EditableTagGroup } from '../../components/EditableTagGroup'
import { AppetizeMock } from '../../components/AppetizeMock'
import { Typography } from 'antd';

const { Title } = Typography;

const HEIGHT = 544

type Annotation = {
    img: string
    text: string
    title: string
}

export const AnnotationScreen = ({ }) => {
    const [createAnnotationModalHidden, setCreateAnnotationModalHidden] = useState(true)
    const [annotations, setAnnotations] = useState<Annotation[]>([
    ])
    const [annotationCardDetailViewHidden, setAnnotationCardDetailViewHidden] = useState(true)
    const [annotationCardDetailViewId, setAnnotationCardDetailViewId] = useState<string | null>()

    const onAnnotateScreenshotClick = () => {
        setCreateAnnotationModalHidden(false)
    }

    const renderAppetizeScreen = () => {
        return (
            <div>
                <AppetizeMock />
                <Button style={styles.button} onClick={
                    () => setCreateAnnotationModalHidden(false)
                }>Annotate</Button>
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
                    setCreateAnnotationModalHidden(true)
                }}
            >
                <AnnotationCanvas
                    backgroundImage={"newsScreenshot.png"}
                    width={250}
                    height={544}
                    onPublishButtonClick={(data) => {
                        setCreateAnnotationModalHidden(true)
                        const currentAnnotations = annotations
                        currentAnnotations.push({
                            img: "data:image/png;base64," + data.img,
                            text: "The font is not correct.",
                            title: "Font"
                        })
                        setAnnotations(currentAnnotations)
                    }
                    } />
            </Modal>
        )
    }

    type IconProps = {
        type: string
        text: string
    }

    type AnnotationCardType = {
        img: string,
        title: string,
        description: string,
        tags: string[]
    }

    const renderAnnotationCardDetailView = () => {
        return (
            <Modal
                visible={!annotationCardDetailViewHidden}
                centered={true}
                footer={null}
                onOk={(base64Image) => {
                    
                }}
                onCancel={() => {
                    setAnnotationCardDetailViewHidden(true)
                }}
            >
                Bonjour
            </Modal>
        )
    }

    const AnnotationCard = ({ img, title, description, tags }: AnnotationCardType) => {
        return (
            <Card hoverable={true}
                onClick={() => setAnnotationCardDetailViewHidden(false)}
                title={<EditableTagGroup />}
                style={{ marginBottom: '7px' }}
                bordered={false}
            >
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden', margin: '-10px' }}>
                    <img
                        alt="logo"
                        src={img}
                        style={{ flex: 0.4, height: '272px', width: 'auto', objectFit: 'contain' }}
                    />
                    <div style={{ flex: 0.6, marginLeft: '10px' }}>
                        <Title level={4}>{title}</Title>
                        {description}
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
                const annotationMessage = annotations[i * 2]
                items.push(
                    <Row gutter={8}>
                        <Col span={12}>
                            <AnnotationCard img={annotationMessage.img} title={annotationMessage.title} tags={[]} description={annotationMessage.text} />
                        </Col>
                    </Row>
                )
            } else {
                const annotationMessage1 = annotations[i * 2]
                const annotationMessage2 = annotations[i * 2 + 1]
                items.push(
                    <Row gutter={8}>
                        <Col span={12}>
                            <AnnotationCard img={annotationMessage1.img} title={annotationMessage1.title} tags={[]} description={annotationMessage1.text} />
                        </Col>
                        <Col span={12}>
                            <AnnotationCard img={annotationMessage2.img} title={annotationMessage2.title} tags={[]} description={annotationMessage2.text} />
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
