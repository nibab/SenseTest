import React, { useState, useRef, useEffect } from "react"
import { Card, Button, List, Icon, Row, Col, Modal, Progress } from 'antd';
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
import { ImgDownloadInProgress } from "../../utils/ImgDownloadInProgress";


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
                        const newPost: Post = {
                            id: post?.id,    
                            image: fetchImageFromUrl(post?.id),
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

    const fetchImageFromUrl = (id: string): ImgDownloadInProgress => {
        const imgDownload = new ImgDownloadInProgress(id)
        //imgDownload.image.then((img) => resolve(img))
        return imgDownload
                 
            // .then((url) => {
            //     return 
            // }).then((response) => {
            //     resolve(response.blob())
            // }).catch((error) => {
            //     reject(error)
            // })
        //})
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
                            <PostCard post={posts[i * 2]} />
                        </Col>
                    </Row>
                )
            } else {
                items.push(
                    <Row key={uuidv4()} gutter={8}>
                        <Col span={12}>
                            <PostCard post={posts[i * 2]} />
                        </Col>
                        <Col span={12}>
                            <PostCard post={posts[i * 2 + 1]} />
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
                {/* {renderAnnotationCardDetailView()} */}
            </div>
        </div>
    )
}

export default AnnotationScreen;

type PostCardProps = {
    post: Post
}

const PostCard = ({post}: PostCardProps) => {
    const [modalVisible, setModalVisible] = useState(false)
    console.log(`Modal visible ${modalVisible}`)
    return (
        <div>
            <Card 
                key={uuidv4()}
                hoverable={true}
                onClick={() => {
                    setModalVisible(true)
                    //setAnnotationCardDetailViewId(post.id)
                }}
                title={<EditableTagGroup />}
                style={{ marginBottom: '7px' }}
                bordered={false}
            >
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden', margin: '-10px' }}>
                    <PostImage postImage={post.image} />
                    
                    <div style={{ flex: 0.6, marginLeft: '10px' }}>
                        <Title level={4}>{post.title}</Title>
                        {post.text}
                    </div>
                </div>
            </Card>
            <Modal
                // Make sure that there is an annotationCardDetailViewId to display, because once the modal
                // becomes visible, it needs an Annotation (and id) to display.
                visible={modalVisible}
                centered={true}
                footer={null}
                onOk={(base64Image) => {
                    
                }}
                onCancel={() => {
                    setModalVisible(false)
                    console.log(`blea ${modalVisible}`)
                }}
            >
                <PostDiscussion 
                    post={post}
                    width={250}
                    height={544}
                />
            </Modal>
        </div>
    )
}

type PostImageProps = {
    postImage: Blob | ImgDownloadInProgress
}
const PostImage = ({postImage}: PostImageProps) => {
    const [image, setImage] = useState<Blob | null>(null)
    const [progress, setProgress] = useState(0)
    const [downloadDone, setDownloadDone] = useState<Blob | null>(null)

    useEffect(() => {
        if (isImgDownloadInProgress(postImage)) {
            postImage.imagePromise.then((img) => {
                setImage(img)
            })
            if (postImage.image !== undefined) {
                setImage(postImage.image)
            } else {
                postImage.callback = async (progress) => {
                    setProgress(progress)
                }
            }
        } else {
            setImage(postImage)
        }
    },[])

    useEffect(() => {
    
    }, [image])

    // Render progress up until the image is fully downloaded, after which show the downloaded image.
    const renderProgess = () => {
        if (downloadDone === null) {
            return (
                <Progress percent={progress * 100} />
            )
        } else {
            return (
                <img
                    alt="logo"
                    src={window.URL.createObjectURL(image)}
                    style={{ flex: 0.4, height: '272px', width: 'auto', objectFit: 'contain' }}
                />
            )
        }        
    }

    const renderImage = () => {
        return (
            <img
                alt="logo"
                src={window.URL.createObjectURL(image)}
                style={{ flex: 0.4, height: '272px', width: 'auto', objectFit: 'contain' }}
            />
        )
    }

    return (
        <div>   
            { image === null ? renderProgess() : renderImage()}
        </div>
    )
}

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
                <PostImage postImage={post.image} />
                {/* <img src={window.URL.createObjectURL(post.image)} height={height} width={width} /> */}
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

function isImgDownloadInProgress(object: any): object is ImgDownloadInProgress{
    return object.imagePromise !== undefined && object.completed !== undefined
}