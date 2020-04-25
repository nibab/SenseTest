import React, { useState, useRef, useEffect } from "react"
import { PostImgDownload } from "../../utils/PostImgDownload"
import { Progress } from "antd"
import { useSelector } from "../../store"
import { Post } from "../../types"
import { useDispatch } from "react-redux"
import { addPost } from "../../store/post/actions"
import { StyleSheet } from "../../GlobalTypes"

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
    postId: string,
    height: number,
    width: number
}

export const PostImage = ({postId, height, width}: PostImageProps) => {
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
                <div>
                    {/* <Progress percent={progress * 100} style={{ position: 'absolute'}}/> */}
                    <img src={'downloadInProgress.png'} style={styles.img} />
                </div>
            )
        } else {
            return (
                <img src={window.URL.createObjectURL(post.image)} style={styles.img}/>
            )
        }        
    }

    const renderImage = () => {
        return (
            <img src={window.URL.createObjectURL(post.image)} style={styles.img}/>
        )
    }

    return (
        <div>   
            { isPostImgDownload(post.image) ? renderProgess() : renderImage()}
        </div>
    )
}

function isPostImgDownload(object: any): object is PostImgDownload {
  return object.completed !== undefined && object.imagePromise !== undefined
}

const styles: StyleSheet = {
    img: {
        objectFit: 'contain',
        maxWidth: '100%',
        height: 'auto'
    }
}