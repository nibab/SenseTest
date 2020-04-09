import React, { useState, useEffect } from "react"
import { Post } from "../../types"
import { Loading } from "aws-amplify-react"
import { useSelector } from "../../store"
import { DataLayerClient } from "../../clients/DataLayerClient"
import { useDispatch } from "react-redux"
import PostView from "./PostView"
import CreatePostView from "./CreatePostView"
import { ModelPostFilterInput, ListPostsQuery } from "../../API"
import { graphqlOperation, API } from "aws-amplify"
import { listPosts } from "../../graphql/queries"
import { PostImgDownload } from "../../utils/PostImgDownload"
import { addPost } from "../../store/post/actions"
import Log from "../../utils/Log"

export const AnnotationScreen = ({ }) => {
    // Posts
    const [getPostsFetchInProgress, setGetPostsFetchInProgress] = useState(false)
    const postsSelector = useSelector(state => state.post)
    const [currentPost, setCurrentPost] = useState<Post>()
    const [displayCreateNewPost, setDisplayCreateNewPost] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getPostsAndStoreInRedux = async (projectId: string) => {
        const query: ModelPostFilterInput = {
            projectId: {
                eq: projectId
            }
        }
        try {
            const response = await API.graphql(graphqlOperation(listPosts, {filter: query})) as { data: ListPostsQuery }
            if (response.data.listPosts !== null) {
                const posts = response.data.listPosts.items
                posts?.forEach(async (post) => {
                    if (post !== null) {
                        const postImgDownload = new PostImgDownload(post, (blob) => {})
                        const newPost = await postImgDownload.imagePromise
                        dispatch(addPost(newPost))
                    }
                })
            }            
        } catch {
            Log.error("There was an issue getting all posts.", "AnnotationScreen")
        }
    }

    useEffect(() => {
        getPostsAndStoreInRedux('1')
    }, [])

    const renderPostIcon = (post: Post) => {
        const className = `${currentPost !== undefined && post.id === currentPost.id ? 'shadow-outline' : 'hover:shadow-outline'} h-full w-full object-contain flex relative`
        return (
            <div onClick={() => {setDisplayCreateNewPost(false); setCurrentPost(post)}} className={className}>	
                <div className='h-full w-full absolute z-0'>
                    <img className="h-full w-full object-contain" src='iphonexBlack.png'></img>
                </div>
                <div className='w-full mx-auto my-auto overflow-hidden z-10' style={{width: '85.8%', borderRadius: '0.7rem'}}>
                    <img className='h-full w-full mx-auto object-contain' src={window.URL.createObjectURL(post.image)}></img>
                </div>
                
            </div>
        )
    }

    const createNewPostIcon = () => {
        const className = `hover:shadow-outline' h-full w-full object-contain flex relative`
        return (
            <div onClick={() => {setDisplayCreateNewPost(true); setCurrentPost(undefined)}} className={className}>	
                <div className='h-full w-full absolute z-0'>
                    <img className="h-full w-full object-contain" src='iphonexBlack.png'></img>
                </div>
                <div className='w-full mx-auto my-auto overflow-hidden z-10' style={{width: '85.8%', borderRadius: '0.7rem'}}>
                    <img className='h-full w-full mx-auto object-contain' src={'logo192.png'}></img>
                </div>
                
            </div>
        )

    }

    const renderPostsInSelectorWindow = () => {
        let items: JSX.Element[] = []

        // Add the create new post icon
        items.push(
            <div className='h-full w-full flex max-w-xs p-2 ml-2 my-auto' style={{maxWidth: '130px', minWidth: '130px', height: '90%'}}>
                {createNewPostIcon()}
            </div>
        )

        for (let post in postsSelector.posts) {
            items.push(
                <div className='h-full w-full flex max-w-xs p-2 ml-2 my-auto' style={{maxWidth: '130px', minWidth: '130px', height: '235px'}}>
                    { renderPostIcon(postsSelector.posts[post]) }
                </div>
            )
        }

        let posts: JSX.Element[] = []
        const itemsQueue = items.reverse()
        // while (itemsQueue.length !== 0) {
        //     const item1 = items.pop()
        //     const item2 = items.pop()
        //     if (item1 !== undefined && item2 !== undefined) {
        //         posts.push(
        //             <div className="grid grid-cols-2 gap-3 pb-2">	
        //                 {item1}
        //                 {item2}
        //             </div>
        //         )
        //     }
        //     // if the number of posts is odd make sure the last row only contains one item
        //     if (item2 === undefined) {
        //         posts.push(
        //             <div className="grid grid-cols-2 gap-3 pb-2">	
        //                 {item1}
        //             </div>
        //         )
        //     }
        //     // if both item1 and item2 are undefined, it means that the itemsQueue was empty at the start of the function
        //     // which is impossible
        // }

        return items
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

    const [isShown, setIsShown] = useState(false)

    const renderSelector = () => {
        
        return (
            <div onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} className='flex-shrink-0 bg-gray-600 w-screen h-10 hover:h-72 bottom-0 absolute p-3 z-30' >
                <div className={`${!isShown ? 'hidden' : ''} bg-gray-500 shadow-inner rounded-lg flex w-full h-full flex-row overflow-scroll`}>
                    { isShown ? renderPostsInSelectorWindow() : <></>}
                </div>
            </div>
        )
    }

    return getPostsFetchInProgress ? <Loading /> : (
        <>
        <div className="flex flex-row h-full bg-gray-200 relative">  
            { renderPostDetailView() }
        </div>
        { renderSelector() }
        </>
        
    )
}

export default AnnotationScreen;





