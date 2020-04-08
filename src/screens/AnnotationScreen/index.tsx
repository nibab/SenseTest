import React, { useState, useRef, useEffect, forwardRef } from "react"
import { PostsClient } from '../../clients/PostsClient'
import { Post } from "../../types";
import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "../../graphql/queries"
import { ListPostsQuery, ModelPostFilterInput, CreatePostInput } from "../../API";
import { useSelector as useReduxSelector, useDispatch } from "react-redux";
import { addPost } from '../../store/post/actions'
import { PostImgDownload } from "../../utils/PostImgDownload";
import { PostsGrid } from "./PostsGrid";
import { AppetizeScreen } from './AppetizeScreen'
import Log from "../../utils/Log";
import { Loading } from "aws-amplify-react";
import { useSelector } from "../../store"
import { AnnotationCanvas } from "../../components/AnnotationCanvas";
import { v4 as uuidv4 } from "uuid"
import { DataLayerClient } from "../../clients/DataLayerClient";
import { Input, Form, Modal, Button } from 'antd';
import TextArea from "antd/lib/input/TextArea";



export const AnnotationScreen = ({ }) => {
    // Posts
    const [getPostsFetchInProgress, setGetPostsFetchInProgress] = useState(false)
    const postsSelector = useSelector(state => state.post)
    const [currentPost, setCurrentPost] = useState<Post>()
    const [displayCreateNewPost, setDisplayCreateNewPost] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getPostsGraphQl = async (projectId: string) => {
        const query: ModelPostFilterInput = {
            projectId: {
                eq: projectId
            }
        }
        try {
            setGetPostsFetchInProgress(true)
            const response = await API.graphql(graphqlOperation(listPosts, {filter: query})) as { data: ListPostsQuery }
            setGetPostsFetchInProgress(false)
            if (response.data.listPosts !== null) {
                const posts = response.data.listPosts.items
                posts?.forEach(async (post) => {
                    if (post !== null) {
                        const postImgDownload = new PostImgDownload(post, (blob) => {})
                        const newPost = await postImgDownload.imagePromise
                        // We want to make sure that after a post image is fully downloaded, it's updated in the redux store.
                        // const newPost: Post = {
                        //     id: post?.id,    
                        //     image: ,
                        //     projectId: projectId,
                        //     text: post.text
                        // }
                        dispatch(addPost(newPost))
                    }
                })
            }            
        } catch {
            setGetPostsFetchInProgress(false)
            Log.error("There was an issue getting all posts.", "AnnotationScreen")
        }
    }

    useEffect(() => {
        getPostsGraphQl('1')
    }, [])

    const renderPostIcon = (post: Post) => {
        const className = `${currentPost !== undefined && post.id === currentPost.id ? 'shadow-outline' : 'hover:shadow-outline'} h-full w-full object-contain flex relative`
        return (
            <div onClick={() => {setDisplayCreateNewPost(false); setCurrentPost(post)}} className={className}>	
                <div className='h-full w-full absolute z-0'>
                    <img className="h-full w-full object-contain" src='iphonexBlack.png'></img>
                </div>
                <div className='w-full mx-auto my-auto overflow-hidden z-10' style={{width: '83.5%', borderRadius: '0.7rem'}}>
                    <img className='h-full w-full mx-auto object-contain' src={window.URL.createObjectURL(post.image)}></img>
                </div>
                
            </div>
        )
    }

    const createNewPostIcon = () => {
        const className = 'hover:shadow-outline h-full w-full object-contain flex relative'
        return (
            <div onClick={() => {setDisplayCreateNewPost(true); setCurrentPost(undefined)}} className={className}>	
                <div className='h-full w-full mx-auto' style={{width: '77.7%'}}>
                    <img className='h-full w-full mx-auto object-contain' src='iPhoneXWireframe.png'></img>
                </div>
                <div className='h-full w-full absolute '>
                    <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                </div>
            </div>
        )
    }

    const renderPostsInSelectorWindow = () => {
        let items: JSX.Element[] = []

        // Add the create new post icon
        items.push(<div className='h-56 flex '>
            {createNewPostIcon()}
        </div>)

        for (let post in postsSelector.posts) {
            items.push(
                <div className='h-56 flex '>
                    { renderPostIcon(postsSelector.posts[post]) }
                </div>
            )
        }

        let posts: JSX.Element[] = []
        const itemsQueue = items.reverse()
        while (itemsQueue.length !== 0) {
            const item1 = items.pop()
            const item2 = items.pop()
            if (item1 !== undefined && item2 !== undefined) {
                posts.push(
                    <div className="grid grid-cols-2 gap-3 pb-2">	
                        {item1}
                        {item2}
                    </div>
                )
            }
            // if the number of posts is odd make sure the last row only contains one item
            if (item2 === undefined) {
                posts.push(
                    <div className="grid grid-cols-2 gap-3 pb-2">	
                        {item1}
                    </div>
                )
            }
            // if both item1 and item2 are undefined, it means that the itemsQueue was empty at the start of the function
            // which is impossible
        }

        return posts
    }

    const renderPostDetailView = () => {
        if (!displayCreateNewPost) {
            if (currentPost) {
                return (<PostView post={currentPost} />) 
            }
        } else {
            return (<CreatePostView />)
        }
        
    }

    return getPostsFetchInProgress ? <Loading /> : (
        <>
        <div className="flex flex-row h-full bg-gray-200">
            <div className='flex-shrink-0 w-72 bg-gray-400 ml-4 mt-3 mb-3 shadow-inner rounded-lg' >
                <div className='flex flex-col p-3 h-full overflow-scroll'>
                    { renderPostsInSelectorWindow() }
                    {/* <div className="grid grid-cols-2 gap-3 pb-2">	 
                        <div className='h-56 flex hover:shadow-outline'>
                            { renderPostIcon() }
                        </div>
                        <div className='h-56 flex hover:shadow-outline'>
                            { renderPostIcon() }
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pb-2">	 
                        <div className='h-56 flex hover:shadow-outline'>
                            { renderPostIcon() }
                        </div>
                        <div className='h-56 flex hover:shadow-outline'>
                            { renderPostIcon() }
                        </div>
                    </div> */}
                </div>
            </div>
            {/* <div className='h-full w-1 bg-gray-300'></div> */}
            { renderPostDetailView() }
            </div>
        </>
        // <div>
        //     <h4>Annotation </h4>
        //     <div style={{ display: 'flex', width: '100%' }}>
        //         <AppetizeScreen />
        //         <PostsGrid />
        //     </div>
        // </div>
    )
}

