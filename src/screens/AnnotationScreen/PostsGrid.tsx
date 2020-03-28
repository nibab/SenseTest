import React, { useState } from "react"
import { useSelector } from "../../store"
import { Row, Col, Modal } from 'antd';
import { v4 as uuidv4 } from "uuid"
import { PostCard } from "./PostCard";
import { PostDiscussion } from "./PostDiscussion";
import { Post } from "../../types";

export const PostsGrid = () => {
    const postsSelector = useSelector(state => state.post)
    const [modalVisible, setModalVisible] = useState(false)
    const [postDiscussionToDisplay, setPostDiscussionToDisplay] = useState<Post>()

	const posts = Object.keys(postsSelector.posts)
	// Introducing a constraint of maximum 6 cards per page. The rest of the cards will be displayed on the other pages.
	if (posts.length === 0) {
		return (<div></div>)
	}
	var nrOfRows = Math.ceil(posts.length / 2)
	if (nrOfRows > 3) {
		// Create multiple pages
		nrOfRows = 3
	} 
	const items = []
	for (let i = 0; i < nrOfRows; i++) {
        if (posts.length - (i + 1) * 2 < 0) {
            const postId = posts[i * 2]
            items.push(
                <Row key={uuidv4()} gutter={8}>
                    <Col span={12}>
                        <PostCard postId={postId} onClick={() => {
                            setPostDiscussionToDisplay(postsSelector.posts[postId])
                            setModalVisible(true)
                        }} />
                    </Col>
                </Row>
            )
        } else {
            const postId = posts[i * 2]
            const postId2 = posts[i * 2 + 1]
            items.push(
                <Row key={uuidv4()} gutter={8} style={{ marginBottom: 8 }}>
                    <Col span={6}>
                        <PostCard postId={postId} onClick={() => {
                            setPostDiscussionToDisplay(postsSelector.posts[postId])
                            setModalVisible(true)
                        }} />
                    </Col>
                    <Col span={6}>
                        <PostCard postId={postId} onClick={() => {
                            setPostDiscussionToDisplay(postsSelector.posts[postId])
                            setModalVisible(true)
                        }} />
                    </Col>
                    <Col span={6}>
                        <PostCard postId={postId} onClick={() => {
                            setPostDiscussionToDisplay(postsSelector.posts[postId])
                            setModalVisible(true)
                        }} />
                    </Col>
                    <Col span={6}>
                        <PostCard postId={postId2} onClick={() => {
                            setPostDiscussionToDisplay(postsSelector.posts[postId2])
                            setModalVisible(true)
                        }} />
                    </Col>
                </Row>
            )
        }
    }
    
    const renderPostDiscussioModal = () => {
        if (postDiscussionToDisplay !== undefined) {
            return (
                <Modal
                    // Make sure that there is an annotationCardDetailViewId to display, because once the modal
                    // becomes visible, it needs an Annotation (and id) to display.
                    visible={modalVisible}
                    centered={true}
                    footer={null}
                    title={"Discuss"}
                    onCancel={() => {
                        setModalVisible(false)
                    }}
                >
                    <PostDiscussion 
                        post={postDiscussionToDisplay}
                        width={250}
                        height={544}
                    />
                </Modal>
            )
        }
    }

	return (
		<div style={{ marginLeft: '20px', flex: '1' }}>
            {items}
            {renderPostDiscussioModal()}
		</div>
	)
}