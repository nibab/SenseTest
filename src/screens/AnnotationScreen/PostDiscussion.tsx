import React, { useState, useRef, useEffect } from "react"
import TextArea from "antd/lib/input/TextArea";
import { Post } from "../../types";
import { PostImage } from "./PostImage";
import { Button } from "antd";

type PostDiscussionProps = {
  post: Post
  height: number
  width: number
}

export const PostDiscussion = ({post, width, height}: PostDiscussionProps) => {    
  const textAreaRef= useRef<TextArea>(null);

  return (
      <div style={{ display: 'flex'}}> 
          <div style={{ flex: 0.5 }}>
              <PostImage postId={post.id} height={300} width={200}/>
              {/* <img src={window.URL.createObjectURL(post.image)} height={height} width={width} /> */}
          </div>
          <div style={{ flex: 0.5 }}>
              <TextArea ref={textAreaRef} rows={4} />
              <Button style={{marginTop: '5px', float: 'right'}} onClick={() => {
                  const text = textAreaRef.current === null ? "" : textAreaRef.current.state.value
                  // TODO: Make sure that comment is published.
                  console.log()
              }}>Publish</Button>
          </div>
      </div>
  )
}