import React, { useState, useRef, useEffect } from "react"
import { Card, Button, List, Icon, Row, Col, Modal, Progress } from 'antd'
import { AnnotationCanvas } from '../../components/AnnotationCanvas'
import { v4 as uuidv4 } from "uuid"
import { Post, PostGraphQl } from "../../types"
import { addPost } from '../../store/post/actions'
import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from "react-redux"
import { AssetStorageClient } from "../../clients/AssetStorageClient"
import { DataLayerClient } from '../../clients/DataLayerClient'
import { CreatePostInput, CreatePostMutation } from "../../API"
import { API, graphqlOperation } from "aws-amplify"
import { createPost } from "../../graphql/mutations"
import { AppetizeMock } from '../../components/AppetizeMock'
import Log from "../../utils/Log"

export const AppetizeScreen = () => {
	const [createAnnotationModalHidden, setCreateAnnotationModalHidden] = useState(true)
	const [imageToAnnotate, setImageToAnnotate] = useState("newsScreenshot.png")
	const dispatch = useDispatch()
	
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
                    onPublishButtonClick={async (blobPromise, text, title) => {
						const blob = await blobPromise
						
						// Validate that there is text.
						if (text === "" || text === undefined) {
							text = 'No title'
						}

						// Validate that there is a title.
						if (title === "" || title === undefined) {
							title = 'No text'
						}

                        const createPostInput: CreatePostInput = {
                            id: uuidv4(),
                            imageId: uuidv4(),
                            projectId: '1',
							text: text,
							title: title
                        }
						const newPost = await DataLayerClient.createNewAnnotationPost(blob, createPostInput)
						dispatch(addPost(newPost))
						setCreateAnnotationModalHidden(true)
						setImageToAnnotate("")
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