import React, { useState, useRef, useEffect } from "react"
import { ImgDownloadInProgress } from "../../utils/ImgDownloadInProgress"
import { Progress } from "antd"

type PostImageProps = {
    postImage: Blob | ImgDownloadInProgress
}

export const PostImage = ({postImage}: PostImageProps) => {
    const [image, setImage] = useState<Blob | null>(null)
    const [progress, setProgress] = useState(0)
    const [downloadDone, setDownloadDone] = useState<Blob | null>(null)

    useEffect(() => {
        if (isImgDownloadInProgress(postImage)) {
            postImage.imagePromise.then((img) => {
                setImage(img)
            })
            if (postImage.image !== undefined) {
                setImage(postImage.image)
            } else {
                postImage.callback = async (progress) => {
                    setProgress(progress)
                }
            }
        } else {
            setImage(postImage)
        }
    },[])

    // Render progress up until the image is fully downloaded, after which show the downloaded image.
    const renderProgess = () => {
        if (downloadDone === null) {
            return (
                <Progress percent={progress * 100} />
            )
        } else {
            return (
                <img
                    alt="logo"
                    src={window.URL.createObjectURL(image)}
                    style={{ flex: 0.4, height: '272px', width: 'auto', objectFit: 'contain' }}
                />
            )
        }        
    }

    const renderImage = () => {
        return (
            <img
                alt="logo"
                src={window.URL.createObjectURL(image)}
                style={{ flex: 0.4, height: '272px', width: 'auto', objectFit: 'contain' }}
            />
        )
    }

    return (
        <div>   
            { image === null ? renderProgess() : renderImage()}
        </div>
    )
}

function isImgDownloadInProgress(object: any): object is ImgDownloadInProgress{
  return object.imagePromise !== undefined && object.completed !== undefined
}