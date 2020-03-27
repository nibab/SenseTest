import React from "react"
import { useSelector } from "../../store"
import { Row, Col } from 'antd';
import { v4 as uuidv4 } from "uuid"
import { PostCard } from "./PostCard";

export const PostsGrid = () => {
	const postsSelector = useSelector(state => state.post)

	const posts = postsSelector.posts
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