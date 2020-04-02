import React, { useState, useRef, useEffect } from "react"
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

export const AnnotationScreen = ({ }) => {
    // Posts
    const [getPostsFetchInProgress, setGetPostsFetchInProgress] = useState(false)
    const dispatch = useDispatch()
    const postsSelector = useSelector(state => state.post)
    const [currentPost, setCurrentPost] = useState<Post>()

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
            <div onClick={() => setCurrentPost(post)} className={className}>	
                <div className='h-full w-full mx-auto' style={{width: '77.7%'}}>
                    <img className='h-full w-full mx-auto object-contain' src={window.URL.createObjectURL(post.image)}></img>
                </div>
                <div className='h-full w-full absolute '>
                    <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                </div>
            </div>
        )
    }

    const renderPostsInSelectorWindow = () => {
        let items: JSX.Element[] = []
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
            { currentPost ? <PostView post={currentPost} /> : <></>}
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

type PostViewProps = {
    post: Post
}

const PostView = ({ post }: PostViewProps) => {
    useEffect(() => {

    }, [post])

    const renderDevice = () => {
        return (
            <div className='flex-shrink-0 h-full ml-3 mt-3 mb-3 w-64 flex-col' style={{height: '600px', width: '305px'}}> 
                <div className='h-full w-full object-contain flex relative'>	
                    <div className='h-full w-full mx-auto' style={{width: '86%'}}>
                        <img className='h-full w-full mx-auto object-contain' src={window.URL.createObjectURL(post.image)}></img>
                    </div>
                    <div className='h-full w-full absolute '>
                        <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                    </div>
                </div>							
            </div>
        )
    }

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
                { renderDevice() }
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

export default AnnotationScreen;





