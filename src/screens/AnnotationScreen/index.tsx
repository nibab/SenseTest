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
import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "../../graphql/queries"
import { ListPostsQuery, ModelPostFilterInput } from "../../API";
import { AssetStorageClient } from '../../clients/AssetStorageClient'
import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { addPost } from '../../store/post/actions'


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
    const postsSelector = useSelector(state => state.post)
    const [annotationCardDetailViewHidden, setAnnotationCardDetailViewHidden] = useState(true)
    const [annotationCardDetailViewId, setAnnotationCardDetailViewId] = useState<string | null>()
    const [imageToAnnotate, setImageToAnnotate] = useState("newsScreenshot.png")
    // Posts
    const [getPostsFetchInProgress, setGetPostsFetchInProgress] = useState(false)
    const dispatch = useDispatch()

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

    const getPostsGraphQl = async () => {
        const query: ModelPostFilterInput = {
            projectId: {
                eq: '1'
            }
        }
        try {
            const response = await API.graphql(graphqlOperation(listPosts, {filter: query})) as { data: ListPostsQuery }
            if (response.data.listPosts !== null) {
                const posts = response.data.listPosts.items
                posts?.forEach(async (post) => {
                    if (post !== null) {
                        const imageBlob = await fetchImageFromUrl(post.imageId)
                        const newPost: Post = {
                            id: post?.id,    
                            image: imageBlob,
                            projectId: '1'
                        }
                        dispatch(addPost(newPost))
                    }
                })
                //debugger
            }            
        } catch {
            console.log("Couldnt get all posts.")
        }
    }

    const fetchImageFromUrl = (imageId: string): Promise<Blob> => {
        return new Promise(async (resolve, reject) => {
            const url = await AssetStorageClient.getDownloadUrl(imageId)
            const response = await fetch(url, {
                method: 'GET'
            })
            if (response.body !== null) {
                const reader = response.body.getReader();

                // Step 2: get total length
                const contentLength = response.headers.get('Content-Length');

                if (contentLength === null) {
                    reject()
                    return
                }

                // Step 3: read the data
                let receivedLength = 0; // received that many bytes at the moment
                let chunks = []; // array of received binary chunks (comprises the body)
                while(true) {
                    const {done, value} = await reader.read();

                    if (done) {
                        break;
                    }

                    chunks.push(value);
                    receivedLength += value.length;

                    console.log(`Received ${receivedLength/parseInt(contentLength)}. `)
                }

                // Step 4: concatenate chunks into single Uint8Array
                let chunksAll = new Uint8Array(receivedLength); // (4.1)
                let position = 0;
                for(let chunk of chunks) {
                    chunksAll.set(chunk, position); // (4.2)
                    position += chunk.length;
                }

                resolve(new Blob([chunksAll]))
            }
            
            
            // .then((url) => {
            //     return 
            // }).then((response) => {
            //     resolve(response.blob())
            // }).catch((error) => {
            //     reject(error)
            // })
        })
    }

    useEffect(() => {
        getPosts()
        getPostsGraphQl()
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
                    onPublishButtonClick={() => {
                        setImageToAnnotate("")
                        setCreateAnnotationModalHidden(true)
                }}/>
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
                    <PostDiscussion 
                        post={postsSelector.posts.filter((post) => post.id === annotationCardDetailViewId)[0]}
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

    const PostCard = ({post}: PostCardProps) => {
        return (
            <Card 
                key={uuidv4()}
                hoverable={true}
                onClick={() => {
                    setAnnotationCardDetailViewHidden(false)
                    setAnnotationCardDetailViewId(post.id)
                }}
                title={<EditableTagGroup />}
                style={{ marginBottom: '7px' }}
                bordered={false}
            >
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden', margin: '-10px' }}>
                    <img
                        alt="logo"
                        src={window.URL.createObjectURL(post.image)}
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
                    <Row key={uuidv4()} gutter={8}>
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

type PostDiscussionProps = {
    post: Post
    height: number
    width: number
}

const PostDiscussion = ({post, width, height}: PostDiscussionProps) => {    
    const textAreaRef= useRef<TextArea>(null);

    return (
        <div style={{ display: 'flex'}}> 
            <div style={{ flex: 0.5 }}>
                <img src={window.URL.createObjectURL(post.image)} height={height} width={width} />
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