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

export const AnnotationScreen = ({ }) => {
    // Posts
    const [getPostsFetchInProgress, setGetPostsFetchInProgress] = useState(false)
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

    return getPostsFetchInProgress ? <Loading /> : (
        <>
        <div className="flex flex-row h-full bg-gray-200">
            <div className='flex-shrink-0 w-72 bg-gray-400 ml-4 mt-3 mb-3 shadow-inner rounded-lg' >
                <div className='flex flex-col p-3 h-full overflow-scroll'>
                    <div className="grid grid-cols-2 gap-3 pb-2">	 
                        <div className='h-56 flex hover:shadow-outline'>
                            <div className='h-full w-full object-contain flex relative'>	
                                <div className='h-full w-full mx-auto' style={{width: '77.7%'}}>
                                    <img className='h-full w-full mx-auto object-contain' src='newsScreenshot.png'></img>
                                </div>
                                <div className='h-full w-full absolute '>
                                    <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                                </div>
                            </div>
                        </div>
                        <div className='h-56 flex hover:shadow-outline'>
                            <div className='h-full w-full object-contain flex relative'>	
                                <div className='h-full w-full mx-auto' style={{width: '77.7%'}}>
                                    <img className='h-full w-full mx-auto object-contain' src='newsScreenshot.png'></img>
                                </div>
                                <div className='h-full w-full absolute '>
                                    <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pb-2">	 
                        <div className='h-56 flex hover:shadow-outline'>
                            <div className='h-full w-full object-contain flex relative'>	
                                <div className='h-full w-full mx-auto' style={{width: '77.7%'}}>
                                    <img className='h-full w-full mx-auto object-contain' src='newsScreenshot.png'></img>
                                </div>
                                <div className='h-full w-full absolute '>
                                    <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                                </div>
                            </div>
                        </div>
                        <div className='h-56 flex hover:shadow-outline'>
                            <div className='h-full w-full object-contain flex relative'>	
                                <div className='h-full w-full mx-auto' style={{width: '77.7%'}}>
                                    <img className='h-full w-full mx-auto object-contain' src='newsScreenshot.png'></img>
                                </div>
                                <div className='h-full w-full absolute '>
                                    <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pb-2">	 
                        <div className='h-56 flex hover:shadow-outline'>
                            <div className='h-full w-full object-contain flex relative'>	
                                <div className='h-full w-full mx-auto' style={{width: '77.7%'}}>
                                    <img className='h-full w-full mx-auto object-contain' src='newsScreenshot.png'></img>
                                </div>
                                <div className='h-full w-full absolute '>
                                    <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                                </div>
                            </div>
                        </div>
                        <div className='h-56 flex hover:shadow-outline'>
                            <div className='h-full w-full object-contain flex relative'>	
                                <div className='h-full w-full mx-auto' style={{width: '77.7%'}}>
                                    <img className='h-full w-full mx-auto object-contain' src='newsScreenshot.png'></img>
                                </div>
                                <div className='h-full w-full absolute '>
                                    <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pb-2">	 
                        <div className='h-56 flex hover:shadow-outline'>
                            <div className='h-full w-full object-contain flex relative'>	
                                <div className='h-full w-full mx-auto' style={{width: '77.7%'}}>
                                    <img className='h-full w-full mx-auto object-contain' src='newsScreenshot.png'></img>
                                </div>
                                <div className='h-full w-full absolute '>
                                    <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                                </div>
                            </div>
                        </div>
                        <div className='h-56 flex hover:shadow-outline'>
                            <div className='h-full w-full object-contain flex relative'>	
                                <div className='h-full w-full mx-auto' style={{width: '77.7%'}}>
                                    <img className='h-full w-full mx-auto object-contain' src='newsScreenshot.png'></img>
                                </div>
                                <div className='h-full w-full absolute '>
                                    <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='h-full w-1 bg-gray-300'></div> */}
            <div className='h-full flex-auto flex flex-row'>
                <div className='hidden flex-shrink-0 bg-gray-100 rounded-full shadow-lg h-64 ml-3 mt-3 w-16'></div>
                <div className='flex-shrink-0 h-full ml-3 mt-3 mb-3 w-64 flex-col' style={{height: '600px', width: '305px'}}> 
                    <div className='h-full w-full object-contain flex relative'>	
                        <div className='h-full w-full mx-auto' style={{width: '86%'}}>
                            <img className='h-full w-full mx-auto object-contain' src='newsScreenshot.png'></img>
                        </div>
                        <div className='h-full w-full absolute '>
                            <img className="h-full w-full object-contain" src='iPhoneXWireframe.png'></img>
                        </div>
                    </div>							
                </div>
                <div className='flex-auto h-full flex flex-col ml-3 mr-3'> 
                    <div className='bg-white h-auto shadow-xl mt-3 rounded-lg p-3 w-96'>
                        <h2 className='text-base font-bold'>How do we handle a big title like this or even this</h2>
                        <div className='-mt-1 text-xs uppercase text-gray-500 font-semibold '>
                            21/02/2020 10:30PM EST
                        </div>
                        <p className='mt-1 text-xs leading-tight'>
                            The screen has the wrong alignment on image x. It is the first time we have this ...
                        </p>
                    </div>
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
                    
                </div>  
            </div>
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

export default AnnotationScreen;





