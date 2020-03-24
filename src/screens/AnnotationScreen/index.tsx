import React, { useState, useRef, useEffect } from "react"
import { Card, Button, List, Icon, Row, Col, Modal } from 'antd';
import { AnnotationCanvas } from '../../components/AnnotationCanvas'
import { EditableTagGroup } from '../../components/EditableTagGroup'
import { AppetizeMock } from '../../components/AppetizeMock'
import { Typography } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { PostsClient } from '../../clients/PostsClient'
import { v4 as uuidv4 } from "uuid"
import { Post } from "../../types";
import { useSelector } from "../../store";

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
    const postsSelector = useSelector(state => state.post)
    const [annotationCardDetailViewHidden, setAnnotationCardDetailViewHidden] = useState(true)
    const [annotationCardDetailViewId, setAnnotationCardDetailViewId] = useState<number | null>()
    const [imageToAnnotate, setImageToAnnotate] = useState("newsScreenshot.png")
    // Posts
    const [getPostsFetchInProgress, setGetPostsFetchInProgress] = useState(false)

    const onAnnotateScreenshotClick = () => {
        setCreateAnnotationModalHidden(false)
    }

    const getPosts = () => {
        setGetPostsFetchInProgress(true)
        PostsClient.getPostsForProject('1').then((response) => {
            const data = response['data']
        }).catch((err) => {
            //debugger
        })
    }

    useEffect(() => {
        getPosts()
    }, [])

    const renderAppetizeScreen = () => {
        return (
            <div>
                <AppetizeMock onScreenshot={(imageSrc) => {
                    setCreateAnnotationModalHidden(false)
                    setImageToAnnotate(imageSrc)
                }} />
                
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
                        // const currentAnnotations = annotations
                        // currentAnnotations.push({
                        //     img: "data:image/png;base64," + data.img,
                        //     description: "The font is not correct.",
                        //     title: "Font",
                        //     tags: []
                        // })
                        // setAnnotations(currentAnnotations)
                        // setImageToAnnotate("")
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

    type PostCardProps = {
        post: Post,
        annotationIndex: number
    }

    const PostCard = ({post, annotationIndex}: PostCardProps) => {
        return (
            <Card 
                key={uuidv4()}
                hoverable={true}
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
                        src={post.image}
                        style={{ flex: 0.4, height: '272px', width: 'auto', objectFit: 'contain' }}
                    />
                    <div style={{ flex: 0.6, marginLeft: '10px' }}>
                        <Title level={4}>{post.title}</Title>
                        {post.text}
                    </div>
                </div>
            </Card>
        )
    }

    const renderAnnotationMessageColumn = () => {
        const posts = postsSelector.posts
        // Introducing a constraint of maximum 6 cards per page. The rest of the cards will be displayed on the other pages.
        if (posts.length === 0) {
            return
        }
        var nrOfRows = Math.ceil(posts.length / 2)
        if (nrOfRows > 3) {
            // Create multiple pages
            nrOfRows = 3
        } 
        const items = []
        for (let i = 0; i < nrOfRows; i++) {
            if (posts.length - (i + 1) * 2 < 0) {
               
                items.push(
                    <Row key={uuidv4()} gutter={8}>
                        <Col span={12}>
                            <PostCard post={posts[i * 2]} annotationIndex={i * 2}/>
                        </Col>
                    </Row>
                )
            } else {
                items.push(
                    <Row gutter={8}>
                        <Col span={12}>
                            <PostCard post={posts[i * 2]} annotationIndex={i * 2} />
                        </Col>
                        <Col span={12}>
                            <PostCard post={posts[i * 2 + 1]} annotationIndex={i * 2 + 1} />
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