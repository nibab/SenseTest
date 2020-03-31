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
        <div className='flex flex-row'> 
			<div className='flex-shrink-0 bg-red-400 h-full min-h-screen w-72'>
				<div className='bg-gray-400 flex flex-row min-h-screen max-h-screen'>
					<div className='bg-blue-400 m-3 flex-auto overflow-scroll flex flex-col p-3 rounded-lg'> 
						<div className="grid grid-cols-2 gap-3 pb-2">	 
							<div className='bg-red-400 h-56 flex'>
								<img className="object-contain" src='../../../public/iPhoneXWireframe.png'></img>
							</div>
							<div className='bg-red-400 h-56 flex'>
								<img className="object-contain" src='../../../public/iPhoneXWireframe.png'></img>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-3 pb-2">	 
							<div className='bg-red-400 h-56 flex'>
								<img className="object-contain" src='../../../public/iPhoneXWireframe.png'></img>
							</div>
							<div className='bg-red-400 h-56 flex'>
								<img className="object-contain" src='../../../public/iPhoneXWireframe.png'></img>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-3 pb-2">	 
							<div className='bg-red-400 h-56 flex'>
								<img className="object-contain" src='../../../public/iPhoneXWireframe.png'></img>
							</div>
							<div className='bg-red-400 h-56 flex'>
								<img className="object-contain" src='../../../public/iPhoneXWireframe.png'></img>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-green-500 h-full min-h-screen flex-auto'>
				<div className='bg-gray-500 min-h-screen flex flex-row min-h-screen max-h-screen'>
					<div className='flex-shrink-0 bg-blue-400 h-64 ml-3 mt-3 w-8'> </div>
					<div className='flex-shrink-0 bg-gray-400 h-auto ml-3 mt-3 mb-3 w-72 flex-col align-middle p-3'> 
						{/* <div className='bg-blue-500 w-60 h-64 mx-auto'></div> */}
						<img src='../../iPhoneXWireframe.png'></img>
						<div className='bg-green-500 mt-3 w-56 h-32 mx-auto'></div>
					</div>
					<div className='bg-gray-400 m-3 flex-auto overflow-y-scroll flex flex-col p-3'> 
						<div className='flex-shrink-0 bg-orange-400 w-auto h-12 rounded-lg'></div>
						<div className='flex-shrink-0 bg-orange-400 w-auto mt-1 h-48 rounded-lg'></div> 
						<div className='flex-shrink-0 bg-orange-400 w-auto mt-1 rounded-lg'>
							asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds
							asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds

							asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds asdads dasds

						</div> 
						<div className='flex-shrink-0 bg-orange-400 w-auto mt-1 h-32 rounded-lg'></div> 
						<div className='flex-shrink-0 bg-orange-400 w-auto mt-1 h-32 rounded-lg'></div> 
						<div className='flex-shrink-0 bg-orange-400 w-auto mt-1 h-32 rounded-lg'></div> 
						<div className='flex-shrink-0 bg-orange-400 w-auto mt-1 h-32 rounded-lg'></div> 
					</div>
				</div>
				
			</div>
		</div>
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





