import React, { useState, useRef, useEffect } from "react"
import { Post } from "../../types"
import { v4 as uuidv4 } from "uuid"
import { Card, Modal } from "antd"
import { PostImage } from "./PostImage"
import { PostDiscussion } from "./PostDiscussion"
import { Typography } from 'antd'
import { useSelector } from "../../store"
import Meta from "antd/lib/card/Meta"
import '../../styles/main.css'

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
            {/* <Card 
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
                <div className="px-6 py-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Software Engineer</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Writter</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Public Speaker</span>
                </div>
            </Card> */}
            <div className='flex-row pt-3 bg-gray-100 rounded-lg hover:shadow-2xl cursor-pointer' style={{width: '250px'}} onClick={() => onClick()}>
                <div className="p-1 rounded-lg container mx-auto" style={{height: '300px', width: '144px', backgroundSize: 'contain', backgroundImage: 'url("iPhoneXWireframe.png")'}}>
                    <img className='hover rounded shadow-xl h-full mx-auto' src={window.URL.createObjectURL(post.image)} />					
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg -mt-24 relative mx-auto" style={{height: '150px', width: '250px'}}>
                    <h2 className='text-base font-bold truncate'>How do we handle a big title like this or even this</h2>
                    <div className='-mt-1 text-xs uppercase text-gray-500 font-semibold '>
                        21/02/2020 10:30PM EST
                    </div>
                    <p className='mt-1 text-xs leading-tight'>
                        The screen has the wrong alignment on image x. It is the first time we have this.
                    </p>
                </div>
            </div>
        </div>
    )
}