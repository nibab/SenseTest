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
    onClick: () => void
}

export const PostCard = ({postId, onClick}: PostCardProps) => {
    const postsSelector = useSelector(state => state.post)

    const post = postsSelector.posts[postId]
    return (
        <div>
            <Card 
                key={uuidv4()}
                hoverable={true}
                onClick={() => {
                    onClick()
                }}
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
        </div>
    )
}