import React, { useState, useRef, useEffect } from "react"
import { Post } from "../../types"
import { v4 as uuidv4 } from "uuid"
import { Card, Modal } from "antd"
import { PostImage } from "./PostImage"
import { PostDiscussion } from "./PostDiscussion"
import { Typography } from 'antd'
import { useSelector } from "../../store"
import Meta from "antd/lib/card/Meta"

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
                cover={<PostImage postId={postId} height={100} width={150}/>}
                bordered={true}
                style={{ maxWidth: '150px', height: '400px'}}
            >
                <Meta title={"TestTitle"}></Meta>
                {/* <div style={{ flex: 1, display: 'flex', overflow: 'hidden', margin: '-10px' }}>                    
                    <div style={{ flex: 0.6, marginLeft: '10px' }}>
                        <Title level={4}>{post.title}</Title>
                        {post.text}
                    </div>
                </div> */}
                <div className="px-6 py-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Software Engineer</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Writter</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2 ml-20">#Public Speaker</span>
                </div>
            </Card>
        </div>
    )
}