const CreatePostView = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const textAreaRef= useRef<TextArea>(null)
    const titleRef= useRef<Input>(null)
    const [imageToAnnotate, setImageToAnnotate] = useState<string>('newsScreenshot.png')
    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener("message", receiveMessage, false);
    })

    const receiveMessage = (event: any) => {
        console.log('blea')
        if(event.data && event.data.type == 'screenshot'){
            console.log(event.data);
            setImageToAnnotate(event.data.data)
            console.log("BLEA screenshot")
            //document.getElementById("screenshot").src = event.data.data;
        }
    }

    const iFrameLoaded = () => {
        //iframeRef.current?.contentWindow?.postMessage('requestSession', '*');
    }

    const onScreenshotButtonClick = (event: any) => {        
        iframeRef.current?.contentWindow?.postMessage('getScreenshot', '*')
    }

    const onUploadButtonClick = async (event: any) => {
        // Take the canvas ref and then upload it with some text
        const blob = await getBlobFromCanvas()
        var text = textAreaRef.current === null ? "" : textAreaRef.current.state.value
        var title = titleRef.current === null ? "" : titleRef.current.state.value
                            
        // Validate that there is text.
        if (text === "" || text === undefined) {
            text = 'No title'
        }

        // Validate that there is a title.
        if (title === "" || title === undefined) {
            title = 'No text'
        }

        const createPostInput: CreatePostInput = {
            id: uuidv4(),
            imageId: uuidv4(),
            projectId: '1',
            text: text,
            title: title
        }
        const newPost = await DataLayerClient.createNewAnnotationPost(blob, createPostInput)
        dispatch(addPost(newPost))
        //setCreateAnnotationModalHidden(true)
        //setImageToAnnotate("")
    }

    const renderAppetizeScreen = () => {
        return (
            <div className='flex-shrink-0 h-full ml-3 mt-3 mb-3 w-64 flex-col bg-green-600 relative' style={{height: '583px', width: '282px'}}>
                <button className='bg-blue-600 absolute w-24 h-10 right-0' onClick={(event) => onScreenshotButtonClick(event)}> Take Screenshot </button> 
                <iframe onLoad={() => iFrameLoaded()} ref={iframeRef} src="https://appetize.io/embed/fczxctdk32wb17vabzd3k2wq9w?device=iphonex&scale=69&autoplay=false&orientation=portrait&deviceColor=black&xdocMsg=true" width="100%" height="100%" frameBorder="0" scrolling="no"></iframe>
                {/* <div className='h-full w-full object-contain flex relative'>	
                    <div className='h-full w-full mx-auto' style={{width: '86%'}}>
                        <img className='h-full w-full mx-auto object-contain' src={'iPhoneXWireframe.png'}></img>
                    </div>
                    <div className='h-full w-full absolute '>
                        <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                    </div>
                </div>							 */}
            </div>
        )
    }

    const getBase64ImageOfCanvas = (): string | null => {
        if (!canvasRef.current) {
            return null
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            var dataURL = canvas.toDataURL("image/png");
            return dataURL
        } else {
            return null
        }
    }

    const getBlobFromCanvas = (): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const currentCanvas = canvasRef.current
            if (currentCanvas !== undefined && currentCanvas !== null) {
                const context = currentCanvas.getContext('2d');
                if (context) {
                    currentCanvas.toBlob((blob) => {
                        if (blob !== null) {
                            resolve(blob)
                        }
                        reject()
                    }, "image/png");                    
                } else {
                    reject()
                }
            } else {
                reject()
            }
        })
    }

    const renderForm = () => (
        <Form layout='vertical'>
            <Form.Item
                label="Title"
                validateStatus="success"
                //help="Cannot be empty."
            >
                <Input ref={titleRef} placeholder="New Issue When Loading" id="error" />
            </Form.Item>

            <Form.Item
                label="Description"
                hasFeedback
                //help="The information is being validated..."
            >
                <Input.TextArea ref={textAreaRef} autoSize={{ minRows: 4, maxRows: 6 }} placeholder="Description" id="validating" />
            </Form.Item>
        </Form>
    )

    return (
        <div className='h-full flex-auto flex flex-row'>
            { renderAppetizeScreen() }
            {/* <DeviceScreenshot src={'testScreenshot.jpg'}/> */}
            
            { imageToAnnotate !== undefined ? 
                <>
                    <div className='flex-shrink-0 bg-gray-100 rounded-full shadow-lg h-64 ml-3 mt-3 w-16 flex-col'>
                        <div className='w-full'>
                            <button className="w-8 h-8 bg-red-500 mx-auto my-8" onClick={(event) => onScreenshotButtonClick(event)}>S</button>
                        </div>
                        <div className='w-full'>
                            <button className="w-8 h-8 bg-red-500 mx-auto my-8" onClick={(event) => onUploadButtonClick(event)}>U</button>
                        </div>
                    </div>
                    <AnnotationScreenshot src={imageToAnnotate} ref={canvasRef}/> 
                    <div className='flex-shrink-0 bg-gray-100 shadow-lg rounded-lg h-64 ml-3 mt-3 p-3 w-64 flex-col'>
                        { renderForm() }
                    </div>
                    
                </>
                
                : <></>}            
        </div>
    )
}

