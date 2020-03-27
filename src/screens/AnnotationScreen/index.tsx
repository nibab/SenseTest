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
import { ListPostsQuery, ModelPostFilterInput, CreatePostInput } from "../../API";
import { AssetStorageClient } from '../../clients/AssetStorageClient'
import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { addPost } from '../../store/post/actions'
import { ImgDownloadInProgress } from "../../utils/ImgDownloadInProgress";
import { createPost } from "../../graphql/mutations";
import { PostsGrid } from "./PostsGrid";


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
                            image: new ImgDownloadInProgress(post?.id),
                            projectId: '1'
                        }
                        dispatch(addPost(newPost))
                    }
                })
            }            
        } catch {
            console.log("Couldnt get all posts.")
        }
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

    const createNewAnnotationPost = (imageId: string, imageBlob: Blob, post: Post) => {
        AssetStorageClient.createUploadUrl(imageId, "1").then((presignedUrlFields) => {
            console.log("Presigned url for get " + presignedUrlFields)
            return AssetStorageClient.uploadDataToUrl(imageBlob, presignedUrlFields)
        }).then(async () => {
            try {
                const postRequest: CreatePostInput = {
                    id: post.id,
                    imageId: imageId,
                    projectId: "1",
                    title: "2",
                    text: "t",
                    dateCreated: "today"
                }
                API.graphql(graphqlOperation(createPost, {input: postRequest}))
                console.log("Succeded in creating post.")
            } catch (err) {
                console.log("There has been an error in createNewAnnotationPost")
            }
        }).catch(() => {
            
        })
    }

    const renderCreateAnnotationModal = () => {
        return (
            <Modal
                title={"Create New Post"}
                visible={!createAnnotationModalHidden}
                centered={true}
                onCancel={() => {
                    //onCancel()
                    setImageToAnnotate("")
                    setCreateAnnotationModalHidden(true)
                }}
                footer={null}
                width={'50%'}
                style={{
                    minWidth: '650px'
                }}
                bodyStyle={{
                    minHeight: '50vh', 
                    maxHeight: '75vh',
                    overflow: "auto",
                    
                }}
            >
                <AnnotationCanvas
                    visible={!createAnnotationModalHidden}
                    backgroundImage={imageToAnnotate}
                    onPublishButtonClick={async (blobPromise, text) => {
                        const uuid = uuidv4()
                        const blob = await blobPromise
                        
                        // getBlobFromCanvas().then((blob) => {
                        //     AssetStorageClient.uploadDataToUrl(blob, presignedUrlFields).then(() => {                                 
                        //     })
                        // })

                        const newPost: Post = {
                            id: uuid,
                            image: blob,
                            projectId: '1',
                            text: text
                        }

                        dispatch(addPost(newPost))
                        setImageToAnnotate("")
                        createNewAnnotationPost(uuid, blob, newPost)
                        setCreateAnnotationModalHidden(true)
                    }}
                    onCancel={() => {
                        console.log('blea cancel')
                        setCreateAnnotationModalHidden(true)
                    }}
                />
            </Modal>
        )
    }

    

    return (
        <div>
            <h4>Annotation </h4>
            <div style={{ display: 'flex', width: '100%' }}>
                {renderAppetizeScreen()}
                {renderCreateAnnotationModal()}
                <PostsGrid />
                {/* {renderAnnotationCardDetailView()} */}
            </div>
        </div>
    )
}

export default AnnotationScreen;





