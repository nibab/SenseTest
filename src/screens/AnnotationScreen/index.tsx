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
import { PostHeader } from './PostHeader'

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
            <div onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} className='flex-shrink-0 flex flex-row bg-gray-500 shadow-xl w-screen h-2 hover:h-72 bottom-0 absolute p-3 z-30' >
                {/* <div className="w-96 h-full p-1 left-0 flex "> */}
                    {/* <div className="bg-white shadow p-1 h-full rounded-lg flex">	 */}
                        {/* <div className="bg-green-300 rounded-lg w-16 h-16 my-auto">
                            <img src="appIcon.png" />
                        </div>
                        <div className="m-1 w-16 h-8 my-auto content-end">
                            <h5 className='text-sm font-bold truncate'>App.ly</h5>
                            <div className='-mt-3 tracking-tighter text-xs uppercase text-gray-600 font-semibold '>
                                V 0.12.3
                            </div>
                        </div> */}
                        {/* <div className="flex flex-auto relative my-auto z-0 overflow-hidden justify-end">

                        <img className="relative z-30 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <img className="relative z-20 -ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <img className="relative z-10 -ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                        <img className="relative mr-0 z-0 -ml-2 inline-block h-8 w-8 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <div className="bg-blue-500 rounded-full w-10 -ml-1 flex h-8 font-bold items-center justify-center text-gray-300" style={{fontSize: "13px"}}> 
                            +15
                        </div>
                        </div> */}
                        {/* <div className="bg-gray-400 h-10 m-3 my-auto z-0 overflow-hidden justify-end" style={{width: "2px"}}></div>
                        <div className="flex items-center text-sm font-bold text-green-700">
                        <div className="border-green-500 border-solid border-2 h-10 px-3 flex rounded-lg items-center justify-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 mr-2 icon-launch"><path className="secondary" d="M6.64 6.46h7.07a1 1 0 0 1 .7 1.71l-4.24 4.24a1 1 0 0 1-.7.3H2.38A1 1 0 0 1 1.7 11l4.24-4.24a1 1 0 0 1 .7-.3zm10.9 10.9a1 1 0 0 1-.3.71L13 22.31a1 1 0 0 1-1.7-.7v-7.07a1 1 0 0 1 .29-.71l4.24-4.24a1 1 0 0 1 1.7.7v7.07z"/><path className="primary" d="M5.78 13.19a15.94 15.94 0 0 1 14.39-10.4 1 1 0 0 1 1.04 1.04 15.94 15.94 0 0 1-10.4 14.39 1 1 0 0 1-1.17-.37 14.1 14.1 0 0 0-3.5-3.5 1 1 0 0 1-.36-1.16zm.59 2.57a16.2 16.2 0 0 1 1.87 1.87 1 1 0 0 1-.47 1.6c-.79.25-1.6.42-2.4.54a1 1 0 0 1-1.14-1.13c.12-.82.3-1.62.53-2.41a1 1 0 0 1 1.6-.47z"/><path className="secondary" d="M7.23 10.26a19.04 19.04 0 0 1 6.5 6.51c-.92.58-1.9 1.07-2.92 1.45a1 1 0 0 1-1.17-.37 14.1 14.1 0 0 0-3.5-3.5 1 1 0 0 1-.36-1.16c.38-1.03.87-2 1.45-2.93zM17.62 3.1c.84-.17 1.7-.27 2.55-.3a1 1 0 0 1 1.04 1.04c-.03.86-.13 1.71-.3 2.55a19.2 19.2 0 0 0-3.29-3.29zm-3.91 7.2a2 2 0 1 1 2.83-2.83 2 2 0 0 1-2.83 2.83z"/></svg>
                            Approve
                        </div> */}
                        
                        {/* </div>					 */}
                    {/* </div> */}
                {/* </div>	 */}
                <div className='w-64 bg-gray-500 h-full flex-shrink-0 flex mr-2 pl-1 flex-row'>
                    <div className='h-12 w-4 bg-red-300 my-auto rounded-md flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 my-auto icon-cheveron-down-circle"><circle cx="12" cy="12" r="10" className="primary"/><path className="secondary" d="M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>
                    </div>
                    <div className='h-12 w-12 bg-red-600 my-auto'></div>
                    <div className='h-12 flex-auto mr-1 my-auto flex bg-green-800 justify-end'>
                        <div className='bg-blue-500 p-1 right-0'>
                        asdasdasd
                        </div>
                    </div>
                </div>
                <div className={`${!isShown ? '' : ''} bg-gray-600 shadow-inner rounded-lg flex h-full w-full flex-row overflow-scroll`}>
                    { renderPostsInSelectorWindow() }
                </div>
                {/* <div className={`bg-gray-600 shadow-inner rounded-lg flex w-full h-full flex-row overflow-scroll`}>
                    <div className='h-full w-full flex max-w-xs p-2 ml-2 my-auto' style={{maxWidth: '130px', minWidth: '130px', height: '235px'}}>
                        <div className='hover:shadow-outline h-full w-full object-contain flex relative'>	
                            <div className='h-full w-full absolute z-0'>
                                <img className="h-full w-full object-contain" src='iphonexBlack.png'></img>
                            </div>
                            <div className='w-full mx-auto my-auto overflow-hidden z-10' style={{width: '85.8%', borderRadius: '0.7rem'}}>
                                <img className='h-full w-full mx-auto object-contain' src={'newsScreenshot.png'}></img>
                            </div>
                            
                        </div>
                    </div>
                </div> */}

            </div>
        )
    }

    return getPostsFetchInProgress ? <Loading /> : (
        <>
        {/* <PostHeader></PostHeader> */}
        <div className="flex flex-row h-full bg-gray-100 relative">  
            { renderPostDetailView() }
        </div>
        { renderSelector() }
        </>
        
    )
}

export default AnnotationScreen;





