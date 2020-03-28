import React, { useState } from "react"
import { useSelector } from "../../store"
import { Row, Col, Modal } from 'antd';
import { v4 as uuidv4 } from "uuid"
import { PostCard } from "./PostCard";
import { PostDiscussion } from "./PostDiscussion";
import { Post } from "../../types";
import Log from "../../utils/Log";

const POSTS_PER_ROW = 4
const TOTAL_ROWS = 3

export const PostsGrid = () => {
    const postsSelector = useSelector(state => state.post)
    const [modalVisible, setModalVisible] = useState(false)
    const [postDiscussionToDisplay, setPostDiscussionToDisplay] = useState<Post>()

	const posts = Object.keys(postsSelector.posts)
	// Introducing a constraint of maximum 6 cards per page. The rest of the cards will be displayed on the other pages.
	if (posts.length === 0) {
		return (<div></div>)
    }
    
    Log.info(`Total posts downloaded ${posts.length}.`, "PostsGrid")

	var nrOfRows = Math.ceil(posts.length / POSTS_PER_ROW)
	if (nrOfRows > TOTAL_ROWS) {
		// Create multiple pages
		nrOfRows = TOTAL_ROWS
	} 
    
    Log.info(`Total rows ${nrOfRows}.`, "PostsGrid")
    
    const row1Ids = posts.slice(0, POSTS_PER_ROW)
    const row2Ids = posts.slice(POSTS_PER_ROW, POSTS_PER_ROW * 2)
    const row3Ids = posts.slice(POSTS_PER_ROW * 2, POSTS_PER_ROW * 3)

    const row1Items = []
    for (let i = 0; i < row1Ids.length; i++) {
        const postId = row1Ids[i]
        row1Items.push(
            <Col span={6}>
                <PostCard postId={postId} onClick={() => {
                    setPostDiscussionToDisplay(postsSelector.posts[postId])
                    setModalVisible(true)
                }} />
            </Col>
        )
    }

    const row2Items = []
    for (let i = 0; i < row2Ids.length; i++) {
        const postId = row2Ids[i]
        row2Items.push(
            <Col span={6}>
                <PostCard postId={postId} onClick={() => {
                    setPostDiscussionToDisplay(postsSelector.posts[postId])
                    setModalVisible(true)
                }} />
            </Col>
        )
    }

    const row3Items = []
    for (let i = 0; i < row3Ids.length; i++) {
        const postId = row3Ids[i]
        row3Items.push(
            <Col span={6}>
                <PostCard postId={postId} onClick={() => {
                    setPostDiscussionToDisplay(postsSelector.posts[postId])
                    setModalVisible(true)
                }} />
            </Col>
        )
    }

    const items = []
    const allRows = [row1Items, row2Items, row3Items]
    for (let i = 0; i < allRows.length; i++) {
        items.push(
            <Row gutter={8} style={{paddingTop: '8px'}}>
                {allRows[i]}
            </Row>
        )
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