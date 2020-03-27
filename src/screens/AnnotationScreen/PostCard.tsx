import React, { useState, useRef, useEffect } from "react"
import { Post } from "../../types"
import { v4 as uuidv4 } from "uuid"
import { Card, Modal } from "antd"
import { PostImage } from "./PostImage"
import { PostDiscussion } from "./PostDiscussion"
import { Typography } from 'antd'
import { useSelector } from "../../store"


const { Title } = Typography;

type PostCardProps = {
    postId: string
}

export const PostCard = ({postId}: PostCardProps) => {
    const postsSelector = useSelector(state => state.post)
    const [modalVisible, setModalVisible] = useState(false)

    console.log(`Modal visible ${modalVisible}`)
    const post = postsSelector.posts[postId]
    return (
        <div>
            <Card 
                key={uuidv4()}
                hoverable={true}
                onClick={() => {
                    setModalVisible(true)
                    //setAnnotationCardDetailViewId(post.id)
                }}
                //title={<EditableTagGroup />}
                style={{ marginBottom: '7px' }}
                bordered={false}
            >
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden', margin: '-10px' }}>
                    <PostImage postId={postId} />
                    
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
                title={"Discuss"}
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