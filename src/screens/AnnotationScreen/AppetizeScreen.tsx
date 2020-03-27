import React, { useState, useRef, useEffect } from "react"
import { Card, Button, List, Icon, Row, Col, Modal, Progress } from 'antd'
import { AnnotationCanvas } from '../../components/AnnotationCanvas'
import { v4 as uuidv4 } from "uuid"
import { Post } from "../../types"
import { addPost } from '../../store/post/actions'
import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from "react-redux"
import { AssetStorageClient } from "../../clients/AssetStorageClient"
import { CreatePostInput } from "../../API"
import { API, graphqlOperation } from "aws-amplify"
import { createPost } from "../../graphql/mutations"
import { AppetizeMock } from '../../components/AppetizeMock'



export const AppetizeScreen = () => {
	const [createAnnotationModalHidden, setCreateAnnotationModalHidden] = useState(true)
	const [imageToAnnotate, setImageToAnnotate] = useState("newsScreenshot.png")
	const dispatch = useDispatch()
	
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
                    text: post.text !== undefined ? post.text : '',
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
			<AppetizeMock onScreenshot={(imageSrc) => {
				setCreateAnnotationModalHidden(false)
				setImageToAnnotate(imageSrc)
			}} />
			{ renderCreateAnnotationModal() }
		</div>
	)
}