type PostViewProps = {
    post: Post
}

const PostView = ({ post }: PostViewProps) => {
    useEffect(() => {

    }, [post])

    const renderPostText = (title: string, text: string, dateCreated: string) => {
        return (
            <div className='bg-white h-auto shadow-xl mt-3 rounded-lg p-3 w-96'>
                <h2 className='text-base font-bold'>{title}</h2>
                <div className='-mt-1 text-xs uppercase text-gray-500 font-semibold '>
                    { dateCreated }
                </div>
                <p className='mt-1 text-xs leading-tight'>
                    { text }
                </p>
            </div>
        )
    }

    const renderComments = () => {
        return (
            <div className='bg-gray-100 hidden flex flex-col p-3 shadow-xl mt-3 rounded-lg h-auto overflow-y-scroll mb-3'>
                <div className='flex-shrink-0 bg-gray-200 w-auto h-12 rounded-lg'></div>
                <div className='flex-shrink-0 bg-gray-200 w-auto mt-1 h-48 rounded-lg'></div> 
                <div className='flex-shrink-0 bg-gray-200 w-auto mt-1 rounded-lg'>
                    asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds
                    asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds

                    asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds

                </div> 
                <div className='flex-shrink-0 bg-gray-200 w-auto mt-1 h-32 rounded-lg'></div>  
                <div className='flex-shrink-0 bg-gray-200 w-auto mt-1 h-32 rounded-lg'></div> 
            </div>
        )
    }

    const renderPostView = () => {
        return (
            <div className='h-full flex-auto flex flex-row'>
                <div className='hidden flex-shrink-0 bg-gray-100 rounded-full shadow-lg h-64 ml-3 mt-3 w-16'></div>
                <DeviceScreenshot src={window.URL.createObjectURL(post.image)}/>
                <div className='flex-auto h-full flex flex-col ml-3 mr-3'> 
                    { renderPostText(post.title, post.text, "21/02/2020 10:30PM EST") }
                    { renderComments() }
                </div>  
            </div>
        )
    }

    return (
        <>
            { renderPostView() }
        </>
    )
}

type ScreenshotProps = {
    src: string
}

const DeviceScreenshot = ({ src }: ScreenshotProps) => {
    return (
        <div className='bg-green-400 flex-shrink-0 h-full ml-3 mt-3 mb-3 w-64 flex-col' style={{height: '583px', width: '281px'}}> 
            <div className='h-full w-full object-contain flex relative'>
                <div className='h-full w-full absolute z-0'>
                    <img className="h-full w-full object-contain" src='iphonexBlack.png'></img>
                </div>	
                <div className=' mx-auto my-auto z-10 overflow-hidden' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
                    <img className='h-full w-full mx-auto object-contain' src={src}></img>
                </div>
                
            </div>							
        </div>
    )
}

const AnnotationScreenshot = forwardRef<HTMLCanvasElement, ScreenshotProps>((props, canvasRef) => {
    return (
        <div className='flex-shrink-0 h-full ml-3 mt-3 mr-3 mb-3' style={{height: '583px', width: '282px'}}>
            <div className='h-full w-full object-contain flex relative'>
                <div className='h-full w-full absolute z-0'>
                    <img className="h-full w-full object-contain" src='iphonexBlack.png'></img>
                </div>	
                <div className=' mx-auto my-auto z-10 overflow-hidden' style={{width: '92.1%', height: '96.5%', borderRadius: '2.2rem'}}>
                    <AnnotationCanvas
                        ref={canvasRef}
                        visible={props.src !== undefined}
                        backgroundImage={props.src !== undefined ? props.src : ""}
                        onPublishButtonClick={async (blobPromise, text, title) => {
                            
                        }}
                        onCancel={() => {
                            console.log('blea cancel')
                            //setCreateAnnotationModalHidden(true)
                        }}
                    />
                </div>
            </div>
        </div>
    )
})

// const textAreaRef= useRef<TextArea>(null)
//     const titleRef= useRef<Input>(null)
type ParentRef = {
    titleRef: HTMLInputElement
    textAreaRef: HTMLTextAreaElement
}

const AnnotationForm = forwardRef<any, {}>((props, ref) => {
    const textAreaRef= useRef<TextArea>(null)
    const titleRef= useRef<Input>(null)

    return (<>
        <Form layout='vertical'>
            <Form.Item
                label="Title"
                validateStatus="success"
                //help="Cannot be empty."
            >
                <Input ref={titleRef} placeholder="New Issue When Loading" id="error" />
            </Form.Item>

            <Form.Item
                label="Description"
                hasFeedback
                //help="The information is being validated..."
            >
                <Input.TextArea ref={textAreaRef} autoSize={{ minRows: 4, maxRows: 6 }} placeholder="Description" id="validating" />
            </Form.Item>
        </Form>
        <Button style={{marginTop: '5px', float: 'right'}} onClick={async () => {
            // const canvasImage = getBase64ImageOfCanvas()
            // if (canvasImage === null) {
            //     return
            // }
            const text = textAreaRef.current === null ? "" : textAreaRef.current.state.value
            const title = titleRef.current === null ? "" : titleRef.current.state.value
            Log.info(`AnnotationCanvas title: ${title} text: ${text}`, 'AnnotationCanvas')
            //onPublishButtonClick(getBlobFromCanvas(), text, title)
        }}>Publish</Button>
    </>)
})

export default AnnotationScreen;





