import React, { useState, useRef, useEffect } from "react"
import { PostImgDownload } from "../../utils/PostImgDownload"
import { Progress } from "antd"
import { useSelector } from "../../store"
import { Post } from "../../types"
import { useDispatch } from "react-redux"
import { addPost } from "../../store/post/actions"

function useImgDownloadPost(imgDownload: PostImgDownload) {
    const [post, setPost] = useState<Post | null>(null)
  
    useEffect(() => {
        imgDownload.imagePromise.then((post) => {
            //useDispatch()(addPost(post))
            setPost(post)
        })
    })
  
    return post
}

type PostImageProps = {
    postId: string
}

export const PostImage = ({postId}: PostImageProps) => {
    const [post, setPost] = useState<Post>(useSelector(state => state.post).posts[postId])
    
    const [image, setImage] = useState<Blob | null>(null)
    const [progress, setProgress] = useState(0)
    const [downloadDone, setDownloadDone] = useState<boolean>(false)

    //const postToRender = useImgDownloadPost(post.image)

    if (isPostImgDownload(post.image)) {
        post.image.imagePromise.then((post) => {
            setPost(post)
        })
        post.image.callback = async (progress) => {
            setProgress(progress)
        }
    }

    // Render progress up until the image is fully downloaded, after which show the downloaded image.
    const renderProgess = () => {
        if (downloadDone === false) {
            return (
                <Progress percent={progress * 100} />
            )
        } else {
            return (
                <img
                    alt="logo"
                    src={window.URL.createObjectURL(post.image)}
                    style={{ flex: 0.4, height: '272px', width: 'auto', objectFit: 'contain' }}
                />
            )
        }        
    }

    const renderImage = () => {
        return (
            <img
                alt="logo"
                src={window.URL.createObjectURL(post.image)}
                style={{ flex: 0.4, height: '272px', width: 'auto', objectFit: 'contain' }}
            />
        )
    }

    return (
        <div>   
            { isPostImgDownload(post.image) ? renderProgess() : renderImage()}
        </div>
    )
}

function isPostImgDownload(object: any): object is PostImgDownload {
  return object.id !== undefined && object.completed !== undefined && object.imagePromise !== undefined